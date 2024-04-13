import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrizeService } from 'src/app/services/prize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prize-edit',
  templateUrl: './prize-edit.component.html',
  styleUrls: ['./prize-edit.component.css']
})

export class PrizeEditComponent {
  prizeData: any;
  prizeId!: string;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  constructor(private route: ActivatedRoute, private prizeService: PrizeService,private router:Router) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  loadLocationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.prizeId = parts[parts.length - 1];
    console.log(this.prizeId);
    this.prizeService.getPrizeById(this.prizeId).subscribe(prizeData=>{
      this.prizeData=prizeData;
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

      this.prizeService.updatePrize(this.prizeData, this.prizeId).subscribe(() => {
        this.openNotificationModal("¡Actualización Satisfactoria!");
      });
      
      if(this.isDeleteUp){
        this.closeModal();
        this.prizeService.deletePrize(this.prizeId).subscribe( 
          
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
      this.router.navigate(['/prizes']);
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
