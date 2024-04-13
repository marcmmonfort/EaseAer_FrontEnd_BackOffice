import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {
    shopData: any;
    shopId!: string;
    isModalOpen: boolean=false;
    shopSchedule: any;

    sunOpen: any;
    sunClose: any;
    monOpen: any;
    monClose: any;
    tueOpen: any;
    tueClose: any;
    wedOpen: any;
    wedClose: any;
    thuOpen: any;
    thuClose: any;
    friOpen: any;
    friClose: any;
    satOpen: any;
    satClose: any;

  constructor(private route: ActivatedRoute, private shopService: ShopService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.shopId = parts[parts.length - 1];
    console.log(this.shopId);
    this.shopService.getShopById(this.shopId).subscribe(shopData=>{
        this.shopData = shopData;
        this.shopSchedule = shopData.scheduleShop; // "09:00_20:30|09:00_20:30|09:00_20:30|09:00_20:30|09:00_22:00|09:00_22:00|09:00_22:00"
        
        const schedules = this.shopSchedule.split('|');

        if (schedules.length==7){
            // Domingo:
            const [startSun, endSun] = schedules[0].split('_');
            this.sunOpen = startSun; this.sunClose = endSun;
            // Lunes:
            const [startMon, endMon] = schedules[1].split('_');
            this.monOpen = startMon; this.monClose = endMon;
            // Martes:
            const [startTue, endTue] = schedules[2].split('_');
            this.tueOpen = startTue; this.tueClose = endTue;
            // Miércoles:
            const [startWed, endWed] = schedules[3].split('_');
            this.wedOpen = startWed; this.wedClose = endWed;
            // Jueves:
            const [startThu, endThu] = schedules[4].split('_');
            this.thuOpen = startThu; this.thuClose = endThu;
            // Viernes:
            const [startFri, endFri] = schedules[5].split('_');
            this.friOpen = startFri; this.friClose = endFri;
            // Sábado:
            const [startSat, endSat] = schedules[6].split('_');
            this.satOpen = startSat; this.satClose = endSat;
        }
    });
  }

}
