import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})

export class FlightDetailsComponent {
    flightData: any;
    flightId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private flightService: FlightService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.flightId = parts[parts.length - 1];
        this.flightService.getFlightById(this.flightId).subscribe(flightData=>{
        this.flightData=flightData;
        });
    }
}
