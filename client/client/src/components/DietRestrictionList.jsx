import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDietRestrictions } from "../store/dietRestrictionsSlice";
import { fetchModel } from "../http/modelAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const DietRestrictionList = () => {
    const dispatch = useDispatch();
    const { dietRestrictions } = useSelector((state) => state.dietRestrictions);

    useEffect(() => {
        const getDietRestrictions = async () => {
            try {
                const data = await fetchModel("dietRestrictions");
                dispatch(setDietRestrictions(data));
            } catch (error) {
                console.error("Ошибка при загрузке ограничений по питанию:", error);
            }
        };

        getDietRestrictions();
    }, [dispatch]);

    if (!dietRestrictions || dietRestrictions.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Диетические ограничения</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Студент</th>
                        <th>Ограничение</th>
                    </tr>
                </thead>
                <tbody>
                    {dietRestrictions.map((restriction, index) => (
                        <tr key={restriction.id}>
                            <td>{index + 1}</td>
                            <td>{restriction.student?.name || "Неизвестно"}</td>
                            <td>{restriction.restriction}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DietRestrictionList;
