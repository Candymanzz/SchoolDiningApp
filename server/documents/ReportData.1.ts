import { Class } from "./Class";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Student } from "./Student.1";

export interface ReportData {
    employee: string;
    events: Event[];
    participants: Participant[];
    students: Student[];
    classes: Class[];
}
