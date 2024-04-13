import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'service-location',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})

export class ServiceComponent implements OnInit {
  services: any[] = [];
  filteredServices: any[] = [];

  searchServicesOpened: string = '';

  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private serviceService: ServiceService, private router: Router) {}
  
  ngOnInit(): void {
    this.serviceService.listServices().subscribe((services) => {
      this.services = services;
    });
    this.printeado = false;
  }

  showDetails(shop: any): void {
    this.router.navigate(['/services/details/', shop.uuid]);
  }

  showEdit(shop: any): void {
    this.router.navigate(['/services/edit/', shop.uuid]);
  }

  searchServicesSchedule() {
    if (this.searchServicesOpened.trim() !== '') {
      if (this.searchServicesOpened === 'open') {
        const now: Date = new Date();
        this.serviceService.listOpenedServices(now).subscribe((services) => {
          this.filteredServices = services;
        });
        this.printeado = false;
      } 
    } 
    else {
      this.filteredServices = this.services;
    }

}

  printeaTodos() {
    this.serviceService.listServices().subscribe((services) => {
      if(services.length==0){
        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredServices = services;
        if (!this.printeado){
          this.openNotificationModal("Servicios Cargados");
        }
        this.printeado = true;
      }
    });
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "Servicio Creado!"){
      this.modalText = "";
      this.router.navigate(['/services']);
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
