import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createParticipant, fetchClasses, fetchNutritions, fetchStudents } from '../../http/modelAPI';

export default function CreateParticipantModal({ show, onHide }) {
    const [nutrition, setNutrition] = useState(null);
    const [student, setStudent] = useState(null);
    const [classx, setClass] = useState(null);
    const [grade, setGrade] = useState(null);
    const [selectedNutritionType, setSelectedNutritionType] = useState(null);

    const [nutritions, setNutritions] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchStudents(null, 1, 999).then(data => {
            setStudents(data.rows);
        });
        fetchClasses(1, 999).then(data => {
            setClasses(data.rows);
        });
        fetchNutritions(null, null, 1, 999).then(data => {
            setNutritions(data.rows);
        });
    }, []);

    const addParticipant = async () => {
        try {
            await createParticipant(student, classx, nutrition, grade);
            onHide();
            setNutrition(null);
            setStudent(null);
            setClass(null);
            setGrade(null);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const handleNutritionChange = (value) => {
        setNutrition(value);

        const selectedNutrition = nutritions.find(eve => eve.nutrition_id === parseInt(value, 10));
        setSelectedNutritionType(selectedNutrition ? selectedNutrition.type : null);

        if (selectedNutrition && selectedNutrition.type !== '' && selectedNutrition.type !== '') {
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
                    <Form.Select className="mt-2" value={nutrition} onChange={e => handleNutritionChange(e.target.value)}>
                        <option value="null">Select nutrition</option>
                        {nutritions.map(eve => (
                            <option key={eve.nutrition_id} value={eve.nutrition_id}>{eve.type} "{eve.name}"</option>
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

                    {/* <Form.Select 
                        className="mt-2" 
                        value={grade} 
                        onChange={e => setGrade(e.target.value)} 
                        disabled={!isGradeRequired}>
                        <option value="null">Select place</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </Form.Select> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {/* <Button variant="outline-success" onClick={addParticipant} disabled={isButtonDisabled}>Add</Button> */}
            </Modal.Footer>
        </Modal>
    );
}
