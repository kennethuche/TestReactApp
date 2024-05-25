
import axios from 'axios';

const API_URL = 'https://localhost:44341/api/Student'; 

export interface Course {
    id?: string;
    courseName: string;
    startDate: string;
    endDate: string;
    studentId?: string;
}

export interface Student {
    id?: string;
    fullName: string;
    email: string;
    courses: Course[];
}

export interface Holiday {
    holidayStart: string;
    holidayEnd: string;
}

export const getStudents = () => {
    return axios.get<Student[]>(`${API_URL}`);
};

export const createStudent = (student: Student) => {
    return axios.post<Student>(`${API_URL}`, student);
};

export const updateStudent = (id: string, student: Student) => {
    return axios.put<Student>(`${API_URL}/${id}`, student);
};

export const bookHoliday = (id: string, holiday: Holiday) => {
    return axios.post<void>(`${API_URL}/${id}/holiday`, holiday);
};

export const deleteStudent = (id: string) => {
    return axios.delete<void>(`${API_URL}/${id}`);
};
