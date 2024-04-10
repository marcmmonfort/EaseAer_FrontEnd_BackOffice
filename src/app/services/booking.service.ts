import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../interfaces/booking.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class BookingService {
    booking!: Booking;
    message!: String;
    private bookingSource = new BehaviorSubject(this.booking);
    currentBooking = this.bookingSource.asObservable();

    private apiURLBooking = environment.API_URL + '/booking/';

    // ROUTE 1: routeBooking.post("/booking/create", bookingCtrl.createBookingCtrl);
    private apiURLBookingCreate = environment.API_URL + '/booking/create';
    // ROUTE 2: routeBooking.get("/booking/getbyid/:uuid", checkJwt, bookingCtrl.getBookingByIdCtrl);
    private apiURLBookingGetById = environment.API_URL + '/booking/getbyid/';
    // ROUTE 3: routeBooking.get("/booking/getbyuser/:uuid", checkJwt, bookingCtrl.getBookingsByUserCtrl);
    private apiURLBookingGetByUser = environment.API_URL + '/booking/getbyuser/';
    // ROUTE 4: routeBooking.get("/booking/getbycompany/:uuid", checkJwt, bookingCtrl.getBookingsByCompanyCtrl);
    private apiURLBookingGetByCompany = environment.API_URL + '/booking/getbycompany/';
    // ROUTE 5: routeBooking.get("/booking/getbyservice/:uuid", checkJwt, bookingCtrl.getBookingsByServiceCtrl);
    private apiURLBookingGetByService = environment.API_URL + '/booking/getbyservice/';
    // ROUTE 6: routeBooking.get("/booking/all/count/docs", checkJwt, bookingCtrl.getNumBookingsCtrl);
    private apiURLBookingGetNum = environment.API_URL + '/booking/all/count/docs';
    // ROUTE 7: routeBooking.put("/booking/update/:uuid", checkJwt, bookingCtrl.updateBookingCtrl);
    private apiURLBookingUpdate = environment.API_URL + '/booking/update/';
    // ROUTE 8: routeBooking.delete("/booking/delete/:uuid", checkJwt, bookingCtrl.deleteBookingCtrl);
    private apiURLBookingDelete = environment.API_URL + '/booking/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/booking/create" | createBooking | apiURLBookingCreate
    createBooking(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(this.apiURLBookingCreate, booking,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/booking/getbyid/:uuid" | getBookingById | apiURLBookingGetById
    getBookingById(uuid: string): Observable<Booking> {
        return this.http.get<Booking>(this.apiURLBookingGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/booking/getbyuser/:uuid" | getBookingsByUser | apiURLBookingGetByUser
    getBookingsByUser(uuid: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiURLBookingGetByUser + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/booking/getbycompany/:uuid" | getBookingsByCompany | apiURLBookingGetByCompany
    getBookingsByCompany(uuid: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiURLBookingGetByCompany + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/booking/getbyservice/:uuid" | getBookingsByService | apiURLBookingGetByService
    getBookingsByService(uuid: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiURLBookingGetByService + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/booking/all/count/docs" | getNumBookings | apiURLBookingGetNum
    getNumBookings(): Observable<string> {
        return this.http.get<string>(this.apiURLBookingGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 7: "/booking/update/:uuid" | updateBooking | apiURLBookingUpdate
    updateBooking(booking: Booking, id: string): Observable<Booking> {
        return this.http.put<Booking>(this.apiURLBookingUpdate + id, booking,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }
    
    // SERVICE 8: "/booking/delete/:uuid" | deleteBooking | apiURLBookingDelete
    deleteBooking(uuid: string): Observable<Booking> {
        return this.http.delete<Booking>(this.apiURLBookingDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}