import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})

export class FlightComponent implements OnInit {
  flightForm: FormGroup | any;
  flights: any[] = [];
  filteredFlights: any[] = [];
  searchName: string = '';
  searchPrizePoints: string = '';
  numPage: string = '';
  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private formBuilder: FormBuilder, private flightService: FlightService, private router: Router) {}
  
  ngOnInit(): void {

    this.flightForm = this.formBuilder.group({
      "airportFlight": ['', Validators.required],
      "startDate": ['', Validators.required],
      "endDate": ['', Validators.required],
    });
    this.printeado = false;

  }

  showDetails(flight: any): void {
    this.router.navigate(['/flights/details/', flight.uuid]);
  }

  showEdit(flight: any): void {
    this.router.navigate(['/flights/edit/', flight.uuid]);
  }

  // LIST TIPO 1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  printeaFlights() {
    const flightsData = this.flightForm.value;
    if (flightsData.airportFlight.length==0 || flightsData.startDate.length==0 || flightsData.endDate.length==0){
      this.openNotificationModal("Inputs Incompletos");
    }
    else{
      this.flightService.getFlightsByAirportAndInterval(flightsData.airportFlight, flightsData.startDate, flightsData.endDate).subscribe((flights) => {
        if(flights.length==0){
          this.openNotificationModal("¡No hay vuelos!");
          this.filteredFlights = [];
        }
        else{
          this.filteredFlights = flights;
          if (!this.printeado){
            this.openNotificationModal("Vuelos Cargados");
          }
          this.printeado = true;
        }
      });
    }
  }

  // LIST TIPO 2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  printeaDepartures() {
    const flightsData = this.flightForm.value;
    if (flightsData.airportFlight.length==0 || flightsData.startDate.length==0 || flightsData.endDate.length==0){
      this.openNotificationModal("Inputs Incompletos");
    }
    else{
      this.flightService.getDeparturesByAirportAndInterval(flightsData.airportFlight, flightsData.startDate, flightsData.endDate).subscribe((flights) => {
        if(flights.length==0){
          this.openNotificationModal("¡No hay salidas!");
          this.filteredFlights = [];
        }
        else{
          this.filteredFlights = flights;
          if (!this.printeado){
            this.openNotificationModal("Vuelos Cargados");
          }
          this.printeado = true;
        }
      });
    }
  }

  // LIST TIPO 3 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  printeaArrivals() {
    const flightsData = this.flightForm.value;
    if (flightsData.airportFlight.length==0 || flightsData.startDate.length==0 || flightsData.endDate.length==0){
      this.openNotificationModal("Inputs Incompletos");
    }
    else{
      this.flightService.getArrivalsByAirportAndInterval(flightsData.airportFlight, flightsData.startDate, flightsData.endDate).subscribe((flights) => {
        if(flights.length==0){
          this.openNotificationModal("¡No hay llegadas!");
          this.filteredFlights = [];
        }
        else{
          this.filteredFlights = flights;
          if (!this.printeado){
            this.openNotificationModal("Vuelos Cargados");
          }
          this.printeado = true;
        }
      });
    }
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Vuelo Creado!"){
      this.modalText = "";
      this.router.navigate(['/flights']);
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
