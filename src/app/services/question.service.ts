import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../interfaces/question.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class QuestionService {
    question!: Question;
    message!: String;
    private questionSource = new BehaviorSubject(this.question);
    currentQuestion = this.questionSource.asObservable();

    private apiURLQuestion = environment.API_URL + '/question/';

    // ROUTE 1: routeQuestion.post("/question/create", questionCtrl.createQuestionCtrl);
    private apiURLQuestionCreate = environment.API_URL + '/question/create';
    // ROUTE 2: routeQuestion.get("/question/getbyid/:uuid", checkJwt, questionCtrl.getQuestionByIdCtrl);
    private apiURLQuestionGetById = environment.API_URL + '/question/getbyid/';
    // ROUTE 3: routeQuestion.get("/question/getbydestination/:destination", checkJwt, questionCtrl.getQuestionsByDestinationCtrl);
    private apiURLQuestionGetByDestination = environment.API_URL + '/question/getbydestination/';
    // ROUTE 4: routeQuestion.get("/question/getans/:uuid", checkJwt, questionCtrl.getAnsToQuestionCtrl);
    private apiURLQuestionGetAns = environment.API_URL + '/question/getans/';
    // ROUTE 5: routeQuestion.get("/question/all/count/docs", checkJwt, questionCtrl.getNumQuestionsCtrl);
    private apiURLQuestionGetNum = environment.API_URL + '/question/all/count/docs';
    // ROUTE 6: routeQuestion.put("/question/update/:uuid", checkJwt, questionCtrl.updateQuestionCtrl);
    private apiURLQuestionUpdate = environment.API_URL + '/question/update/';
    // ROUTE 7: routeQuestion.delete("/question/delete/:uuid", checkJwt, questionCtrl.deleteQuestionCtrl);
    private apiURLQuestionDelete = environment.API_URL + '/question/delete/';

    // private apiRegister = environment.API_URL + '/auth/register';
    constructor(private http: HttpClient, private authService: AuthService) {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // ROUTE 1: "/question/create" | createQuestion | apiURLQuestionCreate
    createQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(this.apiURLQuestionCreate, question,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken(),
            })
        });
    }

    // ROUTE 2: "/question/getbyid/:uuid" | getQuestionById | apiURLQuestionGetById
    getQuestionById(uuid: string): Observable<Question> {
        return this.http.get<Question>(this.apiURLQuestionGetById + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 3: "/question/getbydestination/:destination" | getQuestionsByDestination | apiURLQuestionGetByDestination
    getQuestionsByDestination(destination: string): Observable<Question[]> {
        return this.http.get<Question[]>(this.apiURLQuestionGetByDestination + destination, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 4: "/question/getans/:uuid" | getAnsToQuestion | apiURLQuestionGetAns
    getAnsToQuestion(uuid: string): Observable<string> {
        return this.http.get<string>(this.apiURLQuestionGetAns + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 5: "/question/all/count/docs" | getNumQuestions | apiURLQuestionGetNum
    getNumQuestions(): Observable<string> {
        return this.http.get<string>(this.apiURLQuestionGetNum,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.authService.getToken(),
        }),
        });
    }

    // ROUTE 6: "/question/update/:uuid" | updateQuestion | apiURLQuestionUpdate
    updateQuestion(question: Question, id: string): Observable<Question> {
        return this.http.put<Question>(this.apiURLQuestionUpdate + id, question,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

    // ROUTE 7: "/question/delete/:uuid" | deleteQuestion | apiURLQuestionDelete
    deleteQuestion(uuid: string): Observable<Question> {
        return this.http.delete<Question>(this.apiURLQuestionDelete + uuid, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken(),
            }),
        });
    }

}