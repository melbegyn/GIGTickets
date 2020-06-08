
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component'; 
import { ConcertComponent } from './concert/concert.component';
import { ConcertListComponent } from './concert-list/concert-list.component';

import { ConcertService } from './concert/concert.service';
 
@NgModule({
  declarations: [ 
    AppComponent,  
    NavMenuComponent,
    HomeComponent, 
    ConcertComponent,
    ConcertListComponent, 
  ],
  imports: [ 
    HttpClientModule,
    FormsModule,  
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'backoffice', component: ConcertListComponent },
    ]),
  
    AppRoutingModule,
    BrowserModule
  ], 
  providers: [ConcertService], // IMPORTANT !!
  bootstrap: [AppComponent]
})
export class AppModule { }
