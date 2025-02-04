import { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeals } from "../store/mealsSlice";

const MealList = () => {
    const dispatch = useDispatch();
    const { meals } = useSelector((state) => state.meals);

    useEffect(() => {
        dispatch(fetchMeals());
    }, [dispatch]);

    return (
        <Container>
            <h2 className="my-3">Меню</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal.id}>
                            <td>{meal.id}</td>
                            <td>{meal.name}</td>
                            <td>{meal.description}</td>
                            <td>{meal.price} ₽</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MealList;
