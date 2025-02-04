import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPayments } from "../store/paymentsSlice";
import { fetchPayments } from "../http/paymentAPI";
import { Table, Container, Spinner } from "react-bootstrap";

const PaymentList = () => {
    const dispatch = useDispatch();
    const { payments } = useSelector((state) => state.payments);

    useEffect(() => {
        fetchPayments().then((data) => dispatch(setPayments(data)));
    }, [dispatch]);

    if (!payments.length) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h2>Payments</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.id}>
                            <td>{index + 1}</td>
                            <td>{payment.student.name}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PaymentList;
