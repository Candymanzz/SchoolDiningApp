export interface AttendanceRecord {
    studentStudentId: number;
    date: string;
    status: boolean | null; // true - Attended, false - Missed, null - N/A
}
