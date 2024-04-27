import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})

export class GameEditComponent {
    gameData: any;
    gameId!: string;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    isDeleteUp:boolean=false;
    isEditUp:boolean=false;
    
    constructor(private route: ActivatedRoute, private gameService: GameService, private router:Router) {}

    ngOnInit(): void {
        this.loadGameData();
    }

    loadGameData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.gameId = parts[parts.length - 1];
        this.gameService.getGameById(this.gameId).subscribe(gameData=>{
        this.gameData = gameData;
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
        this.gameService.updateGame(this.gameData, this.gameId).subscribe(() => {
            this.openNotificationModal("¡Actualización Satisfactoria!");
        });
        
        if(this.isDeleteUp){
            this.closeModal();
            this.gameService.deleteGame(this.gameId).subscribe( 
            
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
        this.router.navigate(['/games']);
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
        this.loadGameData();
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
