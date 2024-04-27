import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})

export class QuestionEditComponent {
    questionData: any;
    questionId!: string;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    isDeleteUp:boolean=false;
    isEditUp:boolean=false;
    
    constructor(private route: ActivatedRoute, private questionService: QuestionService, private router:Router) {}

    ngOnInit(): void {
        this.loadQuestionData();
    }

    loadQuestionData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.questionId = parts[parts.length - 1];
        this.questionService.getQuestionById(this.questionId).subscribe(questionData=>{
        this.questionData = questionData;
        });
    }

    onSubmit():void{
        this.openModal();
    }

    openModal(): void {
        this.isModalOpen = true;
    }

    closeModal(): void {
        this.isModalOpen = false;
        this.isDeleteUp = false;
        this.isEditUp = false;
    }

    confirmChanges(): void {
        this.questionService.updateQuestion(this.questionData, this.questionId).subscribe(() => {
            this.openNotificationModal("¡Actualización Satisfactoria!");
        });
        
        if(this.isDeleteUp){
            this.closeModal();
            this.questionService.deleteQuestion(this.questionId).subscribe( 
            
            (data:any)=>{
                this.openNotificationModal("¡Borrada Satisfactoriamente!");
            },(error:any)=>{
                console.log(error.status);
        
                switch (error.status) {
                case 401:
                    this.openNotificationModal("¡No Estás Autorizado!");
                    break;
                case 402:
                    this.openNotificationModal("¡No Eres Administrador!");
                    break; 
                default: 
                    this.openNotificationModal("¡Error!");
                }
            })  
        } 
    }

    onAcceptChanges(): void {
        if (this.modalText == ""){
        this.confirmChanges();
        this.modalText = "";
        this.isModalOpen = false;
        this.isNotificationOpen = false;
        }
        if (this.modalText == "¡Borrada Satisfactoriamente!" || this.modalText == "¡Actualización Satisfactoria!"){
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
        this.closeModal();
        this.loadQuestionData();
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

    eliminar(){
        this.isDeleteUp=true;
        this.openModal();
    }
    editar(){
        this.isEditUp=true;
        this.openModal();
    }
}
