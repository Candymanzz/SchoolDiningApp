import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { deleteStudent } from '../http/modelAPI';
import StudentNutritionModal from './StudentNutritionModal';

export default function StudentItem({ c, s }) {

    const { employee } = useSelector((state) => {
        return state.employees;
    })
    const delStudent = (stdId) => {
        deleteStudent(stdId).finally(() => window.location.reload())
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ListGroup.Item key={s.student_id} className='d-flex justify-content-between'>
            <div>{s.name} {s.surname}</div>
            <div>
                <Button className="m-1 " variant="outline-success" onClick={() => { setModalShow(true) }}>View student nutritions</Button>
                {employee.employee_id === "ADMIN" || employee.employee_id === c.employeeEmployeeId ?
                    <Button className="m-1 " variant="outline-danger" onClick={() => { delStudent(s.student_id) }}>Delete</Button>
                    :
                    ''
                }
            </div>
            <StudentNutritionModal
                student_id={s.student_id}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ListGroup.Item>
    )
}
