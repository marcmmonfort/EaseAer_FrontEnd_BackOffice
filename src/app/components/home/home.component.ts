import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocationService } from 'src/app/services/location.service';
import { CardService } from 'src/app/services/card.service';
import { PrizeService } from 'src/app/services/prize.service';
import { ServiceService } from 'src/app/services/service.service';
import { ShopService } from 'src/app/services/shop.service';
import { IncidentService } from 'src/app/services/incident.service';
import { OfferService } from 'src/app/services/offer.service';
import { ProductService } from 'src/app/services/product.service';
import { NewsService } from 'src/app/services/news.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { FlightService } from 'src/app/services/flight.service';
import { LuggageService } from 'src/app/services/luggage.service';
import { MatchService } from 'src/app/services/match.service';
import { BookingService } from 'src/app/services/booking.service';
import { GameService } from 'src/app/services/game.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  locationCount:string="0";
  userCount:string="0";
  cardCount:string="0";
  prizeCount:string="0";
  serviceCount:string="0";
  shopCount:string="0";
  incidentCount:string="0";
  offerCount:string="0";
  productCount:string="0";
  newsCount:string="0";
  preferencesCount:string="0";
  predictionCount:string="0";
  flightCount:string="0";
  luggageCount:string="0";
  matchCount:string="0";
  bookingCount:string="0";
  gameCount:string="0";
  questionCount:string="0";

  constructor(private route: ActivatedRoute, 
    private userService: UserService, 
    private locationService: LocationService, 
    private cardService: CardService, 
    private prizeService: PrizeService, 
    private serviceService: ServiceService, 
    private shopService: ShopService, 
    private incidentService: IncidentService, 
    private offerService: OfferService, 
    private productService: ProductService, 
    private newsService: NewsService, 
    private preferencesService: PreferencesService, 
    private predictionService: PredictionService, 
    private flightService: FlightService, 
    private luggageService: LuggageService, 
    private matchService: MatchService, 
    private bookingService: BookingService, 
    private gameService: GameService, 
    private questionService: QuestionService, 

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
    this.cardService.getNumCards().subscribe((cards)=>{
      this.cardCount=cards;
    });
    // Prizes (Number):
    this.prizeService.getNumPrizes().subscribe((prizes)=>{
      this.prizeCount=prizes;
    });
    // Incidents (Number): 
    this.incidentService.getNumIncidents().subscribe((incidents)=>{
      this.incidentCount=incidents;
    });
    // Products (Number): 
    this.productService.getNumProducts().subscribe((products)=>{
      this.productCount=products;
    });
    // News (Number): 
    this.newsService.getNumNews().subscribe((news)=>{
      this.newsCount=news;
    });
    // Preferences (Number): 
    this.preferencesService.getNumPreferences().subscribe((preferences)=>{
      this.preferencesCount=preferences;
    });
    // Predictions (Number): 
    this.predictionService.getNumPredictions().subscribe((predictions)=>{
      this.predictionCount=predictions;
    });
    // Flights (Number): 
    this.flightService.getNumFlights().subscribe((flights)=>{
      this.flightCount=flights;
    });
    // Luggage (Number): 
    this.luggageService.getNumLuggage().subscribe((luggages)=>{
      this.luggageCount=luggages;
    });
    // Matches (Number): 
    this.matchService.getTotalNumMatches().subscribe((matches)=>{
      this.matchCount=matches;
    });
    // Bookings (Number): 
    this.bookingService.getNumBookings().subscribe((bookings)=>{
      this.bookingCount=bookings;
    });
    // Games (Number): 
    this.gameService.getNumGames().subscribe((games)=>{
      this.gameCount=games;
    });
    // Questions (Number): 
    this.questionService.getNumQuestions().subscribe((questions)=>{
      this.questionCount=questions;
    });
  }

}
