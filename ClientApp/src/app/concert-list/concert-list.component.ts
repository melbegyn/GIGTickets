import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ConcertService } from '../shared/service/concert.service';
import { Concert } from '../shared/model/concert.model';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styles: []
})
export class ConcertListComponent implements OnInit {

  formData: Concert; 

  constructor(
    public concertService: ConcertService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    //this.concertService.refreshList();
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this concert ?')) {
      this.concertService.deleteConcert(id)
        .subscribe(res => {

          this.toastr.success('Delete done!');
          setInterval(() => {
            this.router.navigateByUrl('/backoffice');
          }, 8000);

          //this.concertService.refreshList();
          //this.router.navigate(['backoffice']);
        },
          err => { console.log(err); })
    }
  } 
}
