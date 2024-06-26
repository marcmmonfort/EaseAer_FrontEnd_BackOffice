export interface Booking {
    uuid?: string;
    idUserBooking: string;
    idOfferBooking?: string;
    idServiceBooking?: string;
    typeBooking: string;
    scheduleBooking: string;
    statusBooking: string;
    commentsBooking: string;
    deletedBooking: boolean;
    createdAt: string;
    updatedAt: string;
}