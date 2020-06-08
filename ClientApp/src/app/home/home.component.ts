import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  Concerts: Concert[] = []

  constructor(http: HttpClient, @Inject('BASE URL') baseUrl: string) {
    http.get<Concert[]>(baseUrl + 'api/Concert').subscribe(result => {
      this.Concerts = result;
    }, error => console.error(error))
  }

}

interface Concert {
  id: number;
  TourName: string;
  Artist: string;
  Stage: string;
  ConcertDate: Date;
  NumberTicketsAvailable: number;
  TicketPrice: number;
}
