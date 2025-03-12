import React from 'react';
import { Card } from 'react-bootstrap';

const PreferenceItem = ({ preference }) => {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{preference.student_name}</Card.Title>
                <Card.Text>Предпочтение: {preference.dish_name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PreferenceItem;
