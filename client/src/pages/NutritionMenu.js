import React, { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setNutritions, setPage, setSelectedDateFrom, setSelectedDateTo, setTotalCount } from '../store/nutritionsSlice';
import NutritionsList from '../components/NutritionsList';
import Pages from '../components/Pages';
import { createAndDownloadNutritionsPdf, fetchClasses, fetchNutritions, fetchParticipants, fetchStudents } from '../http/modelAPI';
import { setClasses } from '../store/classesSlice';
import { setStudents } from '../store/studentsSlice';
import { setParticipants } from '../store/participantsSlice';

export default function NutritionMenu() {

  const { selectedDateFrom, selectedDateTo, page, totalCount, limit } = useSelector(state => state.nutritions);
  const { employee } = useSelector(state => state.employees);
  const { nutritions } = useSelector(state => state.nutritions);
  const { participants } = useSelector(state => state.participants)
  const { students } = useSelector(state => state.students);
  const { classes } = useSelector(state => state.classes);

  const dispatch = useDispatch();

  const handleSelectedDateFrom = (date) => {
    dispatch(setSelectedDateFrom(date));
  };
  const handleSelectedDateTo = (date) => {
    dispatch(setSelectedDateTo(date));
  };
  const handlePage = (page) => {
    dispatch(setPage(page));
  };
  const handleClasses = (c) => {
    dispatch(setClasses(c));
  };
  const handleStudents = (s) => {
    dispatch(setStudents(s));
  };
  const handleNutritions = (e) => {
    dispatch(setNutritions(e))
  };
  const handleTotalCount = (t) => {
    dispatch(setTotalCount(t))
  }
  const handleParticipants = (p) => {
    dispatch(setParticipants(p))
  }
  useEffect(() => {
    fetchClasses(1, 999).then(data => {
      handleClasses(data.rows)
    })
    fetchParticipants(null, 1, 999).then(data => {
      handleParticipants(data.rows)
    })
    fetchStudents(null, 1, 999).then(data => {
      handleStudents(data.rows)
    })
  }, [])

  useEffect(() => {
    if (selectedDateFrom === "" && selectedDateTo === "") {
      fetchNutritions(null, null, page, 6).then(data => {
        handleNutritions(data.rows)
        handleTotalCount(data.count)
      })
    } else if (selectedDateFrom === "") {
      fetchNutritions(null, selectedDateTo, page, 6).then(data => {
        handleNutritions(data.rows)
        handleTotalCount(data.count)
      })
    } else if (selectedDateTo === "") {
      fetchNutritions(selectedDateFrom, null, page, 6).then(data => {
        handleNutritions(data.rows)
        handleTotalCount(data.count)
      })
    } else {
      fetchNutritions(selectedDateFrom, selectedDateTo, page, 6).then(data => {
        handleNutritions(data.rows)
        handleTotalCount(data.count)
      })
    }
  }, [page, selectedDateFrom, selectedDateTo])
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          From
          <Form.Control
            type="date"
            className="mt-2"
            value={selectedDateFrom}
            onChange={e => handleSelectedDateFrom(e.target.value)}
          />
          To
          <Form.Control
            type="date"
            className="mt-2"
            value={selectedDateTo}
            onChange={e => handleSelectedDateTo(e.target.value)}
          />
        </Col>
        <Col md={9} className="mt-2">
          <NutritionsList employee={employee} nutritions={nutritions} participants={participants} students={students} classes={classes} />
          <Pages totalCount={totalCount} limit={limit} page={page} handlePage={(p) => handlePage(p)} />
        </Col>
      </Row>
    </Container>
  )
}
