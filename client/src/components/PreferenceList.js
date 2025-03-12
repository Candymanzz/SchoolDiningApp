import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PreferenceList = ({ preferences }) => {
    return (
        <ListGroup>
            {preferences.map((preference) => (
                <ListGroup.Item key={preference.preference_id}>
                    {preference.student_name}: {preference.dish_name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default PreferenceList;
