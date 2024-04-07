import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../interfaces/card.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class CardService {
    card!: Card;
    message!: String;
    private cardSource = new BehaviorSubject(this.card);
    currentCard = this.cardSource.asObservable();

    private apiURLCard = environment.API_URL + '/card/';

    // ROUTE 1: routeCard.post("/card/create", cardCtrl.createCardCtrl);
    private apiURLCardCreate = environment.API_URL + '/card/create';
    // ROUTE 2: routeCard.get("/card/getbyid/:uuid", checkJwt, cardCtrl.getCardByIdCtrl);
    private apiURLCardGetById = environment.API_URL + '/card/getbyid/';
    // ROUTE 3: routeCard.get("/card/getbyuser/:user", cardCtrl.getCardByUserCtrl),
    private apiURLCardGetByUser = environment.API_URL + '/card/getbyuser/';
    // ROUTE 4: routeCard.get("/card/getall", checkJwt, cardCtrl.listCardsCtrl);
    private apiURLCardList = environment.API_URL + '/card/getall';
    // ROUTE 5: routeCard.get("/card/getallpag/:numPage", checkJwt, cardCtrl.listCardsPagCtrl);
    private apiURLCardListPag = environment.API_URL + '/card/getallpag/';
    // ROUTE 6: routeCard.put("/card/update/:uuid", checkJwt, cardCtrl.updateCardCtrl);
    private apiURLCardUpdate = environment.API_URL + '/card/update/';
    // ROUTE 7: routeCard.delete("/card/delete/:uuid", checkJwt, cardCtrl.deleteCardCtrl);
    private apiURLCardDelete = environment.API_URL + '/card/delete/';
    // ROUTE 8: routeCard.get("/card/all/count/docs", checkJwt, cardCtrl.getNumCardsCtrl);
    private apiURLCardGetNum = environment.API_URL + '/card/all/count/docs';

    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: createCardCtrl | apiURLCardCreate
    createCard(card: Card): Observable<Location> {
        return this.http.post<Location>(this.apiURLCardCreate, card,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getToken(),
          })
        });
    }

    // SERVICE 2: getCardByIdCtrl | apiURLCardGetById
    getCardById(uuid: string): Observable<Card> {
        return this.http.get<Card>(this.apiURLCardGetById + uuid, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 3: getCardByUserCtrl | apiURLCardGetByUser
    getCardByUser(idUserCard: string): Observable<Card> {
        return this.http.get<Card>(this.apiURLCardGetByUser + idUserCard, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 4: listCardsCtrl | apiURLCardList
    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(this.apiURLCardList, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 5: listCardsPagCtrl | apiURLCardListPag
    getCardsPag(numPage: string): Observable<Card[]> {
        return this.http.get<Card[]>(this.apiURLCardListPag + numPage, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 6: updateCardCtrl | apiURLCardUpdate
    updateCard(card: Card, id: string): Observable<Card> {
        return this.http.put<Card>(this.apiURLCardUpdate + id, card,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 7: deleteCardCtrl | apiURLCardDelete
    deleteCard(uuid: string): Observable<Card> {
        return this.http.delete<Card>(this.apiURLCardDelete + uuid, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 8: getNumCardsCtrl | apiURLCardGetNum
    getNumCards(): Observable<string> {
        return this.http.get<string>(this.apiURLCardGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

}