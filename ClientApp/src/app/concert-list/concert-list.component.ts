import { ConcertService } from './../concert/concert.service';
import { Component, OnInit } from '@angular/core'; 
import { Concert } from '../shared/concert.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styles: []
})
export class ConcertListComponent implements OnInit {

  formData: Concert;
  //list: Concert[];

  constructor(
    public concertService: ConcertService,
    private router: Router) { }

  ngOnInit() {
    this.concertService.refreshList();
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this concert ?')) {
      this.concertService.deleteConcert(id)
        .subscribe(res => {
          this.concertService.refreshList();
          this.router.navigate(['backoffice']);
        },
          err => { console.log(err); })
    }
  } 
}
