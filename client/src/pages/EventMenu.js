import React, { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, setPage, setSelectedDateFrom, setSelectedDateTo, setTotalCount } from '../store/eventsSlice';
import EventsList from '../components/EventsList';
import Pages from '../components/Pages';
import { createAndDownloadEventsPdf, fetchClasses, fetchEvents, fetchParticipants, fetchStudents } from '../http/modelAPI';
import { setClasses } from '../store/classesSlice';
import { setStudents } from '../store/studentsSlice';
import { setParticipants } from '../store/participantsSlice';

export default function EventMenu() {
  const { selectedDateFrom, selectedDateTo, page, totalCount, limit } = useSelector(state => state.events);
      const { employee } = useSelector(state => state.employees);
      const { events } = useSelector(state => state.events);
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
  const handleEvents = (e) => {
    dispatch(setEvents(e))
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
      fetchEvents(null, null, page, 6).then(data => {
        handleEvents(data.rows)
        handleTotalCount(data.count)
      })
    } else if (selectedDateFrom === "") {
      fetchEvents(null, selectedDateTo, page, 6).then(data => {
        handleEvents(data.rows)
        handleTotalCount(data.count)
      })
    } else if (selectedDateTo === "") {
      fetchEvents(selectedDateFrom, null, page, 6).then(data => {
        handleEvents(data.rows)
        handleTotalCount(data.count)
      })
    } else {
      fetchEvents(selectedDateFrom, selectedDateTo, page, 6).then(data => {
        handleEvents(data.rows)
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
          <Button variant='outline-success' className="mt-2" onClick={() => {createAndDownloadEventsPdf(employee, events, participants, students, classes)}}>Download report</Button>
        </Col>
        <Col md={9} className="mt-2">
          <EventsList employee = {employee} events = {events} participants={participants} students={students} classes={classes} />
          <Pages totalCount={totalCount} limit={limit} page={page} handlePage={(p) => handlePage(p)} />
        </Col>
      </Row>
    </Container>
  )
}
