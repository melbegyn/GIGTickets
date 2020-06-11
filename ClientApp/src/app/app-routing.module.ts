import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertComponent } from './concert/concert.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';


import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';


// all the paths of the pages
const routes: Routes = [

  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },


  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home/concert/:id', component: ConcertDetailsComponent },
  { path: 'home/concert/recap-payment/:id', component: PaymentComponent },

  // admin view
  { path: 'backoffice', component: ConcertListComponent, canActivate: [AuthGuard] },
  { path: 'backoffice/create-concert', component: ConcertComponent },
  { path: 'backoffice/edit-concert/:id', component: ConcertEditComponent },

 
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
