import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchMealPlans, deleteMealPlan } from "../../http/mealPlanAPI";

const AdminMealPlanList = () => {
    const [mealPlans, setMealPlans] = useState([]);

    useEffect(() => {
        loadMealPlans();
    }, []);

    const loadMealPlans = async () => {
        try {
            const data = await fetchMealPlans();
            setMealPlans(data);
        } catch (error) {
            console.error("Ошибка загрузки планов питания", error);
        }
    };

    const removeMealPlan = async (id) => {
        try {
            await deleteMealPlan(id);
            setMealPlans(mealPlans.filter((plan) => plan.id !== id));
        } catch (error) {
            console.error("Ошибка удаления плана питания", error);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Дата</th>
                    <th>Блюдо</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {mealPlans.map((plan) => (
                    <tr key={plan.id}>
                        <td>{plan.id}</td>
                        <td>{plan.date}</td>
                        <td>{plan.meal?.name}</td>
                        <td>
                            <Button variant="danger" onClick={() => removeMealPlan(plan.id)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminMealPlanList;
