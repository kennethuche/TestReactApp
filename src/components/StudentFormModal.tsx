import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Course, StudentFormModalProps } from '../interfaces/student';


const StudentFormModal: React.FC<StudentFormModalProps> = ({ show, onHide, onSave }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState<Course[]>([{
        courseName: '', startDate: '', endDate: '',
        id: '',
        numberOfTutionWeek: 0,
        studentId: ''
    }]);
    const [errors, setErrors] = useState<{ [key: number]: { startDate?: string; endDate?: string } }>({});

    const handleAddCourse = () => {
        setCourses([...courses, {
            courseName: '', startDate: '', endDate: '',
            id: '',
            numberOfTutionWeek: 0,
            studentId: ''
        }]);
    };

    const handleCourseChange = (index: number, field: string, value: string) => {
        const newCourses = [...courses];
        newCourses[index] = { ...newCourses[index], [field]: value };
        setCourses(newCourses);

        const date = new Date(value);
        const dayOfWeek = date.getUTCDay();

        if (field === 'startDate') {
            if (dayOfWeek !== 1) {
                setErrors(prev => ({
                    ...prev,
                    [index]: { ...prev[index], startDate: 'Start date must be a Monday' }
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    [index]: { ...prev[index], startDate: '' }
                }));
            }
        } else if (field === 'endDate') {
            if (dayOfWeek !== 5) {
                setErrors(prev => ({
                    ...prev,
                    [index]: { ...prev[index], endDate: 'End date must be a Friday' }
                }));
            } else if (newCourses[index].startDate && new Date(newCourses[index].startDate) >= new Date(value)) {
                setErrors(prev => ({
                    ...prev,
                    [index]: { ...prev[index], endDate: 'End date must be after the start date' }
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    [index]: { ...prev[index], endDate: '' }
                }));
            }
        }
    };

    const handleSubmit = () => {
        const valid = courses.every((course, index) => {
            const startDateError = !course.startDate || new Date(course.startDate).getUTCDay() !== 1;
            const endDateError = !course.endDate || new Date(course.endDate).getUTCDay() !== 5;
            const dateOrderError = new Date(course.startDate) >= new Date(course.endDate);

            if (startDateError || endDateError || dateOrderError) {
                setErrors(prev => ({
                    ...prev,
                    [index]: {
                        startDate: startDateError ? 'Start date must be a Monday' : '',
                        endDate: endDateError ? 'End date must be a Friday' : dateOrderError ? 'End date must be after the start date' : ''
                    }
                }));
                return false;
            }
            return true;
        });

        if (valid) {
            onSave({
                fullName, email, courses,
                id: '',
                holidays: []
            });
            setFullName('');
            setEmail('');
            setCourses([{
                courseName: '', startDate: '', endDate: '',
                id: '',
                numberOfTutionWeek: 0,
                studentId: ''
            }]);
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label className="fw-bold">Courses</Form.Label>
                    {courses.map((course, index) => (
                        <div key={index}>
                            <Form.Group className="mb-3" controlId={`formCourseName${index}`}>
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={course.courseName}
                                    onChange={(e) => handleCourseChange(index, 'courseName', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`formStartDate${index}`}>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    className="date"
                                    type="date"
                                    value={course.startDate}
                                    onChange={(e) => handleCourseChange(index, 'startDate', e.target.value)}
                                />
                                {errors[index] && errors[index].startDate && (
                                    <Form.Text className="text-danger">{errors[index].startDate}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`formEndDate${index}`}>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    className="date"
                                    type="date"
                                    value={course.endDate}
                                    onChange={(e) => handleCourseChange(index, 'endDate', e.target.value)}
                                />
                                {errors[index] && errors[index].endDate && (
                                    <Form.Text className="text-danger">{errors[index].endDate}</Form.Text>
                                )}
                            </Form.Group>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={handleAddCourse}>Add Course</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentFormModal;
