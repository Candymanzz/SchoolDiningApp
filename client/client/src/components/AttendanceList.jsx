import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttendance } from "../store/attendanceSlice";
import { fetchAttendance } from "../http/attendanceAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const AttendanceList = () => {
    const dispatch = useDispatch();
    const { attendance } = useSelector((state) => state.attendance);

    useEffect(() => {
        fetchAttendance().then((data) => dispatch(setAttendance(data)));
    }, [dispatch]);

    if (!attendance.length) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h2>Attendance Records</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record, index) => (
                        <tr key={record.id}>
                            <td>{index + 1}</td>
                            <td>{record.student.name}</td>
                            <td>{record.date}</td>
                            <td>{record.isPresent ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AttendanceList;
