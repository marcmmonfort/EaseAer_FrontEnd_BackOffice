import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrizeService } from 'src/app/services/prize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html',
  styleUrls: ['./prize-create.component.css']
})

export class PrizeCreateComponent {
  prizeForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private prizeService: PrizeService, private router: Router) { }

  ngOnInit(): void {

    this.prizeForm = this.formBuilder.group({
        "namePrize": ['', Validators.required],
        "descriptionPrize": ['', Validators.required],
        "pointsPrize": [0, Validators.required],
        "idShopPrize": ['', Validators.required],
        "dateEndPrize": ['', Validators.required],
        "codePrize": ['', Validators.required],
        "deletedLocation": [false, Validators.required],
    });
  }

  get f() {
    return this.prizeForm.controls;
  }

  onSubmit(): void {
    if (this.prizeForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }

  toggleAdditionalForm(): void {
    const terminalSelected = this.prizeForm.get('terminalLocation').value;
    this.showAdditionalOption = ['t2'].includes(terminalSelected);
  }
  
  confirmChanges(): void {
    const prizeData = this.prizeForm.value;
    this.prizeService.createPrize(prizeData).subscribe(
      (response) => {
        this.openNotificationModal("¡Premio Creado!");
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
    if (this.modalText == "¡Premio Creado!"){
      this.modalText = "";
      this.router.navigate(['/prizes']);
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
