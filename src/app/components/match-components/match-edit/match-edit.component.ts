import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-match-edit',
    templateUrl: './match-edit.component.html',
    styleUrls: ['./match-edit.component.css']
})

export class MatchEditComponent {
    matchData: any;
    matchId!: string;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    isDeleteUp:boolean=false;
    isEditUp:boolean=false;
    
    constructor(private route: ActivatedRoute, private matchService: MatchService, private router:Router) {}

    ngOnInit(): void {
        this.loadMatchData();
    }

    loadMatchData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.matchId = parts[parts.length - 1];
        this.matchService.getMatchById(this.matchId).subscribe(matchData=>{
            this.matchData = matchData;
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
        if (this.matchData.showMatch){
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            this.matchData.dateMatch = formattedDate;
        }
        this.matchService.updateMatch(this.matchData, this.matchId).subscribe(() => {
            this.openNotificationModal("¡Actualización Satisfactoria!");
        });
        
        if(this.isDeleteUp){
            this.closeModal();
            this.matchService.deleteMatch(this.matchId).subscribe( 
            
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
            this.router.navigate(['/matches']);
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
        this.loadMatchData();
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
