import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttendance } from "../store/attendanceSlice";
import { fetchModel } from "../http/modelAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const AttendanceList = () => {
    const dispatch = useDispatch();
    const { attendance } = useSelector((state) => state.attendance);

    useEffect(() => {
        const getAttendance = async () => {
            try {
                const data = await fetchModel("attendances");
                dispatch(setAttendance(data));
            } catch (error) {
                console.error("Ошибка при загрузке посещаемости:", error);
            }
        };

        getAttendance();
    }, [dispatch]);

    if (!attendance || attendance.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2>Записи посещаемости</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Студент</th>
                        <th>Дата</th>
                        <th>Присутствие</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record, index) => (
                        <tr key={record.id}>
                            <td>{index + 1}</td>
                            <td>{record.student?.name || "Неизвестно"}</td>
                            <td>{record.date}</td>
                            <td>{record.isPresent ? "Да" : "Нет"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AttendanceList;
