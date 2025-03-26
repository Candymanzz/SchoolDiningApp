import React from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'
import { deleteNutritions, deleteParticipant } from '../http/modelAPI';

export default function NutritionsList({ employee, nutritions, participants, students, classes }) {

    const delNutrition = (nutritionId) => {
        deleteNutritions(nutritionId).finally(() => window.location.reload());
    }

    const delPart = (prtId) => {
        deleteParticipant(prtId).finally(() => window.location.reload());
    }

    return (
        <div>
            {nutritions.length === 0 ?
                <ListGroup>
                    <ListGroup.Item
                        className="d-flex justify-content-between"
                        key={1}
                    >
                        Empty list
                    </ListGroup.Item>
                </ListGroup>
                :
                <Accordion defaultActiveKey="0">
                    {nutritions.map(e =>
                        <Accordion.Item key={e.nutrition_id} eventKey={e.nutrition_id}>
                            <Accordion.Header className="d-flex justify-content-between">
                                {e.name === "" ?
                                    <div>{e.type} - ({e.date})</div>
                                    :
                                    <div>{e.type} "{e.name}" - ({e.date})</div>
                                }
                            </Accordion.Header>
                            <Accordion.Body>
                                {participants.some(prt => prt.nutritionNutritionId === e.nutrition_id) ?
                                    <ListGroup>Participants:
                                        {participants.filter(prt => prt.nutritionNutritionId === e.nutrition_id).map(p => {
                                            const student = p.studentStudentId ? students.find(std => std.student_id === p.studentStudentId) : null;
                                            const studentName = student ? `${student.name} ${student.surname}` : null;

                                            const classItem = p.classClassId ? classes.find(cls => cls.class_id === p.classClassId) : null;
                                            const className = classItem ? `Class: ${classItem.name}` : null;

                                            return (
                                                <ListGroup.Item key={p.participant_id} className='d-flex justify-content-between'>
                                                    <div>
                                                        {studentName || className || ""}
                                                        {p.grade !== null && <><br />Place: {p.grade}</>}
                                                    </div>
                                                    {employee.employee_id === "ADMIN" &&
                                                        <Button className="m-1" variant="outline-danger" onClick={() => { delPart(p.participant_id) }}>Delete</Button>
                                                    }
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                    :
                                    <ListGroup>Participants: <ListGroup.Item key={1}>none</ListGroup.Item></ListGroup>
                                }
                                {employee.employee_id === "ADMIN" &&
                                    <Button className="m-1" variant="outline-danger" onClick={() => { delNutrition(e.nutrition_id) }}>Delete nutrition</Button>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>
            }
        </div>
    )
}