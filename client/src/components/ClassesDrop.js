import React from 'react'
import { Form } from 'react-bootstrap'

export default function ClassesDrop({classes, setClass, selectedClass}) {

    return (
        <Form>
            <Form.Select className="mt-2" value={selectedClass} onChange={e => setClass(e.target.value)}>
                <option value="All">All classes</option>
                {classes.map(cls =>
                    <option key={cls.class_id} value={cls.class_id}>{cls.name}</option>
                )}
            </Form.Select>
        </Form>
    )
}
