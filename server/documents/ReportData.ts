import { AttendanceRecord } from "./AttendanceRecord";
import { Student } from "./Student";

export interface ReportData {
    date: string;
    classx: string;
    students: Student[];
    attendance: AttendanceRecord[];
}
