import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../shared/service/concert.service';
import { TicketService } from '../shared/service/ticket.service';
import { UserService } from '../shared/service/user.service';
import { FormBuilder } from '@angular/forms'; 
import { User } from '../shared/model/user.model';
import { Concert } from '../shared/model/concert.model';
 
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
  concertData: Concert; // Getting Concert details
 
 
  constructor(
    public concertService: ConcertService,
    public ticketService: TicketService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
     
    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadConcertDetails(this.concertId); 

  }

  loadConcertDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
 
    });
  }

 
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

 
 

