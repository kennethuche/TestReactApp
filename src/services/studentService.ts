
import axios from 'axios';
import { BASE_URL } from '../constant';
import { Holiday } from '../interfaces/holiday';
import { Student } from '../interfaces/student';

export const getStudents = () => {
    return axios.get<Student[]>(`${BASE_URL}`);
};

export const createStudent = (student: Student) => {
    return axios.post<Student>(`${BASE_URL}`, student);
};

export const updateStudent = (id: string, student: Student) => {
    return axios.put<Student>(`${BASE_URL}/${id}`, student);
};

export const bookHoliday = (id: string, holiday: Holiday) => {
    return axios.post<void>(`${BASE_URL}/${id}/holiday`, holiday);
};

export const deleteStudent = (id: string) => {
    return axios.delete<void>(`${BASE_URL}/${id}`);
};
