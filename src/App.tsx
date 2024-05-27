import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getStudents, createStudent, updateStudent, bookHoliday, deleteStudent } from './services/studentService';
import StudentList from './components/StudentList';
import StudentFormModal from './components/StudentFormModal';
import UpdateStudentModal from './components/UpdateStudentModal';
import BookHolidayModal from './components/BookHolidayModal';
import { Student } from './interfaces/student';
import { Holiday } from './interfaces/holiday';

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
        if(result.status === 201){
            setShowAddModal(false);
            loadStudents();
        }
        
    };

    const handleUpdateStudent = async (student: Student) => {
        if (student.id) {
            await updateStudent(student.id, student);
            setShowUpdateModal(false);
            loadStudents();
        }
    };

    const handleBookHoliday = async (holiday: Holiday) => {
        if (selectedStudent?.id) {
            await bookHoliday(selectedStudent.id, holiday);
            setShowHolidayModal(false);
            loadStudents();
        }
    };

    const handleDeleteStudent = async (id: string) => {
        await deleteStudent(id);
        loadStudents();
    };

    return (
        <Router>
            <div className="container">
                <div className="header">
                    <h1 className="my-4">EC Test</h1>
                    <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>
                        Add Student
                    </button>
                </div>
                <Routes>
                    <Route path="/" element={
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
                    } />
                    <Route path="/students" element={
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
                    } />
                </Routes>
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
        </Router>
    );
};

export default App;
