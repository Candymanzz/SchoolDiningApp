import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createPreference } from '../store/preferenceSlice';

const CreatePreference = () => {

    const [studentId, setStudentId] = useState('');
    const [dishName, setDishName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPreference({ student_id: studentId, dish_name: dishName }));
        setStudentId('');
        setDishName('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="studentId">
                <Form.Label>ID Студента</Form.Label>
                <Form.Control
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="dishName">
                <Form.Label>Название блюда</Form.Label>
                <Form.Control
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Добавить предпочтение
            </Button>
        </Form>
    );
};

export default CreatePreference;
