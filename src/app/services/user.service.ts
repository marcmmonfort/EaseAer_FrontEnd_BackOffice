import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LogIn } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    user!: User;
    message!: String;
    private userSource = new BehaviorSubject(this.user);
    currentUser = this.userSource.asObservable();

    private apiURLUser = environment.API_URL + '/user/';

    // ROUTE 1: routeUser.post("/user/register", userCtrl.registerUserCtrl);
    private apiURLUserRegister = environment.API_URL + '/user/register';
    // ROUTE 2: routeUser.get("/user/:uuid", checkJwt, userCtrl.getUserByIdCtrl);
    private apiURLUserGetById = environment.API_URL + '/user/';
    // ROUTE 3: routeUser.get("/user/google/check/:mailUser", userCtrl.getUserByEmailCtrl),
    private apiURLUserGetByMail = environment.API_URL + '/user/google/check/';
    // ROUTE 4: routeUser.get("/user/search/:search", checkJwt, userCtrl.getSearchUsersCtrl);
    private apiURLUserGetSearch = environment.API_URL + '/user/search/';
    // ROUTE 5: routeUser.get("/user/all/count/docs", checkJwt, userCtrl.getNumUsersCtrl);
    private apiURLUserGetNum = environment.API_URL + '/user/all/count/docs';
    // ROUTE 6: routeUser.get("/users/all", checkJwt, userCtrl.listUserCtrl);
    private apiURLUserList = environment.API_URL + '/users/all';
    // ROUTE 7: routeUser.get("/user/all/:numPage", checkJwt, userCtrl.listUserPagCtrl);
    private apiURLUserListPag = environment.API_URL + '/user/all/';
    // ROUTE 8: routeUser.post("/user/login", userCtrl.loginUserCtrl);
    private apiURLUserLog = environment.API_URL + '/user/login';
    // ROUTE 9: routeUser.post("/user/loginfrontend", userCtrl.loginFrontEndUserCtrl);
    private apiURLUserLogFE = environment.API_URL + '/user/loginfrontend';
    // ROUTE 10: routeUser.put("/user/update/:uuid", checkJwt, userCtrl.updateUserCtrl);
    private apiURLUserUpdate = environment.API_URL + '/user/update/';
    // ROUTE 11: routeUser.delete("/user/delete/:uuid", checkJwt, userCtrl.deleteUserCtrl);
    private apiURLUserDelete = environment.API_URL + '/user/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // registerUser(data: UserAuthEntity): Promise<UserAuthEntity | null | string>;

    // getUserById(uuid: string): Promise<UserEntity | null>;
    getUser(uuid: string): Observable<User> {
      return this.http.get<User>(this.apiURLUserGetById + uuid, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

    // getUserByEmail(email: string): Promise<UserEntity | null>;

    // getSearchUsers(search: string): Promise<UserEntity[] | null>;

    // getNumUsers(): Promise<string | null>;
    getCountUser(): Observable<string> {
      return this.http.get<string>(this.apiURLUserGetNum,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

    // listUser(): Promise<UserEntity[] | null>;
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiURLUserList, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

    // listUserPag(numPage: string): Promise<UserEntity[] | null>;
    getUsersPag(numPage: string): Observable<User[]> {
      return this.http.get<User[]>(this.apiURLUserListPag + numPage, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

    // loginUser(data: AuthEntity): Promise<string[2] | null>;
    newUserLogged(user: User) {
      this.userSource.next(user);
    }

    /*
    logIn(userData:LogIn): Observable<HttpResponse<LogIn>>{
      return this.http.post<LogIn>('http://localhost:5432/api/auth/login/', userData, {observe: 'response'})
    }
    */

    // loginFrontEndUser(data: AuthEntity): Promise<string[2] | null>;

    // updateUser(uuid: string, data: UserEntity): Promise<UserEntity | null>;
    updateUser(user: User, id: string): Observable<User> {
      return this.http.put<User>(this.apiURLUserUpdate + id, user,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

    // deleteUser(uuid: string): Promise<UserEntity | null>;
    delete(uuid: string): Observable<User> {
      return this.http.delete<User>(this.apiURLUserDelete + uuid, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }

}