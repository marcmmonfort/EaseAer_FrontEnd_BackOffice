import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../interfaces/service.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class ServiceService {
    service!: Service;
    message!: String;
    private serviceSource = new BehaviorSubject(this.service);
    currentService = this.serviceSource.asObservable();

    private apiURLService = environment.API_URL + '/service/';

    // CASE 1: routeService.post("/service/create", serviceCtrl.createServiceCtrl);
    private apiURLServiceCreate = environment.API_URL + '/service/create';
    // CASE 2: routeService.get("/service/getbyid/:uuid", checkJwt, serviceCtrl.getServiceByIdCtrl);
    private apiURLServiceGetById = environment.API_URL + '/service/getbyid/';
    // CASE 3: routeService.get("/service/getbylocation/:location", checkJwt, serviceCtrl.getServiceByLocationCtrl);
    private apiURLServiceGetByLocation = environment.API_URL + '/service/getbylocation/';
    // CASE 4: routeService.get("/service/all", checkJwt, serviceCtrl.listServicesCtrl);
    private apiURLServiceListAll = environment.API_URL + '/service/all';
    // CASE 5: routeService.get("/service/getbytype/:type", checkJwt, serviceCtrl.listServicesByTypeCtrl);
    private apiURLServiceListByType = environment.API_URL + '/service/getbytype/';
    // CASE 6: routeService.get("/service/opened/:time", checkJwt, serviceCtrl.listOpenedServicesCtrl);
    private apiURLServiceListOpened = environment.API_URL + '/service/opened/';
    // CASE 7: routeService.put("/service/update/:uuid", checkJwt, serviceCtrl.updateServiceCtrl);
    private apiURLServiceUpdate = environment.API_URL + '/service/update/';
    // CASE 8: routeService.delete("/service/delete/:uuid", checkJwt, serviceCtrl.deleteServiceCtrl);
    private apiURLServiceDelete = environment.API_URL + '/service/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/service/create" | createService | apiURLServiceCreate
    createService(service: Service): Observable<Location> {
        return this.http.post<Location>(this.apiURLServiceCreate, service,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/service/getbyid/:uuid" | getServiceById | apiURLServiceGetById
    getServiceById(uuid: string): Observable<Service> {
        return this.http.get<Service>(this.apiURLServiceGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/service/getbylocation/:location" | getServiceByLocation | apiURLServiceGetByLocation
    getServiceByLocation(location: string): Observable<Service> {
        return this.http.get<Service>(this.apiURLServiceGetByLocation + location, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/service/all" | listServices | apiURLServiceListAll
    listServices(): Observable<Service[]> {
        return this.http.get<Service[]>(this.apiURLServiceListAll, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/service/getbytype/:type" | listServicesByType | apiURLServiceListByType
    listServicesByType(type: string): Observable<Service[]> {
        return this.http.get<Service[]>(this.apiURLServiceListByType + type, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/service/opened/:time" | listOpenedServices | apiURLServiceListOpened
    listOpenedServices(time: Date): Observable<Service[]> {
        return this.http.get<Service[]>(this.apiURLServiceListOpened + time, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: "/service/update/:uuid" | updateService | apiURLServiceUpdate
    updateService(service: Service, id: string): Observable<Service> {
        return this.http.put<Service>(this.apiURLServiceUpdate + id, service,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 8: "/service/delete/:uuid" | deleteService | apiURLServiceDelete
    deleteService(uuid: string): Observable<Service> {
        return this.http.delete<Service>(this.apiURLServiceDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}