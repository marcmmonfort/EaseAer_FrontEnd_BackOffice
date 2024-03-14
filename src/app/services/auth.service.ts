import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Auth } from '../interfaces/login.interface';
import { environment } from 'src/env/env';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  comment!: Comment ;
  message!: String;
  user!: User;
  userData!: Auth;

  private apiURL = environment.API_URL + '/user/';

  constructor(private http: HttpClient) { }

  // (1) Login User
  logIn(userData:Auth): Observable<Auth>{
    return this.http.post<Auth>(this.apiURL+'login', userData);
  }

  // (2) Register User
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL+'register', user);
  }

  isLoggedIn(){
    console.log('Estoy' + localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }


  public getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : ''
  }
};

