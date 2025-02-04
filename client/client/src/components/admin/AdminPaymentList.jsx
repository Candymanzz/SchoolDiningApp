import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchPayments, deletePayment } from "../../http/paymentAPI";

const AdminPaymentList = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            const data = await fetchPayments();
            setPayments(data);
        } catch (error) {
            console.error("Ошибка загрузки платежей", error);
        }
    };

    const removePayment = async (id) => {
        try {
            await deletePayment(id);
            setPayments(payments.filter((payment) => payment.id !== id));
        } catch (error) {
            console.error("Ошибка удаления платежа", error);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Студент</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.student?.name}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.date}</td>
                        <td>
                            <Button variant="danger" onClick={() => removePayment(payment.id)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminPaymentList;
