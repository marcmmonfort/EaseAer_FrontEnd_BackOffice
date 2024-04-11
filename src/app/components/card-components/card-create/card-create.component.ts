import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})

export class CardCreateComponent {
  locForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private cardService: CardService, private router: Router) { }

  ngOnInit(): void {

    this.locForm = this.formBuilder.group({
        "idUserCard": ['', Validators.required],
        "numberCard": ['0', Validators.required],
        "pointsCard": [0, Validators.required],
        "levelCard": ['', Validators.required],
        "deletedCard": [false, Validators.required],
    });
  }

  get f() {
    return this.locForm.controls;
  }

  onSubmit(): void {
    console.log(this.locForm);
    if (this.locForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }

  toggleAdditionalForm(): void {
    const terminalSelected = this.locForm.get('terminalLocation').value;
    this.showAdditionalOption = ['t2'].includes(terminalSelected);
  }
  
  confirmChanges(): void {
    const locData = this.locForm.value;
    locData.numberCard = locData.idUserCard; // User ID as Card Number.
    this.cardService.createCard(locData).subscribe(
      (response) => {
        this.openNotificationModal("¡Tarjeta Creada!");
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
    if (this.modalText == "¡Tarjeta Creada!"){
      this.modalText = "";
      this.router.navigate(['/cards']);
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
