import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createNutritions } from '../../http/modelAPI'

export default function CreateNutritionModal({ show, onHide }) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addNutrition = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('date', date)
            formData.append('type', type)
            formData.append('file', file)
            let data;
            data = await createNutritions(formData).then(() => {
                onHide('')
                setName('')
                setDate('')
                setType('')
                setFile(null)
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
                        <option value=''>Select class</option>
                        <option value='11-A'>11-A</option>
                        <option value='10-A'>10-A</option>
                        <option value='11-Б'>11-Б</option>
                        <option value='10-Б'>10-Б</option>
                        <option value='9-А'>9-А</option>
                        <option value='9-Б'>9-Б</option>
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