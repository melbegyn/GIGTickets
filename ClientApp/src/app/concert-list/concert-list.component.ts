import { ConcertService } from './../concert/concert.service';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styles: []
})
export class ConcertListComponent implements OnInit {

  constructor(public concertService: ConcertService) { }

  ngOnInit() {
    this.concertService.refreshList();
  }

  populateForm(selectedRecord) {
    this.concertService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this concert ?')) {
      this.concertService.deleteConcert(id)
        .subscribe(res => {
          this.concertService.refreshList();
        },
          err => { console.log(err); })
    }
  }
}
