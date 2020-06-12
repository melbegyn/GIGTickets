import { Component } from '@angular/core';
import { ConcertService } from './../concert/concert.service';
import { HttpClient } from '@angular/common/http';
import { Concert } from '../shared/concert.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

   

  currentUser: User;


  constructor(
    private router: Router, 
    private service: UserService) {

  }

  ngOnInit() {

    this.service.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;

    }, (err) => {
      console.log(err);
    });

    this.concertService.refreshList(); 
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
