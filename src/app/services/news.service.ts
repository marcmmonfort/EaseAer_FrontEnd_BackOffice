import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { News } from '../interfaces/news.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class NewsService {
    news!: News;
    message!: String;
    private newsSource = new BehaviorSubject(this.news);
    currentNews = this.newsSource.asObservable();

    private apiURLNews = environment.API_URL + '/news/';

    // ROUTE 1: routeNews.post("/news/create", newsCtrl.createNewsCtrl);
    private apiURLNewsCreate = environment.API_URL + '/news/create';
    // ROUTE 2: routeNews.get("/news/getbyid/:uuid", checkJwt, newsCtrl.getNewsByIdCtrl);
    private apiURLNewsGetById = environment.API_URL + '/news/getbyid/';
    // ROUTE 3: routeNews.get("/news/all/count/docs", checkJwt, newsCtrl.getNumNewsCtrl);
    private apiURLNewsGetNum = environment.API_URL + '/news/all/count/docs';
    // ROUTE 4: routeNews.get("/news/listall", checkJwt, newsCtrl.listNewsCtrl);
    private apiURLNewsList = environment.API_URL + '/news/listall';
    // ROUTE 5: routeNews.get("/news/listpag/:numPage", checkJwt, newsCtrl.listNewsPagCtrl);
    private apiURLNewsListPag = environment.API_URL + '/news/listpag/';
    // ROUTE 6: routeNews.put("/news/update/:uuid", checkJwt, newsCtrl.updateNewsCtrl);
    private apiURLNewsUpdate = environment.API_URL + '/news/update/';
    // ROUTE 7: routeNews.delete("/news/delete/:uuid", checkJwt, newsCtrl.deleteNewsCtrl);
    private apiURLNewsDelete = environment.API_URL + '/news/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    // SERVICE 1: "/news/create" | createNews | apiURLNewsCreate
    createNews(news: News): Observable<News> {
        return this.http.post<News>(this.apiURLNewsCreate, news,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // SERVICE 2: "/news/getbyid/:uuid" | getNewsById | apiURLNewsGetById
    getNewsById(uuid: string): Observable<News> {
        return this.http.get<News>(this.apiURLNewsGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 3: "/news/all/count/docs" | getNumNews | apiURLNewsGetNum
    getNumNews(): Observable<string> {
        return this.http.get<string>(this.apiURLNewsGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // SERVICE 4: "/news/listall" | listNews | apiURLNewsList
    listNews(): Observable<News[]> {
        return this.http.get<News[]>(this.apiURLNewsList, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 5: "/news/listpag/:numPage" | listNewsPag | apiURLNewsListPag
    listNewsPag(numPage: string): Observable<News[]> {
        return this.http.get<News[]>(this.apiURLNewsListPag + numPage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 6: "/news/update/:uuid" | updateNews | apiURLNewsUpdate
    updateProduct(news: News, id: string): Observable<News> {
        return this.http.put<News>(this.apiURLNewsUpdate + id, news,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // SERVICE 7: "/news/delete/:uuid" | deleteNews |  apiURLNewsDelete
    deleteProduct(uuid: string): Observable<News> {
        return this.http.delete<News>(this.apiURLNewsDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}