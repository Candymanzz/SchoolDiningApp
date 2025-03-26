import { BrowserRouter } from "react-router-dom";
import { setEmployee, setIsAuth } from "./store/employeesSlice"
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { check } from "./http/employeeAPI";
import { useDispatch } from 'react-redux'
import { Container, Spinner } from "react-bootstrap";

function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleEmployee = (ob) => {
    dispatch(setEmployee(ob));
  };

  const handleAuth = (bool) => {
    dispatch(setIsAuth(bool));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const data = await check();
          handleEmployee(data);
          handleAuth(true);
        } catch (error) {
          handleEmployee({});
          handleAuth(false);
          localStorage.removeItem('token');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
        <Spinner animation={"grow"} />
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;