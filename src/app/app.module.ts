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

const routes: Routes = [

  { path: '', component: FrontPageComponent },

  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },

  { path: 'users', component: ListUserComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/details/:uuid', component: UserDetailsComponent },
  { path: 'users/edit/:uuid', component: UserEditComponent },

  { path: 'locations', component: LocationComponent },
  { path: 'locations/create', component: LocationCreateComponent },
  { path: 'locations/details/:uuid', component: LocationDetailsComponent },
  { path: 'locations/edit/:uuid', component: LocationEditComponent },

  { path: 'cards', component: CardComponent },
  { path: 'cards/create', component: CardCreateComponent },
  { path: 'cards/details/:uuid', component: CardDetailsComponent },
  { path: 'cards/edit/:uuid', component: CardEditComponent },

  { path: 'prizes', component: PrizeComponent },
  { path: 'prizes/create', component: PrizeCreateComponent },
  { path: 'prizes/details/:uuid', component: PrizeDetailsComponent },
  { path: 'prizes/edit/:uuid', component: PrizeEditComponent },

  { path: 'shops', component: ShopComponent },
  { path: 'shops/create', component: ShopCreateComponent },
  { path: 'shops/details/:uuid', component: ShopDetailsComponent },
  { path: 'shops/edit/:uuid', component: ShopEditComponent },

  { path: 'services', component: ServiceComponent },
  { path: 'services/create', component: ServiceCreateComponent },
  { path: 'services/details/:uuid', component: ServiceDetailsComponent },
  { path: 'services/edit/:uuid', component: ServiceEditComponent },
  
  { path: 'products', component: ProductComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/details/:uuid', component: ProductDetailsComponent },
  { path: 'products/edit/:uuid', component: ProductEditComponent },

  { path: 'offers', component: OfferComponent },
  { path: 'offers/create', component: OfferCreateComponent },
  { path: 'offers/details/:uuid', component: OfferDetailsComponent },
  { path: 'offers/edit/:uuid', component: OfferEditComponent },

  { path: 'incidents', component: IncidentComponent },
  { path: 'incidents/create', component: IncidentCreateComponent },
  { path: 'incidents/details/:uuid', component: IncidentDetailsComponent },
  { path: 'incidents/edit/:uuid', component: IncidentEditComponent },

  { path: 'news', component: NewsComponent },
  { path: 'news/create', component: NewsCreateComponent },
  { path: 'news/details/:uuid', component: NewsDetailsComponent },
  { path: 'news/edit/:uuid', component: NewsEditComponent },

  { path: 'flights', component: FlightComponent },
  { path: 'flights/create', component: FlightCreateComponent },
  { path: 'flights/details/:uuid', component: FlightDetailsComponent },
  { path: 'flights/edit/:uuid', component: FlightEditComponent },

  { path: 'bookings', component: BookingComponent },
  { path: 'bookings/create', component: BookingCreateComponent },
  { path: 'bookings/details/:uuid', component: BookingDetailsComponent },
  { path: 'bookings/edit/:uuid', component: BookingEditComponent },

  { path: 'luggage', component: LuggageComponent },
  { path: 'luggage/create', component: LuggageCreateComponent },
  { path: 'luggage/details/:uuid', component: LuggageDetailsComponent },
  { path: 'luggage/edit/:uuid', component: LuggageEditComponent },

  { path: 'questions', component: QuestionComponent },
  { path: 'questions/create', component: QuestionCreateComponent },
  { path: 'questions/details/:uuid', component: QuestionDetailsComponent },
  { path: 'questions/edit/:uuid', component: QuestionEditComponent },

  { path: 'matches', component: MatchComponent },
  { path: 'matches/create', component: MatchCreateComponent },
  { path: 'matches/details/:uuid', component: MatchDetailsComponent },
  { path: 'matches/edit/:uuid', component: MatchEditComponent },
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
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
