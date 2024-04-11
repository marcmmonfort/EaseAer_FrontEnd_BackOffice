import { Component, OnInit } from '@angular/core';
import { PrizeService } from 'src/app/services/prize.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'prize-location',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css'],
})

export class PrizeComponent implements OnInit {
  prizes: any[] = [];
  filteredPrizes: any[] = [];
  searchName: string = '';
  searchTerminal: string = '';
  numPage: string = '';
  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private prizeService: PrizeService, private router: Router) {}
  
  ngOnInit(): void {
    this.prizeService.listPrizes().subscribe((prizes) => {
      this.prizes = prizes;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(prize: any): void {
    this.router.navigate(['/prizes/details/', prize.uuid]);
  }

  showEdit(prize: any): void {
    this.router.navigate(['/prizes/edit/', prize.uuid]);
  }

  searchByName() {
    if (this.searchName.trim() !== '') {
      this.filteredPrizes = this.prizes.filter((prize) =>
        prize.nameLocation
          .toLowerCase()
          .includes(this.searchName.toLowerCase())
      );
    } 
  }

  searchByTerminal() {
    if (this.searchTerminal.trim() !== '') {
      this.filteredPrizes = this.prizes.filter((location) =>
        location.terminalLocation
          .toLowerCase()
          .includes(this.searchTerminal.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.prizeService.listPrizes().subscribe((prizes) => {
      if(prizes.length==0){
        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredPrizes = prizes;
        if (!this.printeado){
          this.openNotificationModal("Premios Cargados");
        }
        this.printeado = true;
      }
    });
  }

  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }

  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {

        this.openNotificationModal("¡Estás en la primera página!");

        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Premio Creado!"){
      this.modalText = "";
      this.router.navigate(['/prizes']);
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
