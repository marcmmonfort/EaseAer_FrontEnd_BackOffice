import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Question } from 'src/app/interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})

export class QuestionComponent implements OnInit {
    questionForm: FormGroup | any;
    questions: any[] = [];
    filteredQuestions: any[] = [];
    foundQuestion: Question | undefined;

    searchName: string = '';
    searchPrizePoints: string = '';

    numPage: string = '';
    printeado: boolean = false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private router: Router) {}
    
    ngOnInit(): void {

        this.questionForm = this.formBuilder.group({
            "ID_Question": ['', Validators.required],
            "ICAO_Destination": ['', Validators.required],
        });
        this.printeado = false;

    }

    showDetails(question: any): void {
        this.router.navigate(['/questions/details/', question.uuid]);
    }

    showEdit(question: any): void {
        this.router.navigate(['/questions/edit/', question.uuid]);
    }

    // LIST TIPO 1 (GET BY ID) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByID() {
        const questionData = this.questionForm.value;
        if (questionData.ID_Question.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Pregunta)");
        }
        else{
            this.questionService.getQuestionById(questionData.ID_Question).subscribe((question) => {
                if (question==undefined) {
                    this.openNotificationModal("¡No hay ninguna pregunta con ese ID!");
                    this.foundQuestion = undefined;
                    this.filteredQuestions = [];
                }
                else {
                    this.foundQuestion = question;
                    this.filteredQuestions.push(question);
                    if (!this.printeado){
                        this.openNotificationModal("Pregunta Encontrada");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 2 (GET BY DESTINATION) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByDest() {
        const questionData = this.questionForm.value;
        if (questionData.ICAO_Destination.length==0){
            this.openNotificationModal("Input Incompleto (Falta Destino)");
        }
        else{
            this.questionService.getQuestionsByDestination(questionData.ICAO_Destination).subscribe((questions) => {
                if (questions.length==0) {
                    this.openNotificationModal("¡No hay preguntas para este destino! Recuerda poner el código ICAO en mayúsculas.");
                    this.filteredQuestions = [];
                }
                else {
                    this.filteredQuestions = questions;
                    if (!this.printeado){
                        this.openNotificationModal("Preguntas Cargadas");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // Notification Modal:

    onAcceptChanges(): void {
        this.isNotificationOpen = false;
        if (this.modalText == "¡Pregunta Creada!"){
        this.modalText = "";
        this.router.navigate(['/questions']);
        }
    }

    onCancelChanges(): void {
        this.isNotificationOpen = false;
    }

    openNotificationModal(text: string): void {
        this.modalText = text;
        this.isNotificationOpen = true;
    }

    closeNotificationModal(): void {
        this.isNotificationOpen = false;
    }

}
