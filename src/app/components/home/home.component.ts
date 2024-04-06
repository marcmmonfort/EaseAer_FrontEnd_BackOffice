import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activityCount:string="0";
  applicationCount:string="0";
  commentCount:string="0";
  locationCount:string="0";
  publicationCount:string="0";
  userCount:string="0";

  constructor(private route: ActivatedRoute, 
    private userService: UserService, 
    private locationService: LocationService, 
    private router: Router) {}

  ngOnInit(){
    // Users (Number): 
    this.userService.getCountUser().subscribe((users)=>{
      this.userCount=users;
    });
    // Locations (Number):
    this.locationService.getCountLocation().subscribe((locations)=>{
      this.locationCount=locations;
    });
    // Cards (Number): 
    // Prizes (Number):   
    // Services (Number): 
    // Shops (Number): 
    // Incidents (Number): 
    // Offers (Number): 
    // Products (Number): 
    // News (Number): 
    // Preferences (Number): 
    // Predictions (Number): 
    // Flights (Number): 
    // Luggage (Number): 
    // Matches (Number): 
    // Bookings (Number): 
    // Games (Number): 
    // Questions (Number): 
  }

}
