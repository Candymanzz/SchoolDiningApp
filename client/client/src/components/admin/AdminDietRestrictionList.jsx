import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchDietRestrictions, deleteDietRestriction } from "../../http/dietRestrictionAPI";

const AdminDietRestrictionList = () => {
    const [dietRestrictions, setDietRestrictions] = useState([]);

    useEffect(() => {
        loadDietRestrictions();
    }, []);

    const loadDietRestrictions = async () => {
        try {
            const data = await fetchDietRestrictions();
            setDietRestrictions(data);
        } catch (error) {
            console.error("Ошибка загрузки диетических ограничений", error);
        }
    };

    const removeDietRestriction = async (id) => {
        try {
            await deleteDietRestriction(id);
            setDietRestrictions(dietRestrictions.filter((restriction) => restriction.id !== id));
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
                    <th>Ограничение</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {dietRestrictions.map((restriction) => (
                    <tr key={restriction.id}>
                        <td>{restriction.id}</td>
                        <td>{restriction.student?.name}</td>
                        <td>{restriction.restriction}</td>
                        <td>
                            <Button variant="danger" onClick={() => removeDietRestriction(restriction.id)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminDietRestrictionList;
