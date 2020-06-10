import { Component, Inject } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../shared/concert.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  userDetails;

  currentUser: User;

  constructor( 
    public concertService: ConcertService,
    private service: UserService) {

  }

  ngOnInit() {

    
    this.service.getUserProfile().subscribe((data) => {
      //this.userDetails = data;
      //console.log("this " + data);
      this.currentUser = data as User;
      
    }, (err) => {
      console.log(err);
    });


    
     


    this.concertService.refreshList();

    console.log("ff la " + this.userDetails.userName)

  } 

}

