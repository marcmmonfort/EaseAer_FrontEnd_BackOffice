import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  cardData: any;
  cardId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private cardService: CardService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.cardId = parts[parts.length - 1];
    console.log(this.cardId);
    this.cardService.getCardById(this.cardId).subscribe(cardData=>{
      this.cardData=cardData;
    });
  }

}
