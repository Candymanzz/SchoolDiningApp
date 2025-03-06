import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployees, setTotalCount, setPage } from "../store/employeesSlice"
import { fetchEmployees } from '../http/employeeAPI'
import EmployeeList from '../components/Admin/EmployeeList'
import Pages from '../components/Pages'

export default function EmployeeListMenu() {
    const { employees, page, totalCount, limit } = useSelector((state) => {
        return state.employees;
    })
    const dispatch = useDispatch();
    const handleEmployees = (t) => {
        dispatch(setEmployees(t))
    }
    const handleTotalCount = (c) => {
        dispatch(setTotalCount(c))
    }
    const handlePage = (n) => {
        dispatch(setPage(n))
      }

    useEffect(() => {
        fetchEmployees(1, 12).then(data => {
            handleEmployees(data.rows)
            handleTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchEmployees(page, 12).then(data => {
            handleEmployees(data.rows)
            handleTotalCount(data.count)
        })
    }, [page])

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column">
            <Row className="mt-2">
                <Col>
                    <EmployeeList employees = {employees}/>
                </Col>
            </Row>
            <Pages totalCount={totalCount} limit={limit} page={page} handlePage={(p) => handlePage(p)} />
        </Container>
    )
}
