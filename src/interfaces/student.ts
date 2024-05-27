import { HolidayResponse } from "./holiday";

export interface StudentFormModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (student: Student) => void;
}
export interface Course {
    id: string;
    courseName: string;
    startDate: string;
    endDate: string;
    numberOfTutionWeek: number;
    studentId: string;
}

export interface Student {
    id: string;
    fullName: string;
    email: string;
    courses: Course[];
    holidays: HolidayResponse[];
}

export interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: string) => void;
    onBookHoliday: (student: Student) => void;
}


export interface UpdateStudentModalProps {
    show: boolean;
    onHide: () => void;
    onUpdate: (student: Student) => void;
    student: Student | null;
}