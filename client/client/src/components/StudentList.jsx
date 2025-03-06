import { useEffect } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setStudents } from "../store/studentsSlice";
import { fetchModel } from "../http/modelAPI";

const StudentList = () => {
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const data = await fetchModel("students");
                dispatch(setStudents(data));
            } catch (error) {
                console.error("Ошибка при загрузке студентов:", error);
            }
        };

        getStudents();
    }, [dispatch]);

    if (!students || students.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Список студентов</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Класс</th>
                        <th>Дата рождения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class?.name || "Не указано"}</td>
                            <td>{new Date(student.birthDate).toLocaleDateString()}</td>
                            <td>
                                <Button variant="warning" size="sm">Редактировать</Button>{' '}
                                <Button variant="danger" size="sm">Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentList;
