import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createParticipant, fetchClasses, fetchEvents, fetchStudents } from '../../http/modelAPI';

export default function CreateParticipantModal({ show, onHide }) {
    const [event, setEvent] = useState(null);
    const [student, setStudent] = useState(null);
    const [classx, setClass] = useState(null);
    const [grade, setGrade] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState(null); // Track selected event type

    const [events, setEvents] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchStudents(null, 1, 999).then(data => {
            setStudents(data.rows);
        });
        fetchClasses(1, 999).then(data => {
            setClasses(data.rows);
        });
        fetchEvents(null, null, 1, 999).then(data => {
            setEvents(data.rows);
        });
    }, []);

    const addParticipant = async () => {
        try {
            await createParticipant(student, classx, event, grade);
            onHide();
            setEvent(null);
            setStudent(null);
            setClass(null);
            setGrade(null);
        } catch (e) {
            alert(e.response.data.message);
        }        
    };

    const handleEventChange = (value) => {
        setEvent(value);

        const selectedEvent = events.find(eve => eve.event_id === parseInt(value, 10));
        setSelectedEventType(selectedEvent ? selectedEvent.type : null);

        // Reset grade if the event type is not 'Конкурс' or 'Олимпиада'
        if (selectedEvent && selectedEvent.type !== 'Конкурс' && selectedEvent.type !== 'Олимпиада') {
            setGrade(null);
        }
    };

    const handleStudentChange = (value) => {
        setStudent(value);
        if (value === "null") {
            setStudent(null);
        }
        if (value !== "null") {
            setClass(null);
        }
    };

    const handleClassChange = (value) => {
        setClass(value);
        if (value === "null") {
            setClass(null);
        }
        if (value !== "null") {
            setStudent(null);
        }
    };

    const isGradeRequired = selectedEventType === 'Конкурс' || selectedEventType === 'Олимпиада';
    const isButtonDisabled = !event || (!student && !classx) || (isGradeRequired && !grade);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add participant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="mt-2" value={event} onChange={e => handleEventChange(e.target.value)}>
                        <option value="null">Select event</option>
                        {events.map(eve => (
                            <option key={eve.event_id} value={eve.event_id}>{eve.type} "{eve.name}"</option>
                        ))}
                    </Form.Select>

                    <Form.Select 
                        className="mt-2" 
                        value={student} 
                        onChange={e => handleStudentChange(e.target.value)} 
                        disabled={classx !== null}>
                        <option value="null">Select student</option>
                        {students.map(std => (
                            <option key={std.student_id} value={std.student_id}>{std.name} {std.surname}</option>
                        ))}
                    </Form.Select>

                    <Form.Select 
                        className="mt-2" 
                        value={classx} 
                        onChange={e => handleClassChange(e.target.value)} 
                        disabled={student !== null}>
                        <option value="null">Select class</option>
                        {classes.map(cls => (
                            <option key={cls.class_id} value={cls.class_id}>{cls.name}</option>
                        ))}
                    </Form.Select>

                    <Form.Select 
                        className="mt-2" 
                        value={grade} 
                        onChange={e => setGrade(e.target.value)} 
                        disabled={!isGradeRequired}>
                        <option value="null">Select place</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addParticipant} disabled={isButtonDisabled}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}
