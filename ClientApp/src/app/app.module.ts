
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';  
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component'; 
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ConcertAddComponent } from './concert-add/concert-add.component';

// AuthInterceptor
import { AuthInterceptor } from './auth/auth.interceptor';

// Service
import { UserService } from './shared/service/user.service';
import { ConcertService } from './shared/service/concert.service';
import { TicketService } from './shared/service/ticket.service';

 
@NgModule({
  declarations: [ 
    AppComponent,  
    NavMenuComponent,
    HomeComponent, 
    ConcertAddComponent,
    ConcertListComponent,
    ConcertDetailsComponent,
    ConcertEditComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    PaymentComponent,
    ProfileComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ], 
  providers: [ 
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } ,
    ConcertService,
    TicketService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
