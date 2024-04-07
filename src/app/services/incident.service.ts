import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../interfaces/incident.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class IncidentService {
    incident!: Incident;
    message!: String;
    private incidentSource = new BehaviorSubject(this.incident);
    currentIncident = this.incidentSource.asObservable();

    private apiURLIncident = environment.API_URL + '/incident/';

    // CASE 1: routeIncident.post("/incident/create", incidentCtrl.createIncidentCtrl);
    private apiURLIncidentCreate = environment.API_URL + '/incident/create';
    // CASE 2: routeIncident.get("/incident/getbyid/:uuid", checkJwt, incidentCtrl.getIncidentByIdCtrl);
    private apiURLIncidentGetById = environment.API_URL + '/incident/getbyid/';
    // CASE 3: routeIncident.get("/incident/getall", checkJwt, incidentCtrl.listIncidentsCtrl);
    private apiURLIncidentListAll = environment.API_URL + '/incident/getall';
    // CASE 4: routeIncident.get("/incident/getpaginated/:numPage", checkJwt, incidentCtrl.listIncidentsPagCtrl);
    private apiURLIncidentListPag = environment.API_URL + '/incident/getpaginated/';
    // CASE 5: routeIncident.get("/incident/getnumincidents", checkJwt, incidentCtrl.getNumIncidentsCtrl);
    private apiURLIncidentGetNum = environment.API_URL + '/incident/getnumincidents';
    // CASE 6: routeIncident.get("/incident/getnumbystatus/:status", checkJwt, incidentCtrl.getNumIncidentsStatusCtrl);
    private apiURLIncidentGetNumStatus = environment.API_URL + '/incident/getnumbystatus/';
    // CASE 7: routeIncident.put("/incident/update/:uuid", checkJwt, incidentCtrl.updateIncidentCtrl);
    private apiURLIncidentUpdate = environment.API_URL + '/incident/update/';
    // CASE 8: routeIncident.delete("/incident/delete/:uuid", checkJwt, incidentCtrl.deleteIncidentCtrl);
    private apiURLIncidentDelete = environment.API_URL + '/incident/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // CASE 1: "/incident/create" | createIncident | apiURLIncidentCreate
    createIncident(incident: Incident): Observable<Incident> {
        return this.http.post<Incident>(this.apiURLIncidentCreate, incident,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // CASE 2: "/incident/getbyid/:uuid" | getIncidentById | apiURLIncidentGetById
    getIncidentById(uuid: string): Observable<Incident> {
        return this.http.get<Incident>(this.apiURLIncidentGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // CASE 3: "/incident/getall" | listIncidents | apiURLIncidentListAll
    listIncidents(): Observable<Incident[]> {
        return this.http.get<Incident[]>(this.apiURLIncidentListAll, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // CASE 4: "/incident/getpaginated/:numPage" | listIncidentsPag | apiURLIncidentListPag
    listIncidentsPag(numPage: string): Observable<Incident[]> {
        return this.http.get<Incident[]>(this.apiURLIncidentListPag + numPage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // CASE 5: "/incident/getnumincidents" | getNumIncidents | apiURLIncidentGetNum
    getNumIncidents(): Observable<string> {
        return this.http.get<string>(this.apiURLIncidentGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // CASE 6: "/incident/getnumbystatus/:status" | getNumIncidentsStatus | apiURLIncidentGetNumStatus
    getNumIncidentsStatus(status: string): Observable<string> {
        return this.http.get<string>(this.apiURLIncidentGetNum + status,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // CASE 7: "/incident/update/:uuid" | updateIncident | apiURLIncidentUpdate
    updateIncident(incident: Incident, id: string): Observable<Incident> {
        return this.http.put<Incident>(this.apiURLIncidentUpdate + id, incident,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // CASE 8: "/incident/delete/:uuid" | deleteIncident | apiURLIncidentDelete
    deleteIncident(uuid: string): Observable<Incident> {
        return this.http.delete<Incident>(this.apiURLIncidentDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}