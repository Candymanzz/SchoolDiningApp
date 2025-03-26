import React from 'react'
import { Badge, Button, ListGroup, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function ClassNutritionModal(props) {

    const { nutritions } = useSelector((state) => {
        return state.nutritions;
    })
    const { participants } = useSelector((state) => {
        return state.participants;
    })

    const nutritionIds = participants
        .filter(participant => participant.classClassId === props.class_id)
        .map(participant => participant.nutritionNutritionId);
    const filteredNutritions = nutritions.filter(nutrition => nutritionIds.includes(nutrition.nutrition_id));

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Class nutritions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered>
                    {filteredNutritions.map(e => {
                        const participant = participants.find(p => p.nutritionNutritionId === e.nutrition_id && p.classClassId === props.class_id);

                        return (
                            <ListGroup.Item
                                key={e.nutrition_id}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{e.type} "{e.name}"</div>
                                    {e.date}
                                </div>
                                {participant.grade !== null && (
                                    <Badge bg="primary" pill>
                                        {participant.grade}
                                    </Badge>
                                )}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
