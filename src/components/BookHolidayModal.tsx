import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BookHolidayModalProps } from '../interfaces/holiday';



const BookHolidayModal: React.FC<BookHolidayModalProps> = ({ show, onHide, onBook }) => {
    const [holidayStart, setHolidayStart] = useState('');
    const [holidayEnd, setHolidayEnd] = useState('');
    const [errors, setErrors] = useState<{ startDate?: string, endDate?: string }>({});

    const handleSubmit = () => {
        const startDay = new Date(holidayStart).getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const endDay = new Date(holidayEnd).getDay();

        const startDateError = !holidayStart || startDay !== 1;
        const endDateError = !holidayEnd || endDay !== 5;

        if (startDateError || endDateError) {
            setErrors({
                startDate: startDateError ? 'Holiday start must be a Monday' : '',
                endDate: endDateError ? 'Holiday end must be a Friday' : ''
            });
            return;
        }

        if (new Date(holidayStart) >= new Date(holidayEnd)) {
            setErrors({
                startDate: 'Holiday start must be before the end date',
                endDate: 'Holiday end must be after the start date'
            });
            return;
        }

        onBook({ holidayStart:holidayStart, holidayEnd:holidayEnd });
        setHolidayStart('');
        setHolidayEnd('');
        setErrors({});
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Book Holiday</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formHolidayStart">
                        <Form.Label>Holiday Start</Form.Label>
                        <Form.Control
                            type="date"
                            value={holidayStart}
                            onChange={(e) => setHolidayStart(e.target.value)}
                        />
                        {errors.startDate && (
                            <Form.Text className="text-danger">{errors.startDate}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formHolidayEnd">
                        <Form.Label>Holiday End</Form.Label>
                        <Form.Control
                            type="date"
                            value={holidayEnd}
                            onChange={(e) => setHolidayEnd(e.target.value)}
                        />
                        {errors.endDate && (
                            <Form.Text className="text-danger">{errors.endDate}</Form.Text>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookHolidayModal;
