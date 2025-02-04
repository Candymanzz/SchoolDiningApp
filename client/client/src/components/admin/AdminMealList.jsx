import React, { useEffect, useState } from "react";
import { getMeals, createMeal, deleteMeal } from "../../http/adminAPI";
import { Button, Table, Form, Modal } from "react-bootstrap";

const AdminMealList = () => {
    const [meals, setMeals] = useState([]);
    const [show, setShow] = useState(false);
    const [newMeal, setNewMeal] = useState({ name: "", price: "" });

    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = async () => {
        const data = await getMeals();
        setMeals(data);
    };

    const addMeal = async () => {
        await createMeal(newMeal);
        loadMeals();
        setShow(false);
    };

    const removeMeal = async (id) => {
        await deleteMeal(id);
        loadMeals();
    };

    return (
        <div>
            <h2>Меню</h2>
            <Button onClick={() => setShow(true)}>Добавить блюдо</Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal.id}>
                            <td>{meal.id}</td>
                            <td>{meal.name}</td>
                            <td>{meal.price}₽</td>
                            <td>
                                <Button variant="danger" onClick={() => removeMeal(meal.id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Модальное окно для добавления блюда */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить блюдо</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Название блюда"
                        value={newMeal.name}
                        onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Цена"
                        value={newMeal.price}
                        onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Закрыть</Button>
                    <Button variant="primary" onClick={addMeal}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminMealList;
