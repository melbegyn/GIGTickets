import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../concert/concert.service';
import { Concert } from '../shared/concert.model';
import { Ticket } from '../shared/ticket.model';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  
  tap
} from "rxjs/operators";
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.css']
})


export class ConcertDetailsComponent implements OnInit {

  // necessary
  id: number;

  userId: number;
  currentUser: User;
   

  concertId: any; // Getting Concert id from URL
  concertData: any; // Getting Concert details
  //ticketsListData: Ticket[];


 

 
  constructor(
    public concertService: ConcertService,
    public ticketService: TicketService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {



    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadConcertDetails(this.concertId);

 
  
    //this.patch(); 

  }

  loadConcertDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
    });
  }
/*  getData(): Observable<any> {
    return this.concertService.getTicketsByIdMel(this.concertId).pipe(map(res => res));
  }

 */

  ngOnInit() {

    this.userService.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;

     
    }, (err) => {
      console.log(err);
    });
      
     
  }

   
 

  navigation(link) {
    this.router.navigate([link]);
  }

 

}

 
 

