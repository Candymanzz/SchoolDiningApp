import React, { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "../../http/modelAPI";
import { Button, Table, Form, Modal } from "react-bootstrap";

const AdminStudentList = () => {
    const [students, setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", classId: "" });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    };

    const addStudent = async () => {
        await createStudent(newStudent);
        loadStudents();
        setShow(false);
    };

    const removeStudent = async (id) => {
        await deleteStudent(id);
        loadStudents();
    };

    return (
        <div>
            <h2>Студенты</h2>
            <Button onClick={() => setShow(true)}>Добавить студента</Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Класс</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.classId}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeStudent(student.id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Модальное окно для добавления студента */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Имя студента"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                    <Form.Control
                        type="number"
                        placeholder="ID класса"
                        value={newStudent.classId}
                        onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Закрыть</Button>
                    <Button variant="primary" onClick={addStudent}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminStudentList;
