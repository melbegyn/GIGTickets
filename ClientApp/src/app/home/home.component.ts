import { Component, Inject } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../shared/concert.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { TicketService } from '../service/ticket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  currentUser: User;
  items: any;
 // userDetails;
  concertsData: Concert[];
  parameter: any[];


  constructor( 
    public concertService: ConcertService,
    private service: UserService,
    private ticketService: TicketService) {
    this.concertService.getConcerts().toPromise().then(data => {
      console.log(data);
 
      console.log(this.parameter);
       
     /* for (let key in data)
        this.concertsData.push(data[key]);*/
      /*  if (data.hasOwnProperty(key))
          this.items.push(data[);*/
    });

  }

  public getData() {
    this.concertService.getConcerts().subscribe((data: Concert[]) => this.items = data);
  }


  get transformedBody() {
    return Object.keys(this.items);
  }


  ngOnInit() {

    
    this.service.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;
      
    }, (err) => {
      console.log(err);
    });

    this.concertService.refreshList(); 
     

  } 

}

