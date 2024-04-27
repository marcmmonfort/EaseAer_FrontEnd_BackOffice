import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Game } from 'src/app/interfaces/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit {
    gameForm: FormGroup | any;
    games: any[] = [];
    filteredGames: any[] = [];
    foundGame: Game | undefined;

    searchName: string = '';
    searchPrizePoints: string = '';

    numPage: string = '';
    printeado: boolean = false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private formBuilder: FormBuilder, private gameService: GameService, private router: Router) {}
    
    ngOnInit(): void {

        this.gameForm = this.formBuilder.group({
            "ID_User": ['', [Validators.required, Validators.pattern(/^[0-9a-fA-F]{24}$/)]],
            "ICAO_Destination": ['', Validators.required],
        });
        this.printeado = false;

    }

    showDetails(game: any): void {
        this.router.navigate(['/games/details/', game.uuid]);
    }

    showEdit(game: any): void {
        this.router.navigate(['/games/edit/', game.uuid]);
    }

    // LIST TIPO 1 (GET BY DESTINATION) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByDest() {
        const gameData = this.gameForm.value;
        if (gameData.ICAO_Destination.length==0){
            this.openNotificationModal("Input Incompleto (Falta Destino)");
        }
        else{
            this.gameService.getGamesByDestination(gameData.ICAO_Destination).subscribe((games) => {
                if (games.length==0) {
                    this.openNotificationModal("¡No hay partidas para este destino! Recuerda poner el código ICAO en mayúsculas.");
                    this.filteredGames = [];
                }
                else {
                    this.filteredGames = games;
                    if (!this.printeado){
                        this.openNotificationModal("Partidas Cargadas");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 2 (GET BY USER) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByUser() {
        if (this.gameForm.controls['ID_User'].valid) {
            const gameData = this.gameForm.value;
            if (gameData.ID_User.length==0){
                this.openNotificationModal("Input Incompleto (Falta ID Usuario)");
            }
            else{
                this.gameService.getGamesByUser(gameData.ID_User).subscribe((games) => {
                    if (games.length==0) {
                        this.openNotificationModal("¡Este usuario no ha jugado ninguna partida!");
                        this.filteredGames = [];
                    }
                    else {
                        this.filteredGames = games;
                        if (!this.printeado){
                            this.openNotificationModal("Partidas Cargadas");
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
        this.isNotificationOpen = false;
        if (this.modalText == "¡Partida Creada!"){
            this.modalText = "";
            this.router.navigate(['/games']);
        } else {
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
