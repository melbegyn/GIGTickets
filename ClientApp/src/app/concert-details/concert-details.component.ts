import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../concert/concert.service';
import { Concert } from '../shared/concert.model';
import { Ticket } from '../shared/ticket.model';

@Component({
  selector: 'app-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.css']
})


export class ConcertDetailsComponent implements OnInit {

  // necessary
  id: number; 

  concertId: any; // Getting Concert id from URL
  concertData: any; // Getting Concert details
  ticketsListData: Ticket[];
   
  constructor(
    public concertService: ConcertService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {

    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.concertId);

    this.concertService.getTicketsById(this.concertId);
    

    console.log(" values " + JSON.stringify(this.concertData));   
  }


  loadProductDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
    });
  }

  buyTicket() {

  }

  navigation(link) {
    this.router.navigate([link]);
  }

 

}

 
 

