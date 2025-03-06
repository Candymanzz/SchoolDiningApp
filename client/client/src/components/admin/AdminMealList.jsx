import React, { useEffect, useState } from "react";
import { fetchMeals, createMeal, deleteMeal } from "../../http/modelAPI";
import { Button, Table, Form, Modal } from "react-bootstrap";

const AdminMealList = () => {
    const [meals, setMeals] = useState([]);
    const [show, setShow] = useState(false);
    const [newMeal, setNewMeal] = useState({ name: "", price: "" });

    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = async () => {
        try {
            const data = await fetchMeals();
            setMeals(data);
        } catch (error) {
            console.error("Ошибка загрузки меню", error);
        }
    };

    const addMeal = async () => {
        try {
            await createMeal(newMeal.name, newMeal.description, newMeal.price);
            loadMeals();
            setShow(false);
            setNewMeal({ name: "", price: "" });
        } catch (error) {
            console.error("Ошибка добавления блюда", error);
        }
    };

    const removeMeal = async (id) => {
        try {
            await deleteMeal(id);
            loadMeals();
        } catch (error) {
            console.error("Ошибка удаления блюда", error);
        }
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
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название блюда"
                            value={newMeal.name}
                            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Описание блюда"
                            value={newMeal.description}
                            onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Цена"
                            value={newMeal.price}
                            onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                        />
                    </Form.Group>
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
