import { saveAs } from "file-saver"
import axios from 'axios';
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
        const res = await axios.post('http://localhost:5000/api/attendance/pdf',
            { date, classx, students, attendance },
            { responseType: 'blob' } // ВАЖНО: получаем blob-файл
        );

        // Создаём Blob и сохраняем
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `attendance-report-${date}.pdf`);

    } catch (error) {
        console.error("❌ Ошибка при скачивании PDF:", error);
    }
};

//Nutritions
export const createNutritions = async (nutrition) => {
    const { data } = await $authHost.post('api/nutrition/', nutrition)
    return data
}

export const fetchNutritions = async (dateFrom, dateTo, page, limit) => {
    const { data } = await $host.get('api/nutrition/', {
        params: {
            dateFrom, dateTo, page, limit
        }
    })
    return data
}

export const deleteNutritions = async (id) => {
    const { data } = await $authHost.delete('api/nutrition/' + id)
    return data
}

export const createAndDownloadNutritionsPdf = async (employee, nutritions, participants, students, classes) => {
    try {
        await $authHost.post('api/nutrition/pdf', { employee, nutritions, participants, students, classes });
        const res = await $authHost.get('api/nutrition/pdf', { responseType: 'blob' });
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `nutrition-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error("Error creating or downloading the PDF:", error);
    }
};

//Participants
export const createParticipant = async (studentStudentId, classClassId, nutritionNutritionId, grade) => {
    const { data } = await $authHost.post('api/participant/', { studentStudentId, classClassId, nutritionNutritionId, grade })
    return data
}

export const fetchParticipants = async (nutrition_id, page, limit) => {
    const { data } = await $host.get('api/participant/', {
        params: {
            nutrition_id, page, limit
        }
    })
    return data
}

export const deleteParticipant = async (id) => {
    const { data } = await $authHost.delete('api/participant/' + id)
    return data
}

// Preferences
export const createPreference = async (student_id, dish_name) => {
    const { data } = await $authHost.post('api/preference/', { student_id, dish_name })
    return data
}

export const fetchPreferences = async (page, limit) => {
    const { data } = await $host.get('api/preference/', {
        params: {
            page, limit
        }
    })
    return data
}

export const deletePreference = async (id) => {
    const { data } = await $authHost.delete('api/preference/' + id)
    return data
}
