import React from 'react'
import { Container, Form, Card, Button, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { ATTENDANCE_ROUTE, CLASSES_ROUTE, NUTRITIONS_ROUTE, PREFERENCE_ROUTE } from '../utils/consts';
import { seeding } from '../seeding';
import { useSelector } from 'react-redux';

export default function MainMenu() {

  const { isAuth } = useSelector((state) => {
    return state.employees;
  })

  return (
    <div>
      {isAuth ?
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: window.innerHeight - 54 }}
        >
          <Card style={{ width: 600 }} className="p-5">
            <h2 className="m-auto">Main menu</h2>
            <Form className="d-flex flex-column">
              <NavLink to={CLASSES_ROUTE} className="mt-3" style={{ textDecoration: 'none' }}>
                <Button className="d-flex justify-content-between" variant={"outline-primary"} style={{ width: "100%" }}>
                  <Image width="20" src="./hat.png" fluid />
                  <div style={{ marginRight: 20 }}>Classes</div>
                  <div></div>
                </Button>
              </NavLink>
              <NavLink to={ATTENDANCE_ROUTE} className="mt-3" style={{ textDecoration: 'none' }}>
                <Button className="d-flex justify-content-between" variant={"outline-primary"} style={{ width: "100%" }}>
                  <Image width="20" src="./attend.png" fluid />
                  <div style={{ marginRight: 20 }}>Attendance</div>
                  <div></div>
                </Button>
              </NavLink>
              <NavLink to={NUTRITIONS_ROUTE} className="mt-3" style={{ textDecoration: 'none' }}>
                <Button className="d-flex justify-content-between" variant={"outline-primary"} style={{ width: "100%" }}>
                  <Image width="20" src="./table.png" fluid />
                  <div style={{ marginRight: 20 }}>Nutrition</div>
                  <div></div>
                </Button>
              </NavLink>
              <NavLink to={PREFERENCE_ROUTE} className="mt-3" style={{ textDecoration: 'none' }}>
                <Button className="d-flex justify-content-between" variant={"outline-primary"} style={{ width: "100%" }}>
                  <Image width="20" src="./hat.png" fluid />
                  <div style={{ marginRight: 20 }}>Preference</div>
                  <div></div>
                </Button>
              </NavLink>
              <Button className="d-flex justify-content-center mt-3" variant={"outline-primary"} style={{ width: "100%" }} onClick={() => { seeding() }}>
                <div>Seeding</div>
              </Button>
            </Form>
          </Card>
        </Container>
        :
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: window.innerHeight - 54 }}
        >
          <Card style={{ width: 600 }} className="p-5">
            <h2 className="m-auto">Please log in</h2>
          </Card>
        </Container>
      }
    </div>
  )
}
