import React, { useEffect, useState } from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";
import { fetchPreferences, fetchStudents } from "./Preferenceapi";

const PreferenceList = () => {
    const [preferences, setPreferences] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [preferencesData, studentsData] = await Promise.all([
                    fetchPreferences(),
                    fetchStudents()
                ]);

                setPreferences(preferencesData);
                setStudents(studentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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