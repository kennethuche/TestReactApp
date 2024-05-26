import React from 'react';
import { Student } from '../services/studentService';
import { formatDate } from '../utils/dateUtils';

interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: string) => void;
    onBookHoliday: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete, onBookHoliday }) => {
    return (
        <div>
            <h2 className="text-center">Students List</h2>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.fullName}</td>
                            <td>{student.email}</td>
                            <td>
                                <ul>
                                    {student.courses.map(course => (
                                        <li key={course.id}>
                                            {course.courseName} ({formatDate(course.startDate)} - {formatDate(course.endDate)})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td  className="d-flex align-items-center">
                                <button className="btn btn-primary me-3" onClick={() => onEdit(student)}>Edit</button>
                                <button className="btn btn-secondary me-3" onClick={() => onBookHoliday(student)}>Book Holiday</button>
                                <button className="btn btn-danger" onClick={() => onDelete(student.id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default StudentList;