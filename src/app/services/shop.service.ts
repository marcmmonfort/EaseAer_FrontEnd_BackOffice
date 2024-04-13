import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shop } from '../interfaces/shop.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class ShopService {
    shop!: Shop;
    message!: String;
    private shopSource = new BehaviorSubject(this.shop);
    currentShop = this.shopSource.asObservable();

    private apiURLShop = environment.API_URL + '/shop/';

    // ROUTE 1: routeShop.post("/shop/create", shopCtrl.createShopCtrl);
    private apiURLShopCreate = environment.API_URL + '/shop/create';
    // ROUTE 2: routeShop.get("/shop/getbyid/:uuid", checkJwt, shopCtrl.getShopByIdCtrl);
    private apiURLShopGetById = environment.API_URL + '/shop/getbyid/';
    // ROUTE 3: routeShop.get("/shop/getbylocation/:location", checkJwt, shopCtrl.getShopByLocationCtrl);
    private apiURLShopGetByLocation = environment.API_URL + '/shop/getbylocation/';
    // ROUTE 4: routeShop.get("/shop/all", checkJwt, shopCtrl.listShopCtrl);
    private apiURLShopListAll = environment.API_URL + '/shop/all';
    // ROUTE 5: routeShop.get("/shop/opened/:time", checkJwt, shopCtrl.listOpenedShopsCtrl);
    private apiURLShopListOpened = environment.API_URL + '/shop/opened/';
    // ROUTE 6: routeShop.put("/shop/update/:uuid", checkJwt, shopCtrl.updateShopCtrl);
    private apiURLShopUpdate = environment.API_URL + '/shop/update/';
    // ROUTE 7: routeShop.delete("/shop/delete/:uuid", checkJwt, shopCtrl.deleteShopCtrl);
    private apiURLShopDelete = environment.API_URL + '/shop/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: createShopCtrl | apiURLShopCreate = environment.API_URL + '/shop/create';
    createShop(shop: Shop): Observable<Shop> {
        return this.http.post<Shop>(this.apiURLShopCreate, shop,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: getShopByIdCtrl | apiURLShopGetById = environment.API_URL + '/shop/getbyid/';
    getShopById(uuid: string): Observable<Shop> {
        return this.http.get<Shop>(this.apiURLShopGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: getShopByLocationCtrl | apiURLShopGetByLocation = environment.API_URL + '/shop/getbylocation/';
    getShopByLocation(location: string): Observable<Shop> {
        return this.http.get<Shop>(this.apiURLShopGetByLocation + location, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: listShopCtrl | apiURLShopListAll = environment.API_URL + '/shop/all';
    listShops(): Observable<Shop[]> {
        return this.http.get<Shop[]>(this.apiURLShopListAll, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: listOpenedShopsCtrl | apiURLShopListOpened = environment.API_URL + '/shop/opened/';
    listOpenedShops(time: Date): Observable<Shop[]> {
        return this.http.get<Shop[]>(this.apiURLShopListOpened + time, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: updateShopCtrl | apiURLShopUpdate = environment.API_URL + '/shop/update/';
    updateShop(shop: Shop, id: string): Observable<Shop> {
        return this.http.put<Shop>(this.apiURLShopUpdate + id, shop,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: deleteShopCtrl | apiURLShopDelete = environment.API_URL + '/shop/delete/';
    deleteShop(uuid: string): Observable<Shop> {
        return this.http.delete<Shop>(this.apiURLShopDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}