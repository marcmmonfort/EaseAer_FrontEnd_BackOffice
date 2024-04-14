import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
    serviceData: any;
    serviceId!: string;
    isModalOpen: boolean=false;
    serviceSchedule: any;

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

  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.serviceId = parts[parts.length - 1];
    console.log(this.serviceId);
    this.serviceService.getServiceById(this.serviceId).subscribe(serviceData=>{
        this.serviceData = serviceData;
        this.serviceSchedule = serviceData.scheduleService; // "09:00_20:30|09:00_20:30|09:00_20:30|09:00_20:30|09:00_22:00|09:00_22:00|09:00_22:00"
        
        const schedules = this.serviceSchedule.split('|');

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
