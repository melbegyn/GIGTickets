import { Component, Inject } from '@angular/core';
import { User } from '../shared/model/user.model';
import { Concert } from '../shared/model/concert.model';
import { ConcertService } from '../shared/service/concert.service';
import { UserService } from '../shared/service/user.service';
import { TicketService } from '../shared/service/ticket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  currentUser: User;
  items: any;
  concertsData: Concert[];
  parameter: any[];


  constructor( 
    public concertService: ConcertService,
    private service: UserService,
    private ticketService: TicketService) {
    this.concertService.getConcerts().toPromise().then(data => { 
      //console.log(data); 
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

