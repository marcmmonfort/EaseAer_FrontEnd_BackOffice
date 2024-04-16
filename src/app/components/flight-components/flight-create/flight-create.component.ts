import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})

export class FlightCreateComponent {
  flightForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {

    this.flightForm = this.formBuilder.group({
        "numberFlight": ['', Validators.required],
        "companyFlight": ['', Validators.required],
        "originFlight": ['', Validators.required],
        "destinationFlight": ['', Validators.required],
        "stdFlight": ['', Validators.required],
        "staFlight": ['', Validators.required],
    });
  }

  get f() {
    return this.flightForm.controls;
  }

  onSubmit(): void {
    if (this.flightForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }
  
  confirmChanges(): void {
    const flightData = this.flightForm.value;

    flightData.depTerminalFlight = "";
    flightData.statusFlight = "ontime";
    flightData.etdFlight = flightData.stdFlight;
    flightData.etaFlight = flightData.staFlight;

    console.log("DATOS DEL VUELO:" + JSON.stringify(flightData));

    this.flightService.createFlight(flightData).subscribe(
      (response) => {
        this.openNotificationModal("¡Vuelo Creado!");
      },
      (error) => {
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
    // this.router.navigate(['/prizes']);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.ngOnInit();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Vuelo Creado!"){
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
    this.isModalOpen = false;
    this.isNotificationOpen = false;
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
}
