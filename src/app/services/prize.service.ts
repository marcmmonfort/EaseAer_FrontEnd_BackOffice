import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prize } from '../interfaces/prize.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class PrizeService {
    prize!: Prize;
    message!: String;
    private prizeSource = new BehaviorSubject(this.prize);
    currentPrize = this.prizeSource.asObservable();

    private apiURLPrize = environment.API_URL + '/prize/';

    // ROUTE 1: routePrize.post("/prize/create", prizeCtrl.createPrizeCtrl);
    private apiURLPrizeCreate = environment.API_URL + '/prize/create';
    // ROUTE 2: routePrize.get("/prize/getbyid/:uuid", checkJwt, prizeCtrl.getPrizeByIdCtrl);
    private apiURLPrizeGetById = environment.API_URL + '/prize/getbyid/';
    // ROUTE 3: routePrize.get("/prize/getavailable/:points", checkJwt, prizeCtrl.getPrizesAvailableCtrl);
    private apiURLPrizeGetAvailable = environment.API_URL + '/prize/getavailable/';
    // ROUTE 4: routePrize.get("/prize/getbyshop/:shop", checkJwt, prizeCtrl.getPrizesByShopCtrl);
    private apiURLPrizeGetByShop = environment.API_URL + '/prize/getbyshop/';
    // ROUTE 5: routePrize.get("/prize/listall", checkJwt, prizeCtrl.listPrizesCtrl);
    private apiURLPrizeGetAll = environment.API_URL + '/prize/listall';
    // ROUTE 6: routePrize.get("/prize/all/count/docs", checkJwt, prizeCtrl.getNumPrizesCtrl);
    private apiURLPrizeGetNum = environment.API_URL + '/prize/all/count/docs';
    // ROUTE 7: routePrize.put("/prize/update/:uuid", checkJwt, prizeCtrl.updatePrizeCtrl);
    private apiURLPrizeUpdate = environment.API_URL + '/prize/update/';
    // ROUTE 8: routePrize.delete("/prize/delete/:uuid", checkJwt, prizeCtrl.deletePrizeCtrl);
    private apiURLPrizeDelete = environment.API_URL + '/prize/delete/';

    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: createPrizeCtrl | apiURLPrizeCreate
    createPrize(prize: Prize): Observable<Location> {
        return this.http.post<Location>(this.apiURLPrizeCreate, prize,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken(),
          })
        });
    }

    // SERVICE 2: getPrizeByIdCtrl | apiURLPrizeGetById
    getPrizeById(uuid: string): Observable<Prize> {
        return this.http.get<Prize>(this.apiURLPrizeGetById + uuid, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 3: getPrizesAvailableCtrl | apiURLPrizeGetAvailable
    getPrizesAvailable(points: number): Observable<Prize[]> {
        return this.http.get<Prize[]>(this.apiURLPrizeGetAvailable + points, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 4: getPrizesByShopCtrl | apiURLPrizeGetByShop
    getPrizesByShop(shop: string): Observable<Prize[]> {
        return this.http.get<Prize[]>(this.apiURLPrizeGetByShop + shop, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 5: listPrizesCtrl | apiURLPrizeGetAll
    listPrizes(): Observable<Prize[]> {
        return this.http.get<Prize[]>(this.apiURLPrizeGetAll, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }
    
    // SERVICE 6: getNumPrizesCtrl | apiURLPrizeGetNum
    getNumPrizes(): Observable<string> {
        return this.http.get<string>(this.apiURLPrizeGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 7: updatePrizeCtrl | apiURLPrizeUpdate
    updateCard(prize: Prize, id: string): Observable<Prize> {
        return this.http.put<Prize>(this.apiURLPrizeUpdate + id, prize,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 8: deletePrizeCtrl | apiURLPrizeDelete
    deleteCard(uuid: string): Observable<Prize> {
        return this.http.delete<Prize>(this.apiURLPrizeDelete + uuid, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

}