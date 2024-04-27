import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Match } from 'src/app/interfaces/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})

export class MatchComponent implements OnInit {
    matchForm: FormGroup | any;
    matches: any[] = [];
    filteredMatches: any[] = [];
    foundMatch: Match | undefined;

    searchName: string = '';
    searchPrizePoints: string = '';

    numPage: string = '';
    printeado: boolean = false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private formBuilder: FormBuilder, private matchService: MatchService, private router: Router) {}
    
    ngOnInit(): void {

        this.matchForm = this.formBuilder.group({
            "ID_User": ['', [Validators.required, Validators.pattern(/^[0-9a-fA-F]{24}$/)]],
        });
        this.printeado = false;

    }

    showDetails(match: any): void {
        this.router.navigate(['/matches/details/', match.uuid]);
    }

    showEdit(match: any): void {
        this.router.navigate(['/matches/edit/', match.uuid]);
    }

    // LIST TIPO 1 (GET MY MATCHES) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaMine() {
        const myUserId = localStorage.getItem('ownId');
        console.log("MI ID ES: " +  myUserId);

        if (myUserId==undefined){
            this.openNotificationModal("Error (Local Storage ID)");
        }
        else{
            this.matchService.getMyMatches(myUserId).subscribe((matches) => {
                console.log("RECIBIMOS: " + JSON.stringify(matches));
                if (matches.length==0) {
                    this.openNotificationModal("¡No tienes ninguna conexión!");
                    this.filteredMatches = [];
                }
                else {
                    this.filteredMatches = matches;
                    console.log("MATCHES: " +  this.filteredMatches);
                    if (!this.printeado){
                        this.openNotificationModal("Amistades Cargadas"); // Se cargan incluso las que no están correspondidas.
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 2 (GET BY USER ID) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByUserId() {
        if (this.matchForm.valid) {
            const matchData = this.matchForm.value;
            if (matchData.ID_User.length==0){
                this.openNotificationModal("Input Incompleto (Falta ID Usuario)");
            }
            else{
                this.matchService.getMyMatches(matchData.ID_User).subscribe((matches) => {
                    if (matches.length==0) {
                        this.openNotificationModal("¡No tiene ninguna conexión!");
                        this.filteredMatches = [];
                    }
                    else {
                        this.filteredMatches = matches;
                        if (!this.printeado){
                            this.openNotificationModal("Amistades y Solicitudes Cargadas"); // Se cargan incluso las que no están correspondidas.
                        }
                        this.printeado = true;
                    }
                });
            }
        } else {
            this.openNotificationModal("Input Incorrecto");
        }
    }

    // Notification Modal:

    onAcceptChanges(): void {
        if (this.modalText == "¡Amistad Creada!"){
            this.modalText = "";
            this.router.navigate(['/matches']);
            this.isNotificationOpen = false;
        }
        else{
            this.modalText = "";
            this.isNotificationOpen = false;
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
