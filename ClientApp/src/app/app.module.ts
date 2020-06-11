
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component'; 
import { ConcertComponent } from './concert/concert.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';

import { ConcertService } from './concert/concert.service';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './service/user.service';
 

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { TicketService } from './service/ticket.service';
import { PaymentComponent } from './payment/payment.component';

 
@NgModule({
  declarations: [ 
    AppComponent,  
    NavMenuComponent,
    HomeComponent, 
    ConcertComponent,
    ConcertListComponent,
    ConcertDetailsComponent,
    ConcertEditComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    PaymentComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
     

    ]),
    
   
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
