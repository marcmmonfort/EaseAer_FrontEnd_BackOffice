import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})

export class LocationCreateComponent {
  locForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {

    this.locForm = this.formBuilder.group({
      nameLocation: ['', Validators.required],
      latLocation: ['', Validators.required],
      lonLocation: ['', Validators.required],
      descriptionLocation: ['', Validators.required],
    });
  }

  get f() {
    return this.locForm.controls;
  }

  onSubmit(): void {
    if (this.locForm.invalid) {
      alert('Por favor, completa todos los campos requeridos')
      this.router.navigate(['/locations']);
    }
    this.openModal();
  }
  confirmChanges(): void {
    const locData = this.locForm.value;
    this.locationService.addLocation(locData).subscribe(
      (response) => {
        this.openNotificationModal("Ubicación Creada!");
      },
      (error) => {
        console.error('Error al guardar location:', error);
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
    this.router.navigate(['/locations']);
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
    if (this.modalText == "¡Ubicación Creada!"){
      this.modalText = "";
      this.router.navigate(['/locations']);
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
