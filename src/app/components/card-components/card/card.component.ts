import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent implements OnInit {
  cards: any[] = [];
  filteredCards: any[] = [];

  searchCardByUser: string = '';
  searchCardsByLevel: string = '';

  numPage: string = '';
  printeado: boolean = false;

  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private cardService: CardService, private router: Router) {}
  
  ngOnInit(): void {
    this.cardService.getCards().subscribe((cards) => {
      this.cards = cards;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(card: any): void {
    this.router.navigate(['/card/details/', card.uuid]);
  }

  showEdit(card: any): void {
    this.router.navigate(['/card/edit/', card.uuid]);
  }

  searchByUserId() {
    if (this.searchCardByUser.trim() !== '') {
      this.filteredCards = this.cards.filter((card) =>
        card.idUserCard
          .toLowerCase()
          .includes(this.searchCardByUser.toLowerCase())
      );
    } 
  }

  searchCardsByLVL() {
    if (this.searchCardsByLevel.trim() !== '') {
      this.filteredCards = this.cards.filter((card) =>
        card.levelCard
          .toLowerCase()
          .includes(this.searchCardsByLevel.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.cardService.getCardsPag(this.numPage).subscribe((cards) => {
      if(cards.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }

        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredCards = cards;
        if (!this.printeado){
          this.openNotificationModal("Tarjetas Cargadas");
        }
        this.printeado = true;
        
      }
    });
  }

  paginateNext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }

  paginatePrevious() {
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
    if (this.modalText == "Tarjetas Cargadas"){
      this.modalText = "";
      // this.router.navigate(['/cards']);
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
