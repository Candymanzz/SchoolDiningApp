import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStudentMealRecords } from "../store/studentMealRecordsSlice";
import { fetchStudentMealRecords } from "../http/studentMealRecordAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const StudentMealRecordList = () => {
    const dispatch = useDispatch();
    const { studentMealRecords } = useSelector((state) => state.studentMealRecords);

    useEffect(() => {
        fetchStudentMealRecords().then((data) => dispatch(setStudentMealRecords(data)));
    }, [dispatch]);

    if (!studentMealRecords.length) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h2>Student Meal Records</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Meal</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {studentMealRecords.map((record, index) => (
                        <tr key={record.id}>
                            <td>{index + 1}</td>
                            <td>{record.student.name}</td>
                            <td>{record.meal.name}</td>
                            <td>{record.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentMealRecordList;
