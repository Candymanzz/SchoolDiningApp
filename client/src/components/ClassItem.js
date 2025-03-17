import React from 'react'
import { Accordion, Button, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import ClassNutritionModal from './ClassNutritionModal';
import { deleteClass } from '../http/modelAPI';
import StudentItem from './StudentItem';

export default function ClassItem({ c, employees }) {
    const { students } = useSelector((state) => {
        return state.students;
    })
    const { employee } = useSelector((state) => {
        return state.employees;
    })

    const [modalShow, setModalShow] = React.useState(false);
    const delClass = (classId) => {
        deleteClass(classId).finally(() => window.location.reload())
    }

    return (
        <Accordion.Item eventKey={c.class_id}>
            <Accordion.Header className="d-flex justify-content-between">
                <div>{c.name}</div>
            </Accordion.Header>
            <Accordion.Body>
                {students.find(std => std.classClassId === c.class_id) ?
                    <ListGroup>Students:
                        {students.filter(std => std.classClassId === c.class_id).map(s =>
                            <StudentItem s={s} c={c}></StudentItem>
                        )}
                    </ListGroup>
                    :
                    <ListGroup>Students: <ListGroup.Item key={1}>none</ListGroup.Item></ListGroup>
                }
                {employees.find(emp => emp.employee_id === c.employeeEmployeeId) ?
                    <ListGroup>
                        Teacher: {employees.find(emp => emp.employee_id === c.employeeEmployeeId).name} {employees.find(emp => emp.employee_id === c.employeeEmployeeId).surname}
                    </ListGroup>
                    :
                    <ListGroup>Teacher: none</ListGroup>
                }
                <Button className="m-1 " variant="outline-success" onClick={() => { setModalShow(true) }}>View class nutritions</Button>
                {employee.employee_id === "ADMIN" ?
                    <Button className="m-1 " variant="outline-danger" onClick={() => { delClass(c.class_id) }}>Delete class</Button>
                    :
                    ''
                }
                <ClassNutritionModal
                    class_id={c.class_id}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Accordion.Body>
        </Accordion.Item>
    )
}