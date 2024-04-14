import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'offer-location',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})

export class OfferComponent implements OnInit {
  offers: any[] = [];
  filteredOffers: any[] = [];

  searchByProduct: string = '';
  searchByShop: string = '';
  searchByPrice: string = '';

  printeado: boolean = false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  
  constructor(private offerService: OfferService, private router: Router) {}
  
  ngOnInit(): void {
    this.offerService.listOffer().subscribe((offers) => {
      this.offers = offers;
    });
    this.printeado = false;
  }

  showDetails(offer: any): void {
    this.router.navigate(['/offers/details/', offer.uuid]);
  }

  showEdit(offer: any): void {
    this.router.navigate(['/offers/edit/', offer.uuid]);
  }

  isOfferExpired(endDate: Date): boolean {
    const currentDate = new Date();
    const endDateLocalTime = new Date(endDate);
    if (endDateLocalTime < currentDate){
      console.log("OFERTA CADUCADA");
      return true;
    }
    else{
      console.log("OFERTA ACTIVA");
      return false;
    }
  }

  searchByProductID() {
    if (this.searchByProduct.trim() !== '') {
      this.filteredOffers = this.offers.filter((offer) =>
        offer.idProductOffer
          .toLowerCase()
          .includes(this.searchByProduct.toLowerCase())
      );
    } 
  }

  searchByShopID() {
    if (this.searchByShop.trim() !== '') {
      this.filteredOffers = this.offers.filter((offer) =>
        offer.idShopOffer
          .toLowerCase()
          .includes(this.searchByShop.toLowerCase())
      );
    } 
  }

  searchAvailableByPrice() {
        if (this.searchByPrice.trim() !== '') {
        const searchValue = parseFloat(this.searchByPrice.trim());
        this.filteredOffers = this.offers.filter((offer) => {
            const offerValue = parseFloat(offer.priceOffer);
            return offerValue <= searchValue;
        });
        } else {
            // this.filteredPrizes = this.prizes;
        }
  }

  printeaTodos() {
    this.offerService.listOffer().subscribe((offers) => {
      if(offers.length==0){
        this.openNotificationModal("¡No hay más páginas!");
      }
      else{
        this.filteredOffers = offers;
        if (!this.printeado){
          this.openNotificationModal("Ofertas Cargadas");
        }
        this.printeado = true;
      }
    });
  }

  // Notification Modal:

  onAcceptChanges(): void {
    this.isNotificationOpen = false;
    if (this.modalText == "¡Oferta Creada!"){
      this.modalText = "";
      this.router.navigate(['/offers']);
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
