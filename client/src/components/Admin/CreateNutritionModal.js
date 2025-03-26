import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createNutritions } from '../../http/modelAPI'

export default function CreateNutritionModal({ show, onHide }) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')

    const addNutrition = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('date', date)
            formData.append('type', type)
            let data;
            data = await createNutritions(formData).then(() => {
                onHide('')
                setName('')
                setDate('')
                setType('')
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
                    Add nutrition
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="mt-2" value={type} onChange={e => setType(e.target.value)}>
                        <option value=''>Select type</option>
                        <option value='Обед'>Обед</option>
                        <option value='Ужин'>Ужин</option>
                        <option value='Завтрак'>Завтрак</option>
                    </Form.Select>
                    <Form.Control maxLength="50" className="mt-2" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
                    <Form.Control type="date" className="mt-2" value={date} onChange={e => setDate(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {name === '' || date === '' || type === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addNutrition}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}