import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prediction } from '../interfaces/prediction.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class PredictionService {
    prediction!: Prediction;
    message!: String;
    private predictionSource = new BehaviorSubject(this.prediction);
    currentPrediction = this.predictionSource.asObservable();

    private apiURLPrediciton = environment.API_URL + '/prediction/';

    // ROUTE 1: routePrediction.post("/prediction/create", predictionCtrl.createPredictionCtrl);
    private apiURLPredicitonCreate = environment.API_URL + '/prediction/create';
    // ROUTE 2: routePrediction.get("/prediction/getbyid/:uuid", checkJwt, predictionCtrl.getPredictionByIdCtrl);
    private apiURLPredicitonGetById = environment.API_URL + '/prediction/getbyid/';
    // ROUTE 3: routePrediction.get("/prediction/all/count/docs", checkJwt, predictionCtrl.getNumPredictionsCtrl);
    private apiURLPredicitonGetNum = environment.API_URL + '/prediction/all/count/docs';
    // ROUTE 4: routePrediction.get("/prediction/gettraveltime/:uuid", checkJwt, predictionCtrl.getTravelTimeOfPredictionCtrl);
    private apiURLPredicitonGetTravelTime = environment.API_URL + '/prediction/gettraveltime/';
    // ROUTE 5: routePrediction.put("/prediction/update/:uuid", checkJwt, predictionCtrl.updatePredictionByIdCtrl);
    private apiURLPredicitonUpdate = environment.API_URL + '/prediction/update/';
    // ROUTE 6: routePrediction.delete("/prediction/delete/:uuid", checkJwt, predictionCtrl.deletePredictionCtrl);
    private apiURLPredicitonDelete = environment.API_URL + '/prediction/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/prediction/create" | createPrediction | apiURLPredicitonCreate
    createPrediction(prediction: Prediction): Observable<Prediction> {
        return this.http.post<Prediction>(this.apiURLPredicitonCreate, prediction,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/prediction/getbyid/:uuid" | getPredictionById | apiURLPredicitonGetById
    getPredictionById(uuid: string): Observable<Prediction> {
        return this.http.get<Prediction>(this.apiURLPredicitonGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/prediction/all/count/docs" | getNumPredictions | apiURLPredicitonGetNum
    getNumPredictions(): Observable<string> {
        return this.http.get<string>(this.apiURLPredicitonGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 4: "/prediction/gettraveltime/:uuid" | getTravelTimeOfPrediction | apiURLPredicitonGetTravelTime
    getTravelTimeOfPrediction(uuid: string): Observable<string> {
        return this.http.get<string>(this.apiURLPredicitonGetTravelTime + uuid,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 5: "/prediction/update/:uuid" | updatePredictionById | apiURLPredicitonUpdate
    updateIncident(prediction: Prediction, id: string): Observable<Prediction> {
        return this.http.put<Prediction>(this.apiURLPredicitonUpdate + id, prediction,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/prediction/delete/:uuid" | deletePrediction | apiURLPredicitonDelete
    deletePrediction(uuid: string): Observable<Prediction> {
        return this.http.delete<Prediction>(this.apiURLPredicitonDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}