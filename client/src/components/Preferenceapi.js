export const fetchPreferences = async () => {
    const response = await fetch("http://localhost:5000/api/preference");
    if (!response.ok) {
        throw new Error("Ошибка загрузки предпочтений");
    }
    const data = await response.json();
    return data.rows || [];
};

export const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/api/student");
    if (!response.ok) {
        throw new Error("Ошибка загрузки студентов");
    }
    const data = await response.json();
    return data.rows || [];
};