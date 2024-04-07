import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offer } from '../interfaces/offer.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class OfferService {
    offer!: Offer;
    message!: String;
    private offerSource = new BehaviorSubject(this.offer);
    currentOffer = this.offerSource.asObservable();

    private apiURLOffer = environment.API_URL + '/offer/';

    // ROUTE 1: routeOffer.post("/offer/create", offerCtrl.createOfferCtrl);
    private apiURLOfferCreate = environment.API_URL + '/offer/create';
    // ROUTE 2: routeOffer.get("/offer/getbyid/:uuid", checkJwt, offerCtrl.getOfferByIdCtrl);
    private apiURLOfferGetById = environment.API_URL + '/offer/getbyid/';
    // ROUTE 3: routeOffer.get("/offer/getbyproduct/:product", checkJwt, offerCtrl.getOffersByProductCtrl);
    private apiURLOfferGetByProduct = environment.API_URL + '/offer/getbyproduct/';
    // ROUTE 4: routeOffer.get("/offer/getbyshop/:shop", checkJwt, offerCtrl.getOffersByShopCtrl);
    private apiURLOfferGetByShop = environment.API_URL + '/offer/getbyshop/';
    // ROUTE 5: routeOffer.get("/offer/listall", checkJwt, offerCtrl.listOfferCtrl);
    private apiURLOfferList = environment.API_URL + '/offer/listall';
    // ROUTE 6: routeOffer.put("/offer/update/:uuid", checkJwt, offerCtrl.updateOfferCtrl);
    private apiURLOfferUpdate = environment.API_URL + '/offer/update/';
    // ROUTE 7: routeOffer.delete("/offer/delete/:uuid", checkJwt, offerCtrl.deleteOfferCtrl);
    private apiURLOfferDelete = environment.API_URL + '/offer/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/offer/create" | createOffer | apiURLOfferCreate
    createOffer(offer: Offer): Observable<Offer> {
        return this.http.post<Offer>(this.apiURLOfferCreate, offer,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/offer/getbyid/:uuid" | getOfferById | apiURLOfferGetById
    getOfferById(uuid: string): Observable<Offer> {
        return this.http.get<Offer>(this.apiURLOfferGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/offer/getbyproduct/:product" | getOffersByProduct | apiURLOfferGetByProduct
    getOffersByProduct(product: string): Observable<Offer[]> {
        return this.http.get<Offer[]>(this.apiURLOfferGetByProduct + product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/offer/getbyshop/:shop" | getOffersByShop | apiURLOfferGetByShop
    getOffersByShop(shop: string): Observable<Offer[]> {
        return this.http.get<Offer[]>(this.apiURLOfferGetByShop + shop, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/offer/listall" | listOffer | apiURLOfferList
    listOffer(): Observable<Offer[]> {
        return this.http.get<Offer[]>(this.apiURLOfferList, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/offer/update/:uuid" | updateOffer | apiURLOfferUpdate
    updateOffer(offer: Offer, id: string): Observable<Offer> {
        return this.http.put<Offer>(this.apiURLOfferUpdate + id, offer,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: "/offer/delete/:uuid" | deleteOffer | apiURLOfferDelete
    deleteOffer(uuid: string): Observable<Offer> {
        return this.http.delete<Offer>(this.apiURLOfferDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }
    
}