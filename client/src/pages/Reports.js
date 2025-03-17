import React, { useState } from 'react';
import { fetchNutritions, fetchParticipants } from '../http/modelAPI';
import { $authHost } from '../http';

const Reports = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        try {
            setLoading(true);
            setError(null);

            // Получаем данные
            const [nutritionsResponse, participantsResponse] = await Promise.all([
                fetchNutritions(),
                fetchParticipants()
            ]);

            const nutritions = nutritionsResponse.rows;
            const participants = participantsResponse.rows;

            if (!nutritions || !participants) {
                throw new Error('Не удалось получить необходимые данные');
            }

            // Создаем PDF
            const createResponse = await $authHost.post('api/nutrition/pdf', {
                nutritions,
                participants
            });

            if (!createResponse.data) {
                throw new Error('Ошибка при создании PDF');
            }

            // Получаем PDF
            const pdfResponse = await $authHost.get('api/nutrition/pdf', {
                responseType: 'blob'
            });

            if (!pdfResponse.data) {
                throw new Error('Ошибка при получении PDF');
            }

            const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });

            if (blob.size === 0) {
                throw new Error('Сгенерированный PDF пуст');
            }

            // Скачиваем файл
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nutrition-report-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.response?.data?.message || error.message || 'Произошла ошибка при генерации отчета');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Отчеты</h1>
            {error && (
                <div style={{
                    color: 'red',
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#fff3f3',
                    border: '1px solid #ffcdd2',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}
            <button
                onClick={handleDownload}
                disabled={loading}
                style={{
                    opacity: loading ? 0.7 : 1,
                    padding: '10px 20px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px'
                }}
            >
                {loading ? 'Генерация отчета...' : 'Скачать отчет (PDF)'}
            </button>
        </div>
    );
};

export default Reports;
