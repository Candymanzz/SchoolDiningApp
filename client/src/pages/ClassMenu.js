import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setClasses, setTotalCount, setPage } from "../store/classesSlice"
import Pages from '../components/Pages'
import ClassesList from '../components/ClassesList';
import { fetchClasses, fetchEvents, fetchParticipants } from '../http/modelAPI'
import { setEvents } from '../store/eventsSlice'
import { setParticipants } from '../store/participantsSlice'

export default function ClassMenu() {
  const { classes } = useSelector((state) => {
    return state.classes;
  })
  const { page, totalCount, limit } = useSelector((state) => {
    return state.classes;
  })
  const dispatch = useDispatch();
  const handleClasses = (t) => {
    dispatch(setClasses(t))
  }
  const handleTotalCount = (c) => {
    dispatch(setTotalCount(c))
  }
  const handlePage = (n) => {
    dispatch(setPage(n))
  }
  const handleEvents = (e) => {
    dispatch(setEvents(e))
  }
  const handleParticipants = (p) => {
    dispatch(setParticipants(p))
  }

  useEffect(() => {
    fetchClasses(1, 4).then(data => {
      handleClasses(data.rows)
      handleTotalCount(data.count)
    })
    fetchEvents(null,null,1,999).then(data => {
      handleEvents(data.rows)
    })
    fetchParticipants(null,1,999).then(data => {
      handleParticipants(data.rows)
    })
  }, [])

  useEffect(() => {
    fetchClasses(page, 4).then(data => {
      handleClasses(data.rows)
      handleTotalCount(data.count)
    })
  }, [page])
  return (
    <Container>
      <Row className="mt-2">
        <Col className="mt-2">
          <ClassesList classes={classes} />
          <Pages totalCount={totalCount} limit={limit} page={page} handlePage={(p) => handlePage(p)} />
        </Col>
      </Row>
    </Container>
  )
}
