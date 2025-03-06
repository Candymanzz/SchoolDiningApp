import React from 'react'
import { Badge, Button, ListGroup, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function StudentEventModal(props) {

    const { events } = useSelector((state) => {
        return state.events;
    })
    const { participants } = useSelector((state) => {
        return state.participants;
    })

    const eventIds = participants
        .filter(participant => participant.studentStudentId === props.student_id)
        .map(participant => participant.eventEventId);
    const filteredEvents = events.filter(event => eventIds.includes(event.event_id));

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Student events
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered>
                    {filteredEvents.map(e => {
                        const participant = participants.find(p => p.eventEventId === e.event_id && p.studentStudentId === props.student_id);

                        return (
                            <ListGroup.Item
                                key={e.event_id}
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
