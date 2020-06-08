import { Component, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  Concerts: Concert[] = []

  constructor(http: HttpClient, @Inject('BASE URL') baseUrl: string) {
    http.get<Concert[]>(baseUrl + 'api/Concerts').subscribe(result => {
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
