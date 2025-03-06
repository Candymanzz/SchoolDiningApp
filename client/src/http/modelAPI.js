import { saveAs } from "file-saver"
import { $authHost, $host } from "./index"

//Classes
export const createClass = async (name, employeeEmployeeId) => {
    const { data } = await $authHost.post('api/class/', { name, employeeEmployeeId })
    return data
}

export const fetchClasses = async (page, limit) => {
    const { data } = await $host.get('api/class/', {
        params: {
            page, limit
        }
    })
    return data
}

export const deleteClass = async (id) => {
    const { data } = await $authHost.delete('api/class/' + id)
    return data
}

//Students
export const createStudent = async (name, surname, classClassId) => {
    const { data } = await $authHost.post('api/student/', { name, surname, classClassId })
    return data
}

export const fetchStudents = async (classClassId, page, limit) => {
    const { data } = await $host.get('api/student/', {
        params: {
            classClassId, page, limit
        }
    })
    return data
}

export const deleteStudent = async (id) => {
    const { data } = await $authHost.delete('api/student/' + id)
    return data
}

//Attendance
export const createAttendance = async (studentStudentId, status, date) => {
    const { data } = await $authHost.post('api/attendance/', { studentStudentId, status, date })
    return data
}

export const fetchAttendance = async (student_id) => {
    const { data } = await $host.get('api/attendance/', {
        params: {
            student_id
        }
    })
    return data
}

export const deleteAttendance = async (id) => {
    const { data } = await $authHost.delete('api/attendance/' + id)
    return data
}

export const createAndDownloadAttendPdf = async (date, classx, students, attendance) => {
    try {

        await $authHost.post('api/attendance/pdf', { date, classx, students, attendance });

        const res = await $authHost.get('api/attendance/pdf', { responseType: 'blob' });

        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `attendance-report-(${date}).pdf`);
    } catch (error) {
        console.error("Error creating or downloading the PDF:", error);
    }
};


//Events
export const createEvent = async (event) => {
    const { data } = await $authHost.post('api/event/', event)
    return data
}

export const fetchEvents = async (dateFrom, dateTo, page, limit) => {
    const { data } = await $host.get('api/event/', {
        params: {
            dateFrom, dateTo, page, limit
        }
    })
    return data
}

export const deleteEvent = async (id) => {
    const { data } = await $authHost.delete('api/event/' + id)
    return data
}

export const createAndDownloadEventsPdf = async (date, classx, students, attendance) => {
    try {

        await $authHost.post('api/attendance/pdf', { date, classx, students, attendance });

        const res = await $authHost.get('api/attendance/pdf', { responseType: 'blob' });

        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `attendance-report-(${date}).pdf`);
    } catch (error) {
        console.error("Error creating or downloading the PDF:", error);
    }
};

//Participants
export const createParticipant = async (studentStudentId, classClassId, eventEventId, grade) => {
    const { data } = await $authHost.post('api/participant/', { studentStudentId, classClassId, eventEventId, grade })
    return data
}

export const fetchParticipants = async (event_id, page, limit) => {
    const { data } = await $host.get('api/participant/', {
        params: {
            event_id, page, limit
        }
    })
    return data
}

export const deleteParticipant = async (id) => {
    const { data } = await $authHost.delete('api/participant/' + id)
    return data
}
