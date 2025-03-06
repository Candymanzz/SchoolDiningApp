import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStudentMealRecords } from "../store/studentMealRecordsSlice";
import { fetchModel } from "../http/modelAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const StudentMealRecordList = () => {
    const dispatch = useDispatch();
    const { studentMealRecords } = useSelector((state) => state.studentMealRecords);

    useEffect(() => {
        const getMealRecords = async () => {
            try {
                const data = await fetchModel("studentMealRecords"); // Загружаем записи питания
                dispatch(setStudentMealRecords(data));
            } catch (error) {
                console.error("Ошибка при загрузке записей питания:", error);
            }
        };

        getMealRecords();
    }, [dispatch]);

    if (!studentMealRecords || studentMealRecords.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Записи о питании студентов</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Студент</th>
                        <th>Блюдо</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {studentMealRecords.map((record, index) => (
                        <tr key={record.id}>
                            <td>{index + 1}</td>
                            <td>{record.student?.name || "Не указано"}</td>
                            <td>{record.meal?.name || "Не указано"}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentMealRecordList;
