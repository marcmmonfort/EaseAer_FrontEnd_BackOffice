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
import { CommentComponent } from './components/comment-components/comment/comment.component';
import { UserDetailsComponent } from './components/user-components/user-details/user-details.component';
import { UserEditComponent } from './components/user-components/user-edit/user-edit.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UserCreateComponent } from './components/user-components/user-create/user-create.component';
import { LocationCreateComponent } from './components/location-components/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location-components/location-details/location-details.component';
import { LocationEditComponent } from './components/location-components/location-edit/location-edit.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CommentEditComponent } from './components/comment-components/comment-edit/comment-edit.component';
import { CommentDetailsComponent } from './components/comment-components/comment-details/comment-details.component';
import { CommentCreateComponent } from './components/comment-components/comment-create/comment-create.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicationComponent } from './components/publication-components/publication/publication.component';
import { PublicationCreateComponent } from './components/publication-components/publication-create/publication-create.component';
import { PublicationDetailsComponent } from './components/publication-components/publication-details/publication-details.component';
import { PublicationEditComponent } from './components/publication-components/publication-edit/publication-edit.component';
import { CommentResponseComponent } from './components/comment-components/comment-response/comment-response.component';
import { ApplicationComponent } from './components/application-components/application/application.component';
import { ApplicationCreateComponent } from './components/application-components/application-create/application-create.component';
import { ApplicationDetailsComponent } from './components/application-components/application-details/application-details.component';
import { ApplicationEditComponent } from './components/application-components/application-edit/application-edit.component';
import { ActivityComponent } from './components/activity-components/activity/activity.component';
import { ActivityCreateComponent } from './components/activity-components/activity-create/activity-create.component';
import { ActivityDetailsComponent } from './components/activity-components/activity-details/activity-details.component';
import { ActivityEditComponent } from './components/activity-components/activity-edit/activity-edit.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './services/auth.service';
import { ActivityParticipantsComponent } from './components/activity-components/activity-participants/activity-participants.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';

const routes: Routes = [

  // OLD: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /*
  { path: 'listUsers', component: ListUserComponent },
  { path: 'app', component: AppComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'comment-create', component: CommentCreateComponent },
  { path: 'comment-details/:uuid', component: CommentDetailsComponent },
  { path: 'comment-edit/:uuid', component: CommentEditComponent },
  { path: 'location', component: LocationComponent },
  { path: 'location-create', component: LocationCreateComponent },
  { path: 'location-details/:uuid', component: LocationDetailsComponent },
  { path: 'location-edit/:uuid', component: LocationEditComponent },
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

  { path: '', component: LogInComponent },

  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/details/:uuid', component: UserDetailsComponent },
  { path: 'users/edit/:uuid', component: UserEditComponent },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

];

@NgModule({
  declarations: [

    // OLD: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ListUserComponent,
    NavigationComponent,
    AppComponent,
    HomeComponent,
    CommentComponent,
    CommentCreateComponent,
    CommentDetailsComponent,
    CommentEditComponent,
    CommentResponseComponent,
    LogInComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserEditComponent,
    ConfirmationModalComponent,
    NotificationModalComponent,
    UserCreateComponent,
    LocationComponent,
    LocationCreateComponent,
    LocationDetailsComponent,
    LocationEditComponent,
    PublicationComponent,
    PublicationCreateComponent,
    PublicationDetailsComponent,
    PublicationEditComponent,
    ApplicationComponent,
    ApplicationCreateComponent,
    ApplicationDetailsComponent,
    ApplicationEditComponent,
    ActivityComponent,
    ActivityCreateComponent,
    ActivityDetailsComponent,
    ActivityEditComponent,
    ActivityParticipantsComponent,

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
