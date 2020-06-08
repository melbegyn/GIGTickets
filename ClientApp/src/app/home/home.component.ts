import { Component, Inject } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

   
  constructor(public concertService: ConcertService) {
    /*http.get<Concert[]>(baseUrl + 'api/Concert').subscribe(result => {
      this.Concerts = result;
    }, error => console.error(error))*/
  }

  ngOnInit() {
    this.concertService.refreshList();
  }

}

