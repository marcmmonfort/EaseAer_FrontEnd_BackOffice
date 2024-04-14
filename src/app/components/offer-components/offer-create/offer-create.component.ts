import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from 'src/app/services/offer.service';
import { Router } from '@angular/router';
import { Shop } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})

export class OfferCreateComponent {
    offerForm: FormGroup | any;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    scheduleShop: string = '';
    showAdditionalOption: boolean = true;

    constructor(private formBuilder: FormBuilder, private offerService: OfferService, private router: Router) { }

    ngOnInit(): void {

        this.offerForm = this.formBuilder.group({
            "idShopOffer": ['', Validators.required],
            "priceOffer": [0, Validators.required],
            "idProductOffer": ['', Validators.required],
            "dateEndOffer": ['', Validators.required],
        });
    }

    get f() {
        return this.offerForm.controls;
    }

    onSubmit(): void {
        if (this.offerForm.valid) {
            // Nada.
        }
        if (this.offerForm.invalid) {
        this.openNotificationModal("¡Información Incorrecta!");
        }
        this.openModal();
    }

    confirmChanges(): void {
        const offerData = this.offerForm.value;
        this.offerService.createOffer(offerData).subscribe(
        (response) => {
            this.openNotificationModal("¡Oferta Creada!");
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
        if (this.modalText == "¡Oferta Creada!"){
        this.modalText = "";
        this.router.navigate(['/offers']);
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
