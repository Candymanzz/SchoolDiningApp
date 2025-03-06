import { useEffect } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setClasses } from "../store/classesSlice";
import { fetchModel } from "../http/modelAPI";

const ClassList = () => {
    const dispatch = useDispatch();
    const { classes } = useSelector((state) => state.classes);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const data = await fetchModel("classes");
                dispatch(setClasses(data));
            } catch (error) {
                console.error("Ошибка при загрузке классов:", error);
            }
        };

        getClasses();
    }, [dispatch]);

    if (!classes || classes.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

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
