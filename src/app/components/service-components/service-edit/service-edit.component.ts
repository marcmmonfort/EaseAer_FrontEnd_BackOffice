import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent {
  serviceData: any;
  serviceId!: string;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private router:Router) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  loadLocationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.serviceId = parts[parts.length - 1];
    console.log(this.serviceId);
    this.serviceService.getServiceById(this.serviceId).subscribe(serviceData=>{
      this.serviceData=serviceData;
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

      this.serviceService.updateService(this.serviceData, this.serviceId).subscribe(() => {
        this.openNotificationModal("¡Actualización Satisfactoria!");
      });
      
      if(this.isDeleteUp){
        this.closeModal();
        this.serviceService.deleteService(this.serviceId).subscribe( 
          
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
      this.router.navigate(['/services']);
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
