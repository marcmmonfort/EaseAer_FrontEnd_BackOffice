import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LuggageService } from 'src/app/services/luggage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-luggage-edit',
  templateUrl: './luggage-edit.component.html',
  styleUrls: ['./luggage-edit.component.css']
})

export class LuggageEditComponent {
    luggageData: any;
    luggageId!: string;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    isDeleteUp:boolean=false;
    isEditUp:boolean=false;
    
    constructor(private route: ActivatedRoute, private luggageService: LuggageService, private router:Router) {}

    ngOnInit(): void {
        this.loadLocationData();
    }

    loadLocationData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.luggageId = parts[parts.length - 1];
        this.luggageService.getLuggageById(this.luggageId).subscribe(luggageData=>{
        this.luggageData = luggageData;
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
        this.luggageService.updateLuggageById(this.luggageData, this.luggageId).subscribe(() => {
            this.openNotificationModal("¡Actualización Satisfactoria!");
        });
        
        if(this.isDeleteUp){
            this.closeModal();
            this.luggageService.deleteLuggage(this.luggageId).subscribe( 
            
            (data:any)=>{
                this.openNotificationModal("¡Borrado Satisfactoriamente!");
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
        if (this.modalText == "¡Borrado Satisfactoriamente!" || this.modalText == "¡Actualización Satisfactoria!"){
        this.modalText = "";
        this.router.navigate(['/luggage']);
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
        this.loadLocationData();
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
