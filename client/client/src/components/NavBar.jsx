import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">SchoolDiningApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/students">Студенты</Nav.Link>
                        <Nav.Link as={Link} to="/classes">Классы</Nav.Link>
                        <Nav.Link as={Link} to="/meals">Меню</Nav.Link>
                        <Nav.Link as={Link} to="/meal-plans">Планы питания</Nav.Link>
                        <Nav.Link as={Link} to="/attendance">Посещаемость</Nav.Link>
                        <Nav.Link as={Link} to="/payments">Платежи</Nav.Link>
                        <Nav.Link as={Link} to="/diet-restrictions">Диеты</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
