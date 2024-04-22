import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Luggage } from '../interfaces/luggage.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class LuggageService {
    luggage!: Luggage;
    message!: String;
    private luggageSource = new BehaviorSubject(this.luggage);
    currentLuggage = this.luggageSource.asObservable();

    private apiURLLuggage = environment.API_URL + '/luggage/';

    // ROUTE 1: routeLuggage.post("/luggage/create", luggageCtrl.createLuggageCtrl);
    private apiURLLuggageCreate = environment.API_URL + '/luggage/create';
    // ROUTE 2: routeLuggage.get("/luggage/getbyid/:uuid", checkJwt, luggageCtrl.getLuggageByIdCtrl);
    private apiURLLuggageGetById = environment.API_URL + '/luggage/getbyid/';
    // ROUTE 3: routeLuggage.get("/luggage/getbyflight/:flight", luggageCtrl.getLuggageByFlightCtrl);
    private apiURLLuggageGetByFlight = environment.API_URL + '/luggage/getbyflight/';
    // ROUTE 4: routeLuggage.get("/luggage/getbyuser/:user", luggageCtrl.getLuggageByUserCtrl);
    private apiURLLuggageGetByUser = environment.API_URL + '/luggage/getbyuser/';
    // ROUTE 5: routeLuggage.get("/luggage/all/count/docs", checkJwt, luggageCtrl.getNumLuggageCtrl);
    private apiURLLuggageGetNum = environment.API_URL + '/luggage/all/count/docs';
    // ROUTE 6: routeLuggage.put("/luggage/update/:uuid", checkJwt, luggageCtrl.updateLuggageByIdCtrl);
    private apiURLLuggageUpdate = environment.API_URL + '/luggage/update/';
    // ROUTE 7: routeLuggage.delete("/luggage/delete/:uuid", checkJwt, luggageCtrl.deleteLuggageCtrl);
    private apiURLLuggageDelete = environment.API_URL + '/luggage/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // ROUTE 1: "/luggage/create" | createLuggage | apiURLLuggageCreate
    createLuggage(luggage: Luggage): Observable<Luggage> {
        return this.http.post<Luggage>(this.apiURLLuggageCreate, luggage,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // ROUTE 2: "/luggage/getbyid/:uuid" | getLuggageById | apiURLLuggageGetById
    getLuggageById(uuid: string): Observable<Luggage> {
        return this.http.get<Luggage>(this.apiURLLuggageGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 3: "/luggage/getbyflight/:flight" | getLuggageByFlight | apiURLLuggageGetByFlight
    getLuggageByFlight(flight: string): Observable<Luggage[]> {
        return this.http.get<Luggage[]>(this.apiURLLuggageGetByFlight + flight, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 4: "/luggage/getbyuser/:user" | getLuggageByUser | apiURLLuggageGetByUser
    getLuggageByUser(user: string): Observable<Luggage[]> {
        return this.http.get<Luggage[]>(this.apiURLLuggageGetByUser + user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 5: "/luggage/all/count/docs" | getNumLuggage | apiURLLuggageGetNum
    getNumLuggage(): Observable<string> {
        return this.http.get<string>(this.apiURLLuggageGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // ROUTE 6: "/luggage/update/:uuid" | updateLuggageById | apiURLLuggageUpdate
    updateLuggageById(incident: Luggage, id: string): Observable<Luggage> {
        return this.http.put<Luggage>(this.apiURLLuggageUpdate + id, incident,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 7: "/luggage/delete/:uuid" | deleteLuggage | apiURLLuggageDelete
    deleteLuggage(uuid: string): Observable<Luggage> {
        return this.http.delete<Luggage>(this.apiURLLuggageDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}