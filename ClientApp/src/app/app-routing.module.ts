import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertComponent } from './concert/concert.component';
import { ConcertListComponent } from './concert-list/concert-list.component';

// all the paths of the pages
const routes: Routes = [
  { path: 'backoffice', component: ConcertListComponent },
  { path: 'backoffice/create-concert', component: ConcertComponent }
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
