export interface IBooking {
    customer: {
        name: string,
        email: string,
        phone: number
    };
    status: string;
    date: string;
}
