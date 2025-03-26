import React, { useMemo } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export default function StudentsList({ students, attendance, selectedDate }) {

    console.log('Attendance data:', attendance);
    console.log('Selected date:', selectedDate);

    const attendanceMap = useMemo(() => {
        const map = attendance.reduce((acc, record) => {
            console.log('Processing record:', record);


            let formattedDate;
            try {

                if (typeof record.date === 'string' && record.date.includes('-')) {
                    formattedDate = record.date;
                } else {

                    formattedDate = new Date(record.date).toISOString().split('T')[0];
                }
            } catch (error) {
                console.error('Error formatting date:', error);
                formattedDate = record.date;
            }

            console.log('Original date:', record.date);
            console.log('Formatted date:', formattedDate);

            const key = `${record.studentStudentId}-${formattedDate}`;
            console.log('Generated key:', key);
            console.log('Status value:', record.status);

            acc[key] = record.status;
            return acc;
        }, {});
        console.log('Final attendance map:', map);
        return map;
    }, [attendance]);

    if (students.length === 0) {
        return (
            <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between">
                    Empty list
                </ListGroup.Item>
            </ListGroup>
        );
    }

    return (
        <ListGroup>
            {students.map((std) => {
                const attendanceKey = `${std.student_id}-${selectedDate}`;
                console.log('Checking attendance for key:', attendanceKey);
                const isAttended = attendanceMap[attendanceKey];
                console.log('Is attended value:', isAttended);

                return (
                    <ListGroup.Item key={std.student_id}>
                        {std.name} {std.surname}
                        <Form.Check
                            reverse
                            disabled
                            label="Attended"
                            type="radio"
                            name={`attendance-${std.student_id}`}
                            id={`true-radio-${std.student_id}-${selectedDate}`}
                            checked={isAttended === true}
                        />
                        <Form.Check
                            reverse
                            disabled
                            label="Missed"
                            type="radio"
                            name={`attendance-${std.student_id}`}
                            id={`false-radio-${std.student_id}-${selectedDate}`}
                            checked={isAttended === false}
                        />
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}
