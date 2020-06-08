
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
 
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ConcertComponent } from './concert/concert.component';
import { AppRoutingModule } from './app-routing.module';
import { ConcertListComponent } from './concert-list/concert-list.component';
 
 
@NgModule({
  declarations: [
    
    AppComponent, 
    FormsModule,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ConcertComponent,
    ConcertListComponent,
    
   
  ],
  imports: [ 
    HttpClientModule,
    FormsModule, // necessary with reactive forms
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
  
    AppRoutingModule,
    ReactiveFormsModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
