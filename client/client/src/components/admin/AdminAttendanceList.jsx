import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchAttendance, deleteAttendance } from "../../http/modelAPI";

const AdminAttendanceList = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        loadAttendanceRecords();
    }, []);

    const loadAttendanceRecords = async () => {
        try {
            const data = await fetchAttendance();
            setAttendanceRecords(data);
        } catch (error) {
            console.error("Ошибка загрузки записей посещаемости", error);
        }
    };

    const removeAttendanceRecord = async (id) => {
        try {
            await deleteAttendance(id);
            setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
        } catch (error) {
            console.error("Ошибка удаления записи", error);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Студент</th>
                    <th>Дата</th>
                    <th>Присутствие</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.student?.name}</td>
                        <td>{record.date}</td>
                        <td>{record.isPresent ? "Да" : "Нет"}</td>
                        <td>
                            <Button variant="danger" onClick={() => removeAttendanceRecord(record.id)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminAttendanceList;
