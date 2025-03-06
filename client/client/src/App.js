import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Spinner } from "react-bootstrap";

// import AppRouter from "./components/AppRouter";
// import NavBar from "./components/NavBar";
// import { check } from "./http/authAPI"; // Функция проверки токена
// import { setStudent, setIsAuth } from "./store/studentsSlice"; // Аутентификация через студента

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleStudent = (data) => {
    dispatch(setStudent(data));
  };

  const handleAuth = (isAuthenticated) => {
    dispatch(setIsAuth(isAuthenticated));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          handleStudent(data);
          handleAuth(true);
        })
        .catch(() => {
          handleStudent({});
          handleAuth(false);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
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
