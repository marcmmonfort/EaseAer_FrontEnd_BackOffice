import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LuggageService } from 'src/app/services/luggage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-luggage-create',
  templateUrl: './luggage-create.component.html',
  styleUrls: ['./luggage-create.component.css']
})

export class LuggageCreateComponent {

    luggageForm: FormGroup | any;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    showAdditionalOption: boolean = true;

    constructor(private formBuilder: FormBuilder, private luggageService: LuggageService, private router: Router) { }

    ngOnInit(): void {

        this.luggageForm = this.formBuilder.group({
            "idUserLuggage": ['', Validators.required],
            "idFlightLuggage": ['', Validators.required],
            "infoLuggage": ['', Validators.required],
            "deletedLuggage": [false, Validators.required],
        });
    }

    get f() {
        return this.luggageForm.controls;
    }

    onSubmit(): void {
        if (this.luggageForm.invalid) {
        this.openNotificationModal("¡Información Incorrecta!");
        }
        this.openModal();
    }
    
    confirmChanges(): void {
        const luggageData = this.luggageForm.value;

        luggageData.statusLuggage = "waiting";

        this.luggageService.createLuggage(luggageData).subscribe(
        (response) => {
            this.openNotificationModal("¡Equipaje Creado!");
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
        if (this.modalText == "¡Equipaje Creado!"){
        this.modalText = "";
        this.router.navigate(['/luggage']);
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
