import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class GameService {
    game!: Game;
    message!: String;
    private gameSource = new BehaviorSubject(this.game);
    currentGame = this.gameSource.asObservable();

    private apiURLGame = environment.API_URL + '/game/';

    // ROUTE 1: routeGame.post("/game/create", gameCtrl.createGameCtrl);
    private apiURLGameCreate = environment.API_URL + '/game/create';
    // ROUTE 2: routeGame.get("/game/getbyid/:uuid", checkJwt, gameCtrl.getGameByIdCtrl);
    private apiURLGameGetById = environment.API_URL + '/game/getbyid/';
    // ROUTE 3: routeGame.get("/game/getgamesbyuser/:user", checkJwt, gameCtrl.getGamesByUserCtrl);
    private apiURLGameGetByUser = environment.API_URL + '/game/getgamesbyuser/';
    // ROUTE 4: routeGame.get("/game/getgamesbydestination/:destination", checkJwt, gameCtrl.getGamesByDestinationCtrl);
    private apiURLGameGetByDestination = environment.API_URL + '/game/getgamesbydestination/';
    // ROUTE 5: routeGame.get("/game/getquestionsofgame/:uuid", checkJwt, gameCtrl.getIdQuestionsOfGameCtrl);
    private apiURLGameGetIdQuestions = environment.API_URL + '/game/getquestionsofgame/';
    // ROUTE 6: routeGame.get("/game/all/count/docs", checkJwt, gameCtrl.getNumGamesCtrl);
    private apiURLGameGetNum = environment.API_URL + '/game/all/count/docs';
    // ROUTE 7: routeGame.put("/game/update/:uuid", checkJwt, gameCtrl.updateGameCtrl);
    private apiURLGameUpdate = environment.API_URL + '/game/update/';
    // ROUTE 8: routeGame.delete("/game/delete/:uuid", checkJwt, gameCtrl.deleteGameCtrl);
    private apiURLGameDelete = environment.API_URL + '/game/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // SERVICE 1: "/game/create" | createGame | apiURLGameCreate
    createGame(game: Game): Observable<Game> {
        return this.http.post<Game>(this.apiURLGameCreate, game,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/game/getbyid/:uuid" | getGameById | apiURLGameGetById
    getGameById(uuid: string): Observable<Game> {
        return this.http.get<Game>(this.apiURLGameGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/game/getgamesbyuser/:user" | getGamesByUser | apiURLGameGetByUser
    getGamesByUser(user: string): Observable<Game[]> {
        return this.http.get<Game[]>(this.apiURLGameGetByUser + user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 4: "/game/getgamesbydestination/:destination" | getGamesByDestination | apiURLGameGetByDestination
    getGamesByDestination(destination: string): Observable<Game[]> {
        return this.http.get<Game[]>(this.apiURLGameGetByDestination + destination, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/game/getquestionsofgame/:uuid" | getIdQuestionsOfGame | apiURLGameGetIdQuestions
    getIdQuestionsOfGame(uuid: string): Observable<string[]> {
        return this.http.get<string[]>(this.apiURLGameGetIdQuestions + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/game/all/count/docs" | getNumGames | apiURLGameGetNum
    getNumGames(): Observable<string> {
        return this.http.get<string>(this.apiURLGameGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 7: "/game/update/:uuid" | updateGame | apiURLGameUpdate
    updateGame(game: Game, id: string): Observable<Game> {
        return this.http.put<Game>(this.apiURLGameUpdate + id, game,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 8: "/game/delete/:uuid" | deleteGame | apiURLGameDelete
    deleteGame(uuid: string): Observable<Game> {
        return this.http.delete<Game>(this.apiURLGameDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }
}