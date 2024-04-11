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


const routes: Routes = [

  // OLD: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /*
  { path: 'listUsers', component: ListUserComponent },
  { path: 'app', component: AppComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'comment-create', component: CommentCreateComponent },
  { path: 'comment-details/:uuid', component: CommentDetailsComponent },
  { path: 'comment-edit/:uuid', component: CommentEditComponent },
  { path: 'comment-details/responses/:uuid/:aux', component: CommentResponseComponent },
  { path: 'user-details/followers/:uuid', component: UserFollowersComponent },
  { path: 'user-details/followed/:uuid', component: UserFollowedComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'publication-create', component: PublicationCreateComponent },
  { path: 'publication-details/:uuid', component: PublicationDetailsComponent },
  { path: 'publication-edit/:uuid', component: PublicationEditComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'activity-create', component: ActivityCreateComponent },
  { path: 'activity-details/:uuid', component: ActivityDetailsComponent },
  { path: 'activity-edit/:uuid', component: ActivityEditComponent },
  { path: 'activity-participants/:uuid', component: ActivityParticipantsComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'application-create', component: ApplicationCreateComponent },
  { path: 'application-details/:uuid', component: ApplicationDetailsComponent },
  { path: 'application-edit/:uuid', component: ApplicationEditComponent},
  */

  /* CÓDIGO CON AUTH GUARD:
  { path: 'application-edit/:uuid', component: ApplicationEditComponent, canActivate:[AuthGuard] },
  */

  // NEW: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
