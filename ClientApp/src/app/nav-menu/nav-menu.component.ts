import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/service/user.service';
import { ConcertService } from '../shared/service/concert.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
   
  currentUser: User;


  constructor(
    private router: Router, 
    private service: UserService,
    private concertService: ConcertService) {

  }

  ngOnInit() {

    this.service.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;
    }, (err) => { 
        this.router.navigate(['/user/login']);
        //console.log(err);
    }); 
    //this.concertService.refreshList(); 
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
