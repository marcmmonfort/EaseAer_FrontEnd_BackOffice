import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../interfaces/flight.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class FlightService {
    flight!: Flight;
    message!: String;
    private flightSource = new BehaviorSubject(this.flight);
    currentFlight = this.flightSource.asObservable();

    private apiURLFlight = environment.API_URL + '/flight/';

    // ROUTE 1: routeFlight.get("/flight/getbyid/:uuid", checkJwt, flightCtrl.getFlightByIdCtrl);
    private apiURLFlightGetById = environment.API_URL + '/flight/getbyid/';
    // ROUTE 2: routeFlight.get("/flight/flightsby/:airport/:startDate/:endDate", flightCtrl.getFlightsByAirportAndIntervalCtrl);
    private apiURLFlightGetFlights = environment.API_URL + '/flight/flightsby/';
    // ROUTE 3: routeFlight.get("/flight/departuresby/:originFlight/:startDate/:endDate", flightCtrl.getDeparturesByAirportAndIntervalCtrl);
    private apiURLFlightGetDepartures = environment.API_URL + '/flight/departuresby/';
    // ROUTE 4: routeFlight.get("/flight/arrivalsby/:destinationFlight/:startDate/:endDate", flightCtrl.getArrivalsByAirportAndIntervalCtrl);
    private apiURLFlightGetArrivals = environment.API_URL + '/flight/arrivalsby/';
    // ROUTE 5: routeFlight.get("/flight/all/count/docs", checkJwt, flightCtrl.getNumFlightsCtrl);
    private apiURLFlightGetNum = environment.API_URL + '/flight/all/count/docs';
    // ROUTE 6: routeFlight.get("/flight/bycompany/:companyName/:startDate/:endDate", flightCtrl.getFlightsByCompanyCtrl);
    private apiURLFlightsByCompany = environment.API_URL + '/flight/bycompany/';
    // ROUTE 7: routeFlight.post("/flight/createflight", flightCtrl.createFlightCtrl);
    private apiURLFlightCreate = environment.API_URL + '/flight/createflight';
    // ROUTE 8: routeFlight.put("/flight/update/:uuid", checkJwt, flightCtrl.updateFlightByIdCtrl);
    private apiURLFlightUpdate = environment.API_URL + '/flight/update/';
    // ROUTE 9: routeFlight.delete("/flight/delete/:uuid", checkJwt, flightCtrl.deleteFlightCtrl);
    private apiURLFlightDelete = environment.API_URL + '/flight/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/flight/getbyid/:uuid" | getFlightById | apiURLFlightGetById
    getFlightById(uuid: string): Observable<Flight> {
        return this.http.get<Flight>(this.apiURLFlightGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 2: "/flight/flightsby/:airport/:startDate/:endDate" | getFlightsByAirportAndInterval | apiURLFlightGetFlights
    getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.apiURLFlightGetFlights + airport + "/" + startDate + "/" + endDate, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/flight/departuresby/:originFlight/:startDate/:endDate" | getDeparturesByAirportAndInterval | apiURLFlightGetDepartures
    getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.apiURLFlightGetDepartures + originFlight + "/" + startDate + "/" + endDate, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/flight/arrivalsby/:destinationFlight/:startDate/:endDate" | getArrivalsByAirportAndInterval | apiURLFlightGetArrivals
    getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.apiURLFlightGetArrivals + destinationFlight + "/" + startDate + "/" + endDate, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/flight/all/count/docs" | flightCtrl.getNumFlights | apiURLFlightGetNum
    getNumFlights(): Observable<string> {
        return this.http.get<string>(this.apiURLFlightGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 6: "/flight/bycompany/:companyName/:startDate/:endDate" | getFlightsByCompany | apiURLFlightsByCompany
    getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.apiURLFlightGetDepartures + companyName + "/" + startDate + "/" + endDate, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: "/flight/createflight" | createFlight | apiURLFlightCreate
    createFlight(flight: Flight): Observable<Flight> {
        return this.http.post<Flight>(this.apiURLFlightCreate, flight,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 8: "/flight/update/:uuid" | updateFlightById | apiURLFlightUpdate
    updateFlightById(incident: Flight, id: string): Observable<Flight> {
        return this.http.put<Flight>(this.apiURLFlightUpdate + id, incident,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 9: "/flight/delete/:uuid" | deleteFlight | apiURLFlightDelete
    deleteFlight(uuid: string): Observable<Flight> {
        return this.http.delete<Flight>(this.apiURLFlightDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}