import { React, useState } from 'react'
import { Container, Form, Card, Button, Row, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setEmployee, setIsAuth } from "../store/employeesSlice"
import { login } from '../http/employeeAPI'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../utils/consts'
// import { NavLink } from 'react-router-dom'
// import { REGISTRATION_ROUTE } from '../utils/consts'

export default function Authorization() {

  const history = useNavigate()

  const dispatch = useDispatch();
  const handleEmployee = (ob) => {
    dispatch(setEmployee(ob))
  }
  const handleAuth = (bool) => {
    dispatch(setIsAuth(bool))
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      data = await login(email, password)
      handleEmployee(data)
      handleAuth(true)
      history(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Authorization</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3">
            {/* <NavLink to={REGISTRATION_ROUTE}>
              Registration
            </NavLink> */}
            <Button className="mt-3 align-self-end" variant={"outline-primary"} onClick={click}>
              Log in
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}