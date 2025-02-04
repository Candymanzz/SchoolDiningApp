import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDietRestrictions } from "../store/dietRestrictionsSlice";
import { fetchDietRestrictions } from "../http/dietRestrictionAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const DietRestrictionList = () => {
    const dispatch = useDispatch();
    const { dietRestrictions } = useSelector((state) => state.dietRestrictions);

    useEffect(() => {
        fetchDietRestrictions().then((data) => dispatch(setDietRestrictions(data)));
    }, [dispatch]);

    if (!dietRestrictions.length) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h2>Dietary Restrictions</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Restriction</th>
                    </tr>
                </thead>
                <tbody>
                    {dietRestrictions.map((restriction, index) => (
                        <tr key={restriction.id}>
                            <td>{index + 1}</td>
                            <td>{restriction.student.name}</td>
                            <td>{restriction.restriction}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DietRestrictionList;
