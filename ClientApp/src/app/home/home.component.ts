import { Component, Inject } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../shared/concert.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
   
  constructor(public concertService: ConcertService) {

  }

  ngOnInit() {
    this.concertService.refreshList();
  }

}

