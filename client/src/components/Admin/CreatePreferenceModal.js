import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createPreference, fetchStudents } from '../../http/modelAPI'

export default function CreatePreferenceModal({ show, onHide }) {

    const [student, setStudent] = useState('')
    const [food, setFood] = useState('')

    const [students, setStudents] = useState([])
    useEffect(() => {
        fetchStudents(null, 1, 999).then(data => {
            setStudents(data.rows)
        })
    }, [])
    const addPreference = async () => {
        try {
            let data;
            data = await createPreference(student, food).then(() => {
                onHide('')
                setStudent('')
                setFood('')
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
                    Add preference
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
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Food"} value={food} onChange={e => setFood(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {student === '' || food === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addPreference}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
