import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createAttendance, fetchStudents } from '../../http/modelAPI'

export default function CreateAttendanceModal({ show, onHide }) {

    const [student, setStudent] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')

    const [students, setStudents] = useState([])
    useEffect(() => {
        fetchStudents(null, 1, 999).then(data => {
            setStudents(data.rows)
        })
    }, [])

    const addExcursion = async () => {
        try {
            let data;
            data = await createAttendance(student, status, date).then(() => {
                onHide('')
                setStudent('')
                setStatus('')
                setDate('')
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
                    Add attendance
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="mt-2" value={student} onChange={e => setStudent(e.target.value)}>
                        <option value=''>Select student</option>
                        {students.map(std =>
                            <option value={std.student_id}>{std.name} {std.surname}</option>
                        )}
                    </Form.Select>
                    <Form.Select className="mt-2" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value=''>Select status</option>
                        <option value={true}>Attended</option>
                        <option value={false}>Missed</option>
                    </Form.Select>
                    <Form.Control type="date" className="mt-2" value={date} onChange={e => setDate(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {student === '' || status === '' || date === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addExcursion}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
