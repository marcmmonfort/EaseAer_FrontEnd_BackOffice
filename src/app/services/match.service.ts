import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from '../interfaces/match.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class MatchService {
    match!: Match;
    message!: String;
    private matchSource = new BehaviorSubject(this.match);
    currentMatch = this.matchSource.asObservable();

    private apiURLMatch = environment.API_URL + '/match/';

    // ROUTE 1: routeMatch.post("/match/create", matchCtrl.createMatchCtrl);
    private apiURLMatchCreate = environment.API_URL + '/match/create';
    // ROUTE 2: routeMatch.get("/match/getbyid/:uuid", checkJwt, matchCtrl.getMatchByIdCtrl);
    private apiURLMatchGetById = environment.API_URL + '/match/getbyid/';
    // ROUTE 3: routeMatch.get("/match/getmymatches/:idUser", matchCtrl.getMyMatchesCtrl),
    private apiURLMatchGetMine = environment.API_URL + '/match/getmymatches/';
    // ROUTE 4: routeMatch.get("/match/getallnum", checkJwt, matchCtrl.getTotalNumMatchesCtrl);
    private apiURLMatchGetNum = environment.API_URL + '/match/getallnum';
    // ROUTE 5: routeMatch.put("/match/update/:uuid", checkJwt, matchCtrl.updateMatchCtrl);
    private apiURLMatchUpdate = environment.API_URL + '/match/update/';
    // ROUTE 6: routeMatch.delete("/match/delete/:uuid", checkJwt, matchCtrl.deleteMatchCtrl);
    private apiURLMatchDelete = environment.API_URL + '/match/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/match/create" | createMatch | apiURLMatchCreate
    createMatch(match: Match): Observable<Match> {
        return this.http.post<Match>(this.apiURLMatchCreate, match,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/match/getbyid/:uuid" | getMatchById | apiURLMatchGetById
    getMatchById(uuid: string): Observable<Match> {
        return this.http.get<Match>(this.apiURLMatchGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/match/getmymatches/:idUser" | getMyMatches | apiURLMatchGetMine
    getMyMatches(idUser: string): Observable<Match[]> {
        return this.http.get<Match[]>(this.apiURLMatchGetMine + idUser, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/match/getallnum" | getTotalNumMatches | apiURLMatchGetNum
    getTotalNumMatches(): Observable<string> {
        return this.http.get<string>(this.apiURLMatchGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 5: "/match/update/:uuid" | updateMatch | apiURLMatchUpdate
    updateMatch(incident: Match, id: string): Observable<Match> {
        return this.http.put<Match>(this.apiURLMatchUpdate + id, incident,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/match/delete/:uuid" | deleteMatch | apiURLMatchDelete
    deleteMatch(uuid: string): Observable<Match> {
        return this.http.delete<Match>(this.apiURLMatchDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}