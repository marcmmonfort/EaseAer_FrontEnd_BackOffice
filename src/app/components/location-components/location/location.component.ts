import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})

export class LocationComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  searchTerm: string = '';
  numPage: string = '';
  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private locationService: LocationService, private router: Router) {}
  
  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(location: any): void {
    this.router.navigate(['/locations/details/', location.uuid]);
  }

  showEdit(location: any): void {
    this.router.navigate(['/locations/edit/', location.uuid]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredLocations = this.locations.filter((location) =>
        location.nameLocation
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.locationService.getLocations(this.numPage).subscribe((locations) => {
      if(locations.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }

        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredLocations = locations;
        if (!this.printeado){
          this.openNotificationModal("Ubicaciones Cargadas");
        }
        this.printeado = true;
        
      }
    });
  }

  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }

  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {

        this.openNotificationModal("¡Estás en la primera página!");

        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Ubicación Creada!"){
      this.modalText = "";
      this.router.navigate(['/locations']);
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
