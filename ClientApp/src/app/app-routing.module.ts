import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertComponent } from './concert/concert.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertDetailsComponent } from './concert-details/concert-details.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';

// all the paths of the pages
const routes: Routes = [

  // admin view
  { path: 'backoffice', component: ConcertListComponent },
  { path: 'backoffice/create-concert', component: ConcertComponent },
  { path: 'backoffice/edit-concert/:id', component: ConcertEditComponent },

  // user view
  { path: 'concert/:id', component: ConcertDetailsComponent },
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
