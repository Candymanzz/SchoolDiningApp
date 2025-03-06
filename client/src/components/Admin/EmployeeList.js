import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { deleteEmployee } from '../../http/employeeAPI';

export default function EmployeeList({ employees }) {
    const { employee } = useSelector((state) => {
        return state.employees;
    })
    const delEmployee = (employeeId) => {
        deleteEmployee(employeeId).finally(() => window.location.reload())
    }
    return (
        <div>
            {employees.length === 0 ?
                <ListGroup>
                    <ListGroup.Item
                        className="d-flex justify-content-between"
                    >
                        Empty list
                    </ListGroup.Item>
                </ListGroup>
                :
                <ListGroup>
                    {employees.map(emp =>
                        <ListGroup.Item
                            key={emp.employee_id}
                            className="d-flex justify-content-between"
                        >
                            <div style={{ display: 'flex', alignItems: "center" }}>{emp.position}: {emp.name} {emp.surname} ({emp.email})</div>
                            {employee.employee_id === "ADMIN" ?
                                <Button className="m-1 " variant="outline-danger" onClick={() => { delEmployee(emp.employee_id) }}>Delete</Button>
                                :
                                ''
                            }
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }
        </div>
    )
}
