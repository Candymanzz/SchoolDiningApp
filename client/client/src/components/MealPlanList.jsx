import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMealPlans } from "../store/mealPlansSlice";
import { fetchModel } from "../http/modelAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const MealPlanList = () => {
    const dispatch = useDispatch();
    const { mealPlans } = useSelector((state) => state.mealPlans);

    useEffect(() => {
        const getMealPlans = async () => {
            try {
                const data = await fetchModel("mealplan");
                dispatch(setMealPlans(data));
            } catch (error) {
                console.error("Ошибка при загрузке планов питания:", error);
            }
        };

        getMealPlans();
    }, [dispatch]);

    if (!mealPlans || mealPlans.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Планы питания</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Дата</th>
                        <th>Блюдо</th>
                    </tr>
                </thead>
                <tbody>
                    {mealPlans.map((plan, index) => (
                        <tr key={plan.id}>
                            <td>{index + 1}</td>
                            <td>{new Date(plan.date).toLocaleDateString()}</td>
                            <td>{plan.meal?.name || "Не указано"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MealPlanList;
