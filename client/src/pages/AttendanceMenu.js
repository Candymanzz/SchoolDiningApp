import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Pages from '../components/Pages';
import ClassesDrop from '../components/ClassesDrop';
import StudentsList from '../components/StudentsList';
import { useDispatch, useSelector } from 'react-redux';
import { setAttendance, setSelectedClass, setSelectedDate } from '../store/attendanceSlice';
import { createAndDownloadAttendPdf, fetchAttendance, fetchClasses, fetchStudents } from '../http/modelAPI';
import { setClasses } from '../store/classesSlice';
import { setPage, setStudents, setTotalCount } from '../store/studentsSlice';
import { saveAs } from 'file-saver';
import axios from 'axios';

const AttendanceMenu = () => {
  const { attendance, selectedDate, selectedClass } = useSelector(state => state.attendance);
  const { classes } = useSelector(state => state.classes);
  const { students, page, totalCount, limit } = useSelector(state => state.students);

  const dispatch = useDispatch();

  const handleSelectedDate = (date) => {
    const today = new Date().toISOString().split('T')[0];
    dispatch(setSelectedDate(date || today));
  };

  const handleSelectedClass = (classId) => {
    dispatch(setSelectedClass(classId));
  };

  const handlePage = (page) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesData, attendanceData, studentsData] = await Promise.all([
          fetchClasses(1, 999),
          fetchAttendance(),
          fetchStudents(null, 1, 10),
        ]);

        dispatch(setClasses(classesData.rows));
        dispatch(setAttendance(attendanceData.rows));
        dispatch(setStudents(studentsData.rows));
        dispatch(setTotalCount(studentsData.count));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const studentsData = selectedClass === "All"
          ? await fetchStudents(null, page, 10)
          : await fetchStudents(selectedClass, page, 10);

        dispatch(setStudents(studentsData.rows));
        dispatch(setTotalCount(studentsData.count));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudentsData();
  }, [page, selectedClass, selectedDate, dispatch]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <Form.Control
            type="date"
            className="mt-2"
            value={selectedDate}
            onChange={e => handleSelectedDate(e.target.value)}
          />
          <ClassesDrop
            classes={classes}
            setClass={handleSelectedClass}
            selectedClass={selectedClass}
          />
          <Button variant='outline-success' className="mt-2"
            onClick={() => createAndDownloadAttendPdf(selectedDate, selectedClass, students, attendance)}>
            Download report
          </Button>
        </Col>
        <Col md={9} className="mt-2">
          <StudentsList students={students} attendance={attendance} selectedDate={selectedDate} />
          <Pages
            totalCount={totalCount}
            limit={limit}
            page={page}
            handlePage={handlePage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceMenu;
