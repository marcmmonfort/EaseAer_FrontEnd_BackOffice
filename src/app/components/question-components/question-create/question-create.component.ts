import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})

export class QuestionCreateComponent {

    questionForm: FormGroup | any;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    showAdditionalOption: boolean = true;

    constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private router: Router) { }

    ngOnInit(): void {

        this.questionForm = this.formBuilder.group({
            "destinationQuestion": ['', Validators.required],
            "statementQuestion": ['', Validators.required],
            "ansAQuestion": ['', Validators.required],
            "ansBQuestion": ['', Validators.required],
            "ansCQuestion": ['', Validators.required],
            "ansDQuestion": ['', Validators.required],
            "correctAnsQuestion": ['', Validators.required],
        });
    }

    get f() {
        return this.questionForm.controls;
    }

    onSubmit(): void {
        if (this.questionForm.invalid) {
        this.openNotificationModal("¡Información Incorrecta!");
        }
        this.openModal();
    }
    
    confirmChanges(): void {
        const questionData = this.questionForm.value;

        this.questionService.createQuestion(questionData).subscribe(
            (response) => {
                this.openNotificationModal("¡Pregunta Creada!");
            },
            (error) => {
                this.openNotificationModal("¡Error!");
            }
        );
        this.closeModal();
        // this.router.navigate(['/prizes']);
    }

    openModal(): void {
        this.isModalOpen = true;
    }

    closeModal(): void {
        this.isModalOpen = false;
    }

    onAcceptChanges(): void {
        if (this.modalText == ""){
        this.confirmChanges();
        this.ngOnInit();
        this.modalText = "";
        this.isModalOpen = false;
        this.isNotificationOpen = false;
        }
        if (this.modalText == "¡Pregunta Creada!"){
        this.modalText = "";
        this.router.navigate(['/questions']);
        this.isModalOpen = false;
        this.isNotificationOpen = false;
        }
        else {
        this.modalText = "";
        this.isModalOpen = false;
        this.isNotificationOpen = false;
        }
    }

    onCancelChanges(): void {
        this.isModalOpen = false;
        this.isNotificationOpen = false;
    }
    
    // Notification Modal:

    openNotificationModal(text: string): void {
        this.modalText = text;
        this.isNotificationOpen = true;
    }

    // Método para cerrar el modal
    closeNotificationModal(): void {
        this.isNotificationOpen = false;
    }
}
