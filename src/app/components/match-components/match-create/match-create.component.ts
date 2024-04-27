import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})

export class MatchCreateComponent {

    matchForm: FormGroup | any;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    showAdditionalOption: boolean = true;
    idOther: string | any;
    idMine: string | any;

    constructor(private formBuilder: FormBuilder, private matchService: MatchService, private router: Router) { }

    ngOnInit(): void {

        this.matchForm = this.formBuilder.group({
            "idOtherUser": ['', Validators.required],
            "showMatch": [false, Validators.required],
            "deletedMatch": [false, Validators.required],
        });
    }

    get f() {
        return this.matchForm.controls;
    }

    onSubmit(): void {
        if (this.matchForm.invalid) {
            this.openNotificationModal("¡Información Incorrecta!");
        }
        this.openModal();
    }
    
    confirmChanges(): void {
        const matchData = this.matchForm.value;

        this.idOther = matchData.idOtherUser;
        this.idMine = localStorage.getItem('ownId');

        this.matchForm.removeControl('idOtherUser');

        const newMatchData = this.matchForm.value;

        // AÑADIR PARÁMETROS RESTANTES:

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        newMatchData.dateMatch = formattedDate;

        const ids: string[] = [this.idOther, this.idMine];
        ids.sort((a, b) => a.localeCompare(b));
        newMatchData.idUserAMatch = ids[0];
        newMatchData.idUserBMatch = ids[1];

        console.log("AMISTAD A CREAR: " + JSON.stringify(newMatchData));

        this.matchService.createMatch(newMatchData).subscribe(
        (response) => {
            this.openNotificationModal("¡Amistad Solicitada!");
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
        if (this.modalText == "¡Amistad Solicitada!"){
            this.modalText = "";
            this.router.navigate(['/matches']);
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
