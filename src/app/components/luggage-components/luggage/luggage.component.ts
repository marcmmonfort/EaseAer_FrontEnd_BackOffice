import { Component, OnInit } from '@angular/core';
import { LuggageService } from 'src/app/services/luggage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Luggage } from 'src/app/interfaces/luggage.interface';

@Component({
  selector: 'app-luggage',
  templateUrl: './luggage.component.html',
  styleUrls: ['./luggage.component.css'],
})

export class LuggageComponent implements OnInit {
    luggageForm: FormGroup | any;
    luggage: any[] = [];
    filteredLuggage: any[] = [];
    foundLuggage: Luggage | undefined;

    searchName: string = '';
    searchPrizePoints: string = '';

    numPage: string = '';
    printeado: boolean = false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private formBuilder: FormBuilder, private luggageService: LuggageService, private router: Router) {}
    
    ngOnInit(): void {

        this.luggageForm = this.formBuilder.group({
            "ID_Luggage": ['', Validators.required],
            "ID_Flight": ['', Validators.required],
            "ID_User": ['', Validators.required],
        });
        this.printeado = false;

    }

    showDetails(luggage: any): void {
        this.router.navigate(['/luggage/details/', luggage.uuid]);
    }

    showEdit(luggage: any): void {
        this.router.navigate(['/luggage/edit/', luggage.uuid]);
    }

    // LIST TIPO 1 (GET BY ID) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByID() {
        const luggageData = this.luggageForm.value;
        if (luggageData.ID_Luggage.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Equipaje)");
        }
        else{
            this.luggageService.getLuggageById(luggageData.ID_Luggage).subscribe((luggage) => {
                if (luggage==undefined) {
                    this.openNotificationModal("¡No hay equipaje con ese ID!");
                    this.foundLuggage = undefined;
                    this.filteredLuggage = [];
                }
                else {
                    this.foundLuggage = luggage;
                    this.filteredLuggage.push(luggage);
                    if (!this.printeado){
                        this.openNotificationModal("Equipaje Encontrado");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 2 (GET BY FLIGHT ID) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByFlight() {
        const luggageData = this.luggageForm.value;
        if (luggageData.ID_Flight.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Vuelo)");
        }
        else{
            this.luggageService.getLuggageByFlight(luggageData.ID_Flight).subscribe((luggage) => {
                if (luggage.length==0) {
                    this.openNotificationModal("¡No hay equipaje en este vuelo!");
                    this.filteredLuggage = [];
                }
                else {
                    this.filteredLuggage = luggage;
                    if (!this.printeado){
                        this.openNotificationModal("Equipaje Cargado");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 3 (GET BY USER ID) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByUser() {
        const luggageData = this.luggageForm.value;
        if (luggageData.ID_User.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Usuario)");
        }
        else{
            this.luggageService.getLuggageByUser(luggageData.ID_User).subscribe((luggage) => {
                if (luggage.length==0) {
                    this.openNotificationModal("¡No hay equipaje asociado a este usuario!");
                    this.filteredLuggage = [];
                }
                else {
                    this.filteredLuggage = luggage;
                    if (!this.printeado){
                        this.openNotificationModal("Equipaje Cargado");
                    }
                    this.printeado = true;
                }
            });
        }
    }


    // Notification Modal:

    onAcceptChanges(): void {
        this.isNotificationOpen = false;
        if (this.modalText == "¡Equipaje Creado!"){
        this.modalText = "";
        this.router.navigate(['/luggage']);
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
