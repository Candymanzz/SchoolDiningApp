import React, { useEffect, useState } from 'react'
import { ListGroup, Accordion } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fetchStudents } from '../http/modelAPI';
import { fetchEmployees } from '../http/employeeAPI';
import { setStudents } from '../store/studentsSlice';
import ClassItem from './ClassItem';

export default function ClassesList({ classes }) {
    const [employees, setEmployees] = useState([])
    const dispatch = useDispatch();
    const handleStudents = (s) => {
        dispatch(setStudents(s))
    }

    useEffect(() => {
        fetchEmployees(1, 999).then(data => {
            setEmployees(data.rows)
        })
    }, [])

    useEffect(() => {
        fetchStudents(null, 1, 999).then(data => {
            handleStudents(data.rows)
        })
    }, [])

    return (
        <div>
            {classes.length === 0 ?
                <ListGroup>
                    <ListGroup.Item
                        className="d-flex justify-content-between"
                        key={1}
                    >
                        Empty list
                    </ListGroup.Item>
                </ListGroup>
                :
                <Accordion defaultActiveKey="0">
                    {classes.map(c =>
                        <ClassItem key={c.id} c={c} employees={employees} />
                    )}
                </Accordion>
            }
        </div>
    )
}
