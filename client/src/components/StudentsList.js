import React, { useMemo } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

export default function StudentsList({ students, attendance, selectedDate }) {
    const attendanceMap = useMemo(() => {
        return attendance.reduce((acc, record) => {
            const key = `${record.studentStudentId}-${record.date}`;
            acc[key] = record.status;
            return acc;
        }, {});
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
                const isAttended = attendanceMap[attendanceKey] ?? null;

                return (
                    <ListGroup.Item key={std.student_id}>
                        {std.name} {std.surname}
                        <Form.Check
                            reverse
                            disabled
                            label="Attended"
                            type="radio"
                            id={`true-radio-${std.student_id}-${selectedDate}`}
                            checked={isAttended === true}
                        />
                        <Form.Check
                            reverse
                            disabled
                            label="Missed"
                            type="radio"
                            id={`false-radio-${std.student_id}-${selectedDate}`}
                            checked={isAttended === false}
                        />
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}
