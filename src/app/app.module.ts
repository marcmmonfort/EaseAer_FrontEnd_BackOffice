import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListUserComponent } from './components/user-components/list-user/list-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location-components/location/location.component';
import { UserDetailsComponent } from './components/user-components/user-details/user-details.component';
import { UserEditComponent } from './components/user-components/user-edit/user-edit.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UserCreateComponent } from './components/user-components/user-create/user-create.component';
import { LocationCreateComponent } from './components/location-components/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location-components/location-details/location-details.component';
import { LocationEditComponent } from './components/location-components/location-edit/location-edit.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './services/auth.service';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { FrontPageComponent } from './components/frontpage/frontpage.component';
import { CardComponent } from './components/card-components/card/card.component';
import { CardCreateComponent } from './components/card-components/card-create/card-create.component';
import { CardDetailsComponent } from './components/card-components/card-details/card-details.component';
import { CardEditComponent } from './components/card-components/card-edit/card-edit.component';
import { PrizeComponent } from './components/prize-component/prize/prize.component';
import { PrizeCreateComponent } from './components/prize-component/prize-create/prize-create.component';
import { ShopComponent } from './components/shop-components/shop/shop.component';
import { ShopCreateComponent } from './components/shop-components/shop-create/shop-create.component';
import { ShopDetailsComponent } from './components/shop-components/shop-details/shop-details.component';
import { ShopEditComponent } from './components/shop-components/shop-edit/shop-edit.component';
import { PrizeDetailsComponent } from './components/prize-component/prize-details/prize-details.component';
import { PrizeEditComponent } from './components/prize-component/prize-edit/prize-edit.component';
import { ServiceComponent } from './components/service-components/service/service.component';
import { ServiceCreateComponent } from './components/service-components/service-create/service-create.component';
import { ServiceDetailsComponent } from './components/service-components/service-details/service-details.component';
import { ServiceEditComponent } from './components/service-components/service-edit/service-edit.component';
import { ProductComponent } from './components/product-components/product/product.component';
import { ProductCreateComponent } from './components/product-components/product-create/product-create.component';
import { ProductDetailsComponent } from './components/product-components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-components/product-edit/product-edit.component';
import { OfferComponent } from './components/offer-components/offer/offer.component';
import { OfferCreateComponent } from './components/offer-components/offer-create/offer-create.component';
import { OfferDetailsComponent } from './components/offer-components/offer-details/offer-details.component';
import { OfferEditComponent } from './components/offer-components/offer-edit/offer-edit.component';
import { IncidentComponent } from './components/incident-components/incident/incident.component';
import { IncidentCreateComponent } from './components/incident-components/incident-create/incident-create.component';
import { IncidentDetailsComponent } from './components/incident-components/incident-details/incident-details.component';
import { IncidentEditComponent } from './components/incident-components/incident-edit/incident-edit.component';
import { NewsComponent } from './components/news-components/news/news.component';
import { NewsCreateComponent } from './components/news-components/news-create/news-create.component';
import { NewsDetailsComponent } from './components/news-components/news-details/news-details.component';
import { NewsEditComponent } from './components/news-components/news-edit/news-edit.component';
import { FlightComponent } from './components/flight-components/flight/flight.component';
import { FlightCreateComponent } from './components/flight-components/flight-create/flight-create.component';
import { FlightDetailsComponent } from './components/flight-components/flight-details/flight-details.component';
import { FlightEditComponent } from './components/flight-components/flight-edit/flight-edit.component';
import { BookingComponent } from './components/booking-components/booking/booking.component';
import { BookingCreateComponent } from './components/booking-components/booking-create/booking-create.component';
import { BookingDetailsComponent } from './components/booking-components/booking-details/booking-details.component';
import { BookingEditComponent } from './components/booking-components/booking-edit/booking-edit.component';
import { LuggageComponent } from './components/luggage-components/luggage/luggage.component';
import { LuggageCreateComponent } from './components/luggage-components/luggage-create/luggage-create.component';
import { LuggageDetailsComponent } from './components/luggage-components/luggage-details/luggage-details.component';
import { LuggageEditComponent } from './components/luggage-components/luggage-edit/luggage-edit.component';
import { QuestionComponent } from './components/question-components/question/question.component';
import { QuestionCreateComponent } from './components/question-components/question-create/question-create.component';
import { QuestionDetailsComponent } from './components/question-components/question-details/question-details.component';
import { QuestionEditComponent } from './components/question-components/question-edit/question-edit.component';
import { MatchComponent } from './components/match-components/match/match.component';
import { MatchCreateComponent } from './components/match-components/match-create/match-create.component';
import { MatchDetailsComponent } from './components/match-components/match-details/match-details.component';
import { MatchEditComponent } from './components/match-components/match-edit/match-edit.component';
import { GameComponent } from './components/game-components/game/game.component';
import { GameDetailsComponent } from './components/game-components/game-details/game-details.component';
import { GameEditComponent } from './components/game-components/game-edit/game-edit.component';
import { Level1Guard } from './shared/level1.guard';
import { Level2Guard } from './shared/level2.guard';
import { Level3Guard } from './shared/level3.guard';
import { Level4Guard } from './shared/level4.guard';

const routes: Routes = [

  { path: '', component: FrontPageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, canActivate:[AuthGuard, Level1Guard] },

  { path: 'users', component: ListUserComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'users/create', component: UserCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'users/details/:uuid', component: UserDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'users/edit/:uuid', component: UserEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'locations', component: LocationComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'locations/create', component: LocationCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'locations/details/:uuid', component: LocationDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'locations/edit/:uuid', component: LocationEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'cards', component: CardComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'cards/create', component: CardCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'cards/details/:uuid', component: CardDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'cards/edit/:uuid', component: CardEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'prizes', component: PrizeComponent, canActivate:[AuthGuard, Level1Guard] },
  { path: 'prizes/create', component: PrizeCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'prizes/details/:uuid', component: PrizeDetailsComponent, canActivate:[AuthGuard, Level1Guard] },
  { path: 'prizes/edit/:uuid', component: PrizeEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'shops', component: ShopComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'shops/create', component: ShopCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'shops/details/:uuid', component: ShopDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'shops/edit/:uuid', component: ShopEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'services', component: ServiceComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'services/create', component: ServiceCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'services/details/:uuid', component: ServiceDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'services/edit/:uuid', component: ServiceEditComponent, canActivate:[AuthGuard, Level3Guard] },
  
  { path: 'products', component: ProductComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'products/create', component: ProductCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'products/details/:uuid', component: ProductDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'products/edit/:uuid', component: ProductEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'offers', component: OfferComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'offers/create', component: OfferCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'offers/details/:uuid', component: OfferDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'offers/edit/:uuid', component: OfferEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'incidents', component: IncidentComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'incidents/create', component: IncidentCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'incidents/details/:uuid', component: IncidentDetailsComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'incidents/edit/:uuid', component: IncidentEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'news', component: NewsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'news/create', component: NewsCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'news/details/:uuid', component: NewsDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'news/edit/:uuid', component: NewsEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'flights', component: FlightComponent, canActivate:[AuthGuard, Level1Guard] },
  { path: 'flights/create', component: FlightCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'flights/details/:uuid', component: FlightDetailsComponent, canActivate:[AuthGuard, Level1Guard] },
  { path: 'flights/edit/:uuid', component: FlightEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'bookings', component: BookingComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'bookings/create', component: BookingCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'bookings/details/:uuid', component: BookingDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'bookings/edit/:uuid', component: BookingEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'luggage', component: LuggageComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'luggage/create', component: LuggageCreateComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'luggage/details/:uuid', component: LuggageDetailsComponent, canActivate:[AuthGuard, Level2Guard] },
  { path: 'luggage/edit/:uuid', component: LuggageEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'questions', component: QuestionComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'questions/create', component: QuestionCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'questions/details/:uuid', component: QuestionDetailsComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'questions/edit/:uuid', component: QuestionEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'games', component: GameComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'games/details/:uuid', component: GameDetailsComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'games/edit/:uuid', component: GameEditComponent, canActivate:[AuthGuard, Level3Guard] },

  { path: 'matches', component: MatchComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'matches/create', component: MatchCreateComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'matches/details/:uuid', component: MatchDetailsComponent, canActivate:[AuthGuard, Level3Guard] },
  { path: 'matches/edit/:uuid', component: MatchEditComponent, canActivate:[AuthGuard, Level3Guard] },
];

@NgModule({
  declarations: [

    // OLD: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    NavigationComponent,
    AppComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    
    ConfirmationModalComponent,
    NotificationModalComponent,

    ListUserComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserEditComponent,

    LocationComponent,
    LocationCreateComponent,
    LocationDetailsComponent,
    LocationEditComponent,

    CardComponent,
    CardCreateComponent,
    CardDetailsComponent,
    CardEditComponent,

    PrizeComponent,
    PrizeCreateComponent,
    PrizeDetailsComponent,
    PrizeEditComponent,

    ShopComponent,
    ShopCreateComponent,
    ShopDetailsComponent,
    ShopEditComponent,

    ServiceComponent,
    ServiceCreateComponent,
    ServiceDetailsComponent,
    ServiceEditComponent,

    ProductComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductEditComponent,

    OfferComponent,
    OfferCreateComponent,
    OfferDetailsComponent,
    OfferEditComponent,

    IncidentComponent,
    IncidentCreateComponent,
    IncidentDetailsComponent,
    IncidentEditComponent,

    NewsComponent,
    NewsCreateComponent,
    NewsDetailsComponent,
    NewsEditComponent,

    FlightComponent,
    FlightCreateComponent,
    FlightDetailsComponent,
    FlightEditComponent,
    
    BookingComponent,
    BookingCreateComponent,
    BookingDetailsComponent,
    BookingEditComponent,

    LuggageComponent,
    LuggageCreateComponent,
    LuggageDetailsComponent,
    LuggageEditComponent,

    QuestionComponent,
    QuestionCreateComponent,
    QuestionDetailsComponent,
    QuestionEditComponent,

    GameComponent,
    GameDetailsComponent,
    GameEditComponent,

    MatchComponent,
    MatchCreateComponent,
    MatchDetailsComponent,
    MatchEditComponent,

  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard, Level1Guard, Level2Guard, Level3Guard, Level4Guard],
  bootstrap: [AppComponent]
})

export class AppModule { }
