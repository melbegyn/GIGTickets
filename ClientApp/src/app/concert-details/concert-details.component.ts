import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../concert/concert.service';

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
   
  constructor(
    private concertService: ConcertService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {

    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.concertId);
  }


  loadProductDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
    });
  }

  navigation(link) {
    this.router.navigate([link]);
  }

 

}

 
 

