import React, { useEffect, useState } from "react";
import { fetchClasses, createClass, deleteClass } from "../../http/modelAPI";
import { Button, Table, Form, Modal } from "react-bootstrap";

const AdminClassList = () => {
    const [classes, setClasses] = useState([]);
    const [show, setShow] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        try {
            const data = await fetchClasses(); // Загружаем список классов
            setClasses(data);
        } catch (error) {
            console.error("Ошибка загрузки классов", error);
        }
    };

    const addClass = async () => {
        try {
            await createClass(newClassName); // Создаём новый класс
            loadClasses(); // Обновляем список
            setShow(false); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка добавления класса", error);
        }
    };

    const removeClass = async (id) => {
        try {
            await deleteClass(id); // Удаляем класс
            loadClasses(); // Обновляем список
        } catch (error) {
            console.error("Ошибка удаления класса", error);
        }
    };

    return (
        <div>
            <h2>Классы</h2>
            <Button onClick={() => setShow(true)}>Добавить класс</Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls) => (
                        <tr key={cls.id}>
                            <td>{cls.id}</td>
                            <td>{cls.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeClass(cls.id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Модальное окно для добавления класса */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить класс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Название класса"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Закрыть</Button>
                    <Button variant="primary" onClick={addClass}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminClassList;
