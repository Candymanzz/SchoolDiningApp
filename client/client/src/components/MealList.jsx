import { useEffect } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setMeals } from "../store/mealsSlice";
import { fetchModel } from "../http/modelAPI";

const MealList = () => {
    const dispatch = useDispatch();
    const { meals } = useSelector((state) => state.meals);

    useEffect(() => {
        const getMeals = async () => {
            try {
                const data = await fetchModel("meals");
                dispatch(setMeals(data));
            } catch (error) {
                console.error("Ошибка при загрузке меню:", error);
            }
        };

        getMeals();
    }, [dispatch]);

    if (!meals || meals.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Меню</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal, index) => (
                        <tr key={meal.id}>
                            <td>{index + 1}</td>
                            <td>{meal.name}</td>
                            <td>{meal.description || "Нет описания"}</td>
                            <td>{meal.price} ₽</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MealList;
