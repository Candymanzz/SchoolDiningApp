import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { registration } from '../../http/employeeAPI';

export default function CreateEmployeeModal({ show, onHide }) {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const addEmployee = async () => {
        try {
            let data;
            data = await registration(name, surname, position, email, password).then(() => {
                onHide('')
                setName('')
                setSurname('')
                setPosition('')
                setEmail('')
                setPassword('')
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
                    Add employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Surname"} value={surname} onChange={e => setSurname(e.target.value)} />
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Position"} value={position} onChange={e => setPosition(e.target.value)} />
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Email"} value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Control maxLength="25" className="mt-2" placeholder={"Password"} value={password} onChange={e => setPassword(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {name === '' || surname === '' || position === '' || email === '' || password === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addEmployee}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
