
export interface HolidayResponse{
    id:string;
    startDate:string;
    endDate:string;
    studentId:string;
}
export interface Holiday {
    holidayStart: string;
    holidayEnd : string;
}

export interface BookHolidayModalProps {
    show: boolean;
    onHide: () => void;
    onBook: (holiday: Holiday) => void;
}