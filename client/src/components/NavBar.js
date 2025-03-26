import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { setIsAuth, setEmployee } from "../store/employeesSlice"


export default function NavBar() {

  const { isAuth } = useSelector((state) => {
    return state.employees;
  })

  const dispatch = useDispatch();
  const handleAuth = (bool) => {
    dispatch(setIsAuth(bool))
  }
  const handleEmployee = (ob) => {
    dispatch(setEmployee(ob))
  }

  const history = useNavigate()

  const logOut = () => {
    handleEmployee({})
    handleAuth(false)
    localStorage.removeItem('token')
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink to={MAIN_ROUTE}><Image width="35" src="./favico.ico" fluid /></NavLink>
        {isAuth ?
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button variant={"outline-light"} onClick={() => history(ADMIN_ROUTE)}>Admin Menu</Button>
            <Button variant={"outline-light"} onClick={() => logOut()}>Exit</Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Authorization</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  )
}
