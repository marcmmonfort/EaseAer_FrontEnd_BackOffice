import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService } from 'src/app/services/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-create',
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.css']
})

export class IncidentCreateComponent {
  incidentForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private incidentService: IncidentService, private router: Router) { }

  ngOnInit(): void {

    this.incidentForm = this.formBuilder.group({
        "descriptionIncident": ['', Validators.required],
        "collectivesIncident": ['', Validators.required],
        "statusIncident": ['new', Validators.required],
        "deletedIncident": [false, Validators.required],
    });
  }

  get f() {
    return this.incidentForm.controls;
  }

  onSubmit(): void {
    if (this.incidentForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }
  
  confirmChanges(): void {
    const incidentData = this.incidentForm.value;

    incidentData.numberCard = incidentData.idUserCard; // User ID as Card Number.

    // Añadir UUID Creador:
    incidentData.idUserIncident = localStorage.getItem('ownId');

    console.log("DATOS: " + JSON.stringify(incidentData));

    this.incidentService.createIncident(incidentData).subscribe(
      (response) => {
        this.openNotificationModal("¡Incidente Creado!");
      },
      (error) => {
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
    // this.router.navigate(['/cards']);
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
    if (this.modalText == "¡Incidente Creado!"){
      this.modalText = "";
      this.router.navigate(['/incidents']);
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
