import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, bookHoliday, deleteStudent, Student, Holiday } from './services/studentService';
import StudentList from './components/StudentList';
import StudentFormModal from './components/StudentFormModal';
import UpdateStudentModal from './components/UpdateStudentModal';
import BookHolidayModal from './components/BookHolidayModal';

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showHolidayModal, setShowHolidayModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const result = await getStudents();
        setStudents(result.data);
    };

    const handleAddStudent = async (student: Student) => {
        const result = await createStudent(student);
        setStudents([...students, result.data]);
    };

    const handleUpdateStudent = async (student: Student) => {
        if (student.id) {
            await updateStudent(student.id, student);
            loadStudents();
        }
    };

    const handleBookHoliday = async (holiday: Holiday) => {
        if (selectedStudent?.id) {
            await bookHoliday(selectedStudent.id, holiday);
            setShowHolidayModal(false);
        }
    };

    const handleDeleteStudent = async (id: string) => {
        await deleteStudent(id);
        loadStudents();
    };

    return (
        <div className="container">
            <h1 className="my-4">EC Test</h1>
            <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>Add Student</button>
            <StudentList
                students={students}
                onEdit={(student) => {
                    setSelectedStudent(student);
                    setShowUpdateModal(true);
                }}
                onDelete={handleDeleteStudent}
                onBookHoliday={(student) => {
                    setSelectedStudent(student);
                    setShowHolidayModal(true);
                }}
            />
            <StudentFormModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onSave={handleAddStudent}
            />
            <UpdateStudentModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                onUpdate={handleUpdateStudent}
                student={selectedStudent}
            />
            <BookHolidayModal
                show={showHolidayModal}
                onHide={() => setShowHolidayModal(false)}
                onBook={handleBookHoliday}
            />
        </div>
    );
};

export default App;
