import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchStudentMealRecords, deleteStudentMealRecord } from "../../http/modelAPI";

const AdminStudentMealRecordList = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        try {
            const data = await fetchStudentMealRecords();
            setRecords(data);
        } catch (error) {
            console.error("Ошибка загрузки записей", error);
        }
    };

    const removeRecord = async (id) => {
        try {
            await deleteStudentMealRecord(id);
            setRecords(records.filter((record) => record.id !== id));
        } catch (error) {
            console.error("Ошибка удаления", error);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Студент</th>
                    <th>Блюдо</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.student?.name}</td>
                        <td>{record.meal?.name}</td>
                        <td>{record.date}</td>
                        <td>
                            <Button variant="danger" onClick={() => removeRecord(record.id)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminStudentMealRecordList;
