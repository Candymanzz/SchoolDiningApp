import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import CreateEmployeeModal from '../components/Admin/CreateEmployeeModal'
import { EMPLOYEES_ROUTE } from '../utils/consts';
import CreateClassModal from '../components/Admin/CreateClassModal';
import CreateStudentModal from '../components/Admin/CreateStudentModal';
import CreateAttendanceModal from '../components/Admin/CreateAttendanceModal';
import CreateEventModal from '../components/Admin/CreateEventModal';
import CreateParticipantModal from '../components/Admin/CreateParticipantModal';

export default function AdminMenu() {
  const { employee } = useSelector((state) => {
    return state.employees;
  })

  const [createEmployeeVisible, setCreateEmployeeVisible] = useState(false)
  const [createStudentVisible, setCreateStudentVisible] = useState(false)
  const [createClassVisible, setCreateClassVisible] = useState(false)
  const [createAttendanceVisible, setCreateAttendanceVisible] = useState(false)
  const [createEventVisible, setCreateEventVisible] = useState(false)
  const [createParticipantVisible, setCreateParticipantVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button variant={"outline-success"} className="mt-4 p-2" onClick={() => setCreateClassVisible(true)}>Add class</Button>
      <Button variant={"outline-success"} className="mt-4 p-2" onClick={() => setCreateStudentVisible(true)}>Add student</Button>
      <Button variant={"outline-success"} className="mt-4 p-2" onClick={() => setCreateAttendanceVisible(true)}>Add attendance</Button>
      <Button variant={"outline-success"} className="mt-4 p-2" onClick={() => setCreateEventVisible(true)}>Add event</Button>
      <Button variant={"outline-success"} className="mt-4 p-2" onClick={() => setCreateParticipantVisible(true)}>Add participant</Button>
      
      {employee.employee_id === "ADMIN" ?
        <Button variant={"outline-primary"} className="mt-4 p-2" onClick={() => setCreateEmployeeVisible(true)}>Add employee</Button>
        :
        ''
      }
      <NavLink to={EMPLOYEES_ROUTE} style={{ textDecoration: 'none' }} >
        <Button variant={"outline-primary"} className="mt-4 p-2" style={{ width: "100%" }}>View employees</Button>
      </NavLink>

      <CreateEmployeeModal show={createEmployeeVisible} onHide={() => setCreateEmployeeVisible(false)} />
      <CreateStudentModal show={createStudentVisible} onHide={() => setCreateStudentVisible(false)} />
      <CreateClassModal show={createClassVisible} onHide={() => setCreateClassVisible(false)} />
      <CreateAttendanceModal show={createAttendanceVisible} onHide={() => setCreateAttendanceVisible(false)} />
      <CreateEventModal show={createEventVisible} onHide={() => setCreateEventVisible(false)} />
        <CreateParticipantModal show={createParticipantVisible} onHide={() => setCreateParticipantVisible(false)} />
    </Container>
  )
}
