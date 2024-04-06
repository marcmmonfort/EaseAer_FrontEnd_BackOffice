import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { AuthService } from './auth.service';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})

export class LocationService {
  location!: Location;
  message!: String;
  private locationSource = new BehaviorSubject(this.location);
  currentLocation = this.locationSource.asObservable();

  private apiURL = environment.API_URL + '/location/';
  private apiURLGetAll = environment.API_URL + '/location/all';
  private apiURLGetAll2=environment.API_URL+'/locations/all'

  private apiURLLocation = environment.API_URL + '/location/';

  // ROUTE 1: locationRoute.post("/location/add", checkJwt, locationCtrl.insertLocationCtrl);
  private apiURLLocationCreate = environment.API_URL + '/location/add';
  // ROUTE 2: locationRoute.get("/locations/all", logMiddleware, locationCtrl.listLocationCtrl);
  private apiURLLocationList = environment.API_URL + '/locations/all';
  // ROUTE 3: locationRoute.get("/location/all/:numPage", checkJwt, locationCtrl.listLocationPagCtrl);
  private apiURLLocationListPag = environment.API_URL + '/location/all/';
  // ROUTE 4: locationRoute.get("/location/getbyid/:uuid", checkJwt, locationCtrl.getLocationByIdCtrl);
  private apiURLLocationGetById = environment.API_URL + '/location/getbyid/';
  // ROUTE 5: locationRoute.put("/location/update/:uuid", checkJwt, locationCtrl.updateLocationCtrl);
  private apiURLLocationUpdate = environment.API_URL + '/location/update/';
  // ROUTE 6: locationRoute.delete("/location/delete/:uuid", checkAdmin, locationCtrl.deleteLocationCtrl);
  private apiURLLocationDelete = environment.API_URL + '/location/delete/';
  // ROUTE 7: locationRoute.get("/location/all/count/docs", checkJwt, locationCtrl.getNumLocationsCtrl);
  private apiURLLocationGetNum = environment.API_URL + '/location/all/count/docs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // SERVICE 1: insertLocationCtrl | apiURLLocationCreate
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiURLLocationCreate, location,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }

  // SERVICE 2: listLocationCtrl | apiURLLocationList
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiURLLocationList,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }

  // SERVICE 3: listLocationPagCtrl | apiURLLocationListPag
  getLocations( numPage: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURLLocationListPag + numPage,{
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken(),
    })});
  }

  // SERVICE 4: getLocationByIdCtrl | apiURLLocationGetById
  getLocation(id: string): Observable<Location> {
    return this.http.get<Location>(this.apiURLLocationGetById + id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }

  // SERVICE 5: updateLocationCtrl | apiURLLocationUpdate
  updateLocation(location: Location, id: string): Observable<Location> {
    return this.http.put<Location>(this.apiURLLocationUpdate + id, location,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }

  // SERVICE 6: deleteLocationCtrl | apiURLLocationDelete
  deleteLocation(id: any): Observable<Location> {
    return this.http.delete<Location>(this.apiURLLocationDelete + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }

  // SERVICE 7: getNumLocationsCtrl | apiURLLocationGetNum
  getCountLocation():Observable<string>{
    return this.http.get<string>(this.apiURLLocationGetNum,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

}

