import React, { useEffect, useState } from 'react'
import { createStudent, fetchClasses } from '../../http/modelAPI'
import { Button, Form, Modal } from 'react-bootstrap'

export default function CreateStudentModal({ show, onHide }) {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [classx, setClass] = useState('')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetchClasses(1, 999).then(data => {
            setClasses(data.rows)
        })
    }, [])
    const addStudent = () => {
        createStudent(name, surname, classx).then(() => {
            onHide('')
            setName('')
            setSurname('')
            setClass('')
        })
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
                    Add student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
                    <Form.Control maxLength="50" className="mt-2" placeholder={"Surname"} value={surname} onChange={e => setSurname(e.target.value)} />
                    <Form.Select className="mt-2" value={classx} onChange={e => setClass(e.target.value)}>
                        <option value=''>Select class</option>
                        {classes.map(cls =>
                            <option value={cls.class_id}>{cls.name}</option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {classx === '' || name === '' || surname === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addStudent}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
