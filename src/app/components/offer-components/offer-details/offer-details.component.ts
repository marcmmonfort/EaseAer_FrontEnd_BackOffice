import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})

export class OfferDetailsComponent {
  offerData: any;
  offerId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private offerService: OfferService, private router:Router) {}

  ngOnInit(): void {
    this.loadOfferData();
  }

  loadOfferData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.offerId = parts[parts.length - 1];
    this.offerService.getOfferById(this.offerId).subscribe(offerData=>{
      this.offerData=offerData;
    });
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

}
