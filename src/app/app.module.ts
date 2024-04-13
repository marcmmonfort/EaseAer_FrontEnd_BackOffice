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

  { path: 'shops', component: ShopComponent },
  { path: 'shops/create', component: ShopCreateComponent },
  { path: 'shops/details/:uuid', component: ShopDetailsComponent },
  { path: 'shops/edit/:uuid', component: ShopEditComponent },

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

    ShopComponent,
    ShopCreateComponent,
    ShopDetailsComponent,
    ShopEditComponent,

    // NEW: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
