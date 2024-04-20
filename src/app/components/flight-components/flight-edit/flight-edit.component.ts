import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})

export class FlightEditComponent {
  flightData: any;
  flightId!: string;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  constructor(private route: ActivatedRoute, private flightService: FlightService, private router:Router) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  loadLocationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.flightId = parts[parts.length - 1];
    this.flightService.getFlightById(this.flightId).subscribe(flightData=>{
      this.flightData = flightData;
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

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  
    return `${formattedTime} (${formattedDate})`;
  }

  confirmChanges(): void {
      this.flightService.updateFlightById(this.flightData, this.flightId).subscribe(() => {
        this.openNotificationModal("¡Actualización Satisfactoria!");
      });
      
      if(this.isDeleteUp){
        this.closeModal();
        this.flightService.deleteFlight(this.flightId).subscribe( 
          
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
      this.router.navigate(['/flights']);
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
