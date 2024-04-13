import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrizeService } from 'src/app/services/prize.service';

@Component({
  selector: 'app-prize-details',
  templateUrl: './prize-details.component.html',
  styleUrls: ['./prize-details.component.css']
})
export class PrizeDetailsComponent {
  prizeData: any;
  prizeId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private prizeService: PrizeService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.prizeId = parts[parts.length - 1];
    console.log(this.prizeId);
    this.prizeService.getPrizeById(this.prizeId).subscribe(prizeData=>{
      this.prizeData=prizeData;
    });
  }

}
