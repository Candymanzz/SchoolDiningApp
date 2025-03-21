export const fetchPreferences = async (page = 1, limit = 10) => {
    const response = await fetch(`http://localhost:5000/api/preference?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error("Ошибка загрузки предпочтений");
    }
    return await response.json();
};

export const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/api/student");
    if (!response.ok) {
        throw new Error("Ошибка загрузки студентов");
    }
    const data = await response.json();
    return data.rows || [];
};
