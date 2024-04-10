import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '../interfaces/preferences.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class PreferencesService {
    preferences!: Preferences;
    message!: String;
    private preferencesSource = new BehaviorSubject(this.preferences);
    currentPreferences = this.preferencesSource.asObservable();

    private apiURLPreferences = environment.API_URL + '/preferences/';

    // ROUTE 1: routePreferences.post("/preferences/create", preferencesCtrl.createPreferencesCtrl);
    private apiURLPreferencesCreate = environment.API_URL + '/preferences/create';
    // ROUTE 2: routePreferences.get("/preferences/getbyid/:uuid", checkJwt, preferencesCtrl.getPreferencesByIdCtrl);
    private apiURLPreferencesGetById = environment.API_URL + '/preferences/getbyid/';
    // ROUTE 3: routePreferences.get("/preferences/getdelta/:uuid", checkJwt, preferencesCtrl.getDeltaOfPreferencesCtrl);
    private apiURLPreferencesGetDelta = environment.API_URL + '/preferences/getdelta/';
    // ROUTE 4: routePreferences.get("/preferences/all/count/docs", checkJwt, preferencesCtrl.getNumPreferencesCtrl);
    private apiURLPreferencesGetNum = environment.API_URL + '/preferences/all/count/docs';
    // ROUTE 5: routePreferences.put("/preferences/update/:uuid", checkJwt, preferencesCtrl.updatePreferencesByIdCtrl);
    private apiURLPreferencesUpdate = environment.API_URL + '/preferences/update/';
    // ROUTE 6: routePreferences.delete("/preferences/delete/:uuid", checkJwt, preferencesCtrl.deletePreferencesCtrl);
    private apiURLPreferencesDelete = environment.API_URL + '/preferences/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/preferences/create" | createPreferences | apiURLPreferencesCreate
    createPreferences(preferences: Preferences): Observable<Preferences> {
        return this.http.post<Preferences>(this.apiURLPreferencesCreate, preferences,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/preferences/getbyid/:uuid" | getPreferencesById | apiURLPreferencesGetById
    getPreferencesById(uuid: string): Observable<Preferences> {
        return this.http.get<Preferences>(this.apiURLPreferencesGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/preferences/getdelta/:uuid" | getDeltaOfPreferences | apiURLPreferencesGetDelta
    getDeltaOfPreferences(uuid: string): Observable<string> {
        return this.http.get<string>(this.apiURLPreferencesGetDelta + uuid,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 4: "/preferences/all/count/docs" | getNumPreferences | apiURLPreferencesGetNum
    getNumPreferences(): Observable<string> {
        return this.http.get<string>(this.apiURLPreferencesGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 5: "/preferences/update/:uuid" | updatePreferencesById | apiURLPreferencesUpdate
    updatePreferencesById(preferences: Preferences, id: string): Observable<Preferences> {
        return this.http.put<Preferences>(this.apiURLPreferencesUpdate + id, preferences,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/preferences/delete/:uuid" | deletePreferences | apiURLPreferencesDelete
    deletePreferences(uuid: string): Observable<Preferences> {
        return this.http.delete<Preferences>(this.apiURLPreferencesDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}