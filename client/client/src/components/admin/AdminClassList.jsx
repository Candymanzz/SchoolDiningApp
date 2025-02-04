import React, { useEffect, useState } from "react";
import { getClasses, createClass, deleteClass } from "../../http/adminAPI";
import { Button, Table, Form, Modal } from "react-bootstrap";

const AdminClassList = () => {
    const [classes, setClasses] = useState([]);
    const [show, setShow] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        const data = await getClasses();
        setClasses(data);
    };

    const addClass = async () => {
        await createClass({ name: newClassName });
        loadClasses();
        setShow(false);
    };

    const removeClass = async (id) => {
        await deleteClass(id);
        loadClasses();
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
