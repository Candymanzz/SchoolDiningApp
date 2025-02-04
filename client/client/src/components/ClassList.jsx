import { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../store/classesSlice";

const ClassList = () => {
    const dispatch = useDispatch();
    const { classes } = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(fetchClasses());
    }, [dispatch]);

    return (
        <Container>
            <h2 className="my-3">Список классов</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem) => (
                        <tr key={classItem.id}>
                            <td>{classItem.id}</td>
                            <td>{classItem.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ClassList;
