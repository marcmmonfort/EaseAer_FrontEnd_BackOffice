import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { Shop } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})

export class ServiceCreateComponent {
  serviceForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  scheduleService: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {

    this.serviceForm = this.formBuilder.group({
        "nameService": ['', Validators.required],
        "idLocationService": ['', Validators.required],
        "descriptionService": ['', Validators.required],
        "typeService": ['', Validators.required],
        "sunOpen": ['', Validators.required],
        "sunClose": ['', Validators.required],
        "monOpen": ['', Validators.required],
        "monClose": ['', Validators.required],
        "tueOpen": ['', Validators.required],
        "tueClose": ['', Validators.required],
        "wedOpen": ['', Validators.required],
        "wedClose": ['', Validators.required],
        "thuOpen": ['', Validators.required],
        "thuClose": ['', Validators.required],
        "friOpen": ['', Validators.required],
        "friClose": ['', Validators.required],
        "satOpen": ['', Validators.required],
        "satClose": ['', Validators.required],
        "deletedService": [false, Validators.required]
    });
  }

  get f() {
    return this.serviceForm.controls;
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
        // Nada.
    }
    if (this.serviceForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }

  confirmChanges(): void {
    const shopData = this.serviceForm.value;

    console.log("INFO FORMULARIO:", JSON.stringify(shopData));

    const scheduleSunday = `${shopData.sunOpen}_${shopData.sunClose}`;
    const scheduleMonday = `${shopData.monOpen}_${shopData.monClose}`;
    const scheduleTuesday = `${shopData.tueOpen}_${shopData.tueClose}`;
    const scheduleWednesday = `${shopData.wedOpen}_${shopData.wedClose}`;
    const scheduleThursday = `${shopData.thuOpen}_${shopData.thuClose}`;
    const scheduleFriday = `${shopData.friOpen}_${shopData.friClose}`;
    const scheduleSaturday = `${shopData.satOpen}_${shopData.satClose}`;

    this.scheduleService = `${scheduleSunday}|${scheduleMonday}|${scheduleTuesday}|${scheduleWednesday}|${scheduleThursday}|${scheduleFriday}|${scheduleSaturday}`;

    // Borrar Horarios Diarios:
    this.serviceForm.removeControl('sunOpen');
    this.serviceForm.removeControl('sunClose');
    this.serviceForm.removeControl('monOpen');
    this.serviceForm.removeControl('monClose');
    this.serviceForm.removeControl('tueOpen');
    this.serviceForm.removeControl('tueClose');
    this.serviceForm.removeControl('wedOpen');
    this.serviceForm.removeControl('wedClose');
    this.serviceForm.removeControl('thuOpen');
    this.serviceForm.removeControl('thuClose');
    this.serviceForm.removeControl('friOpen');
    this.serviceForm.removeControl('friClose');
    this.serviceForm.removeControl('satOpen');
    this.serviceForm.removeControl('satClose');

    const newServiceData = this.serviceForm.value;

    // Añadir Horario Conjunto:
    newServiceData.scheduleService = this.scheduleService;

    console.log("INFO EDITADA:", JSON.stringify(newServiceData));

    this.serviceService.createService(newServiceData).subscribe(
      (response) => {
        this.openNotificationModal("¡Servicio Creado!");
      },
      (error) => {
        this.openNotificationModal("¡Error!");
      }
    );

    this.closeModal();
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
    if (this.modalText == "¡Servicio Creado!"){
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
