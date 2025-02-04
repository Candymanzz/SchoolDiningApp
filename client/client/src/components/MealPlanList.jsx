import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMealPlans } from "../store/mealPlansSlice";
import { fetchMealPlans } from "../http/mealPlanAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const MealPlanList = () => {
    const dispatch = useDispatch();
    const { mealPlans } = useSelector((state) => state.mealPlans);

    useEffect(() => {
        fetchMealPlans().then((data) => dispatch(setMealPlans(data)));
    }, [dispatch]);

    if (!mealPlans.length) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h2>Meal Plans</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Meal</th>
                    </tr>
                </thead>
                <tbody>
                    {mealPlans.map((plan, index) => (
                        <tr key={plan.id}>
                            <td>{index + 1}</td>
                            <td>{plan.date}</td>
                            <td>{plan.meal.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MealPlanList;
