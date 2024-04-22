import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent {
    bookingData: any;
    bookingId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private bookingService: BookingService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.bookingId = parts[parts.length - 1];
        this.bookingService.getBookingById(this.bookingId).subscribe(bookingData=>{
        this.bookingData=bookingData;
        });
    }
}
