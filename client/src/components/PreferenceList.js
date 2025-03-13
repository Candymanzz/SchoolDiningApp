import React, { useEffect, useState } from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";

const PreferenceList = () => {
    const [preferences, setPreferences] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/preference").then((res) => res.json()),
            fetch("http://localhost:5000/api/student").then((res) => res.json())
        ])
            .then(([preferencesData, studentsData]) => {
                if (preferencesData.rows && studentsData.rows) {
                    setPreferences(preferencesData.rows);
                    setStudents(studentsData.rows);
                } else {
                    setError("Некорректный ответ от сервера");
                }
            })
            .catch(() => setError("Ошибка загрузки данных"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <ListGroup>
            <ListGroup.Item variant="dark">
                <strong>Любимые блюда учащихся</strong>
            </ListGroup.Item>
            {preferences.length > 0 ? (
                preferences.map((preference) => {
                    // Найти студента по student_id
                    const student = students.find(std => std.student_id === preference.student_id);
                    return (
                        <ListGroup.Item key={preference.preference_id}>
                            {student ? `${student.name} ${student.surname}` : "Неизвестный студент"}: {preference.dish_name}
                        </ListGroup.Item>
                    );
                })
            ) : (
                <ListGroup.Item>Нет данных</ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default PreferenceList;
