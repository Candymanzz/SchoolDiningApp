import { BrowserRouter } from "react-router-dom";
import { setEmployee, setIsAuth } from "./store/employeesSlice"
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { check } from "./http/employeeAPI";
import { useDispatch } from 'react-redux'
import { Container, Spinner } from "react-bootstrap";

function App() {
  const [loading, SetLoading] = useState(true)

  const dispatch = useDispatch();

  const handleEmployee = (ob) => {
    dispatch(setEmployee(ob))
  }
  const handleAuth = (bool) => {
    dispatch(setIsAuth(bool))
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        check().then(data => {
          handleEmployee(data)
          handleAuth(true)
        }).finally(() => SetLoading(false))
      } catch {
        handleEmployee({})
        handleAuth(false)
        localStorage.removeItem('token')
        SetLoading(false)
      }
    }
    else {
      SetLoading(false)
    }
  }, [])

  if (loading) {
    return <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}><Spinner animation={"grow"} /></Container>
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
