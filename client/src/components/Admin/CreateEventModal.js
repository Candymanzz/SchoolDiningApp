import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createEvent } from '../../http/modelAPI'

export default function CreateEventModal({ show, onHide }) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addEvent = async () => {

        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('date', date)
            formData.append('type', type)
            formData.append('file', file)
            let data;
            data = await createEvent(formData).then(() => {
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
                    Add event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Select className="mt-2" value={type} onChange={e => setType(e.target.value)}>
                        <option value=''>Select type</option>
                        <option value='Экскурсия'>Экскурсия</option>
                        <option value='Олимпиада'>Олимпиада</option>
                        <option value='Конкурс'>Конкурс</option>
                        <option value='Поучающее видео'>Поучающее видео</option>
                        <option value='Родительское собрание'>Родительское собрание</option>
                        <option value='Классный час'>Классный час</option>
                    </Form.Select>
                    <Form.Control maxLength="50" className="mt-2" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
                    <Form.Control type="date" className="mt-2" value={date} onChange={e => setDate(e.target.value)} />
                    <Form.Control className="mt-2" type="file" onChange={selectFile} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {name === '' || date === '' || type === '' ?
                    <Button variant="outline-success" disabled>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addEvent}>Add</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}
