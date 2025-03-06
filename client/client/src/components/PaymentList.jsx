import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPayments } from "../store/paymentsSlice";
import { fetchModel } from "../http/modelAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const PaymentList = () => {
    const dispatch = useDispatch();
    const { payments } = useSelector((state) => state.payments);

    useEffect(() => {
        const getPayments = async () => {
            try {
                const data = await fetchModel("payments");
                dispatch(setPayments(data));
            } catch (error) {
                console.error("Ошибка при загрузке платежей:", error);
            }
        };

        getPayments();
    }, [dispatch]);

    if (!payments || payments.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="my-3">Платежи</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Студент</th>
                        <th>Сумма</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.id}>
                            <td>{index + 1}</td>
                            <td>{payment.student?.name || "Не указано"}</td>
                            <td>{payment.amount} ₽</td>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PaymentList;
