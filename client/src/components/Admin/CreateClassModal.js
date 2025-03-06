import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createClass } from '../../http/modelAPI'
import { fetchEmployees } from '../../http/employeeAPI'

export default function CreateClassModal({ show, onHide }) {
    const [name, setName] = useState('')
    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetchEmployees(1, 999).then(data => {
            setEmployees(data.rows)
        })
    }, [])
    const addClass = async () => {
        try {
            let data;
            data = await createClass(name, employee).then(() => {
                onHide('')
                setName('')
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control maxLength="4" className="mt-2" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
                    <Form.Select className="mt-2" value={employee} onChange={e => setEmployee(e.target.value)}>
                        <option value=''>Select employee</option>
                        {employees.map(emp =>
                            <option value={emp.employee_id}>{emp.name} {emp.surname}</option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {employee === '' || name === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addClass}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
