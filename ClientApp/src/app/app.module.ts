
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
 
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
  ],
  imports: [ 
    HttpClientModule,
    FormsModule,  
    RouterModule.forRoot([
      /*{ path: '', component: HomeComponent, pathMatch: 'full' }*/
      { path: '', redirectTo: '/user/registration', pathMatch: 'full' },
      {
        path: 'user', component: UserComponent,
        children: [
          { path: 'registration', component: RegistrationComponent }
        ]
      }
    ]),
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      progressBar: true
    })
     
  ], 
  providers: [ConcertService], // IMPORTANT !!
  bootstrap: [AppComponent]
})
export class AppModule { }
