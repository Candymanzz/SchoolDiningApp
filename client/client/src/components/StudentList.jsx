import { useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../store/studentsSlice";

const StudentList = () => {
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

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
                            <td>{student.classId}</td>
                            <td>{student.birthDate}</td>
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
