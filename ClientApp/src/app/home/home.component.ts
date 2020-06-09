import { Component, Inject } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../shared/concert.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  userDetails;

  constructor(
    private router: Router,
    public concertService: ConcertService,
    private service: UserService) {

  }

  ngOnInit() {

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );

    this.concertService.refreshList();


  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}

