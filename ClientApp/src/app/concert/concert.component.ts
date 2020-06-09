import { Component, OnInit } from '@angular/core'; 
import { ConcertService } from './concert.service'; 
import { NgForm } from '@angular/forms';
import { Concert } from '../shared/concert.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: []
})
export class ConcertComponent implements OnInit {

  formData: Concert;
  concertList;

  constructor(
    public service: ConcertService,
    private router: Router) { }

  ngOnInit() {
     
    this.formData = {
      Id: 0,
      TourName: '',
      Artist: '',
      Stage: '',
      ConcertDate: null,
      NumberTicketsAvailable: 0,
      TicketPrice: 0
    }

  }

  onSubmit(form: NgForm) { 
      this.addConcert(form); 
  }

  addConcert(form: NgForm) {
    //console.log(form.value);
    this.service.postConcert(form.value).subscribe(
      res => {
        console.log(res);
        this.resetForm(form);
        this.service.refreshList();
        this.router.navigate(['backoffice']);
      },
      err => { console.log(err); }
    )
  }
 

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset({ id: this.formData.Id });
    this.formData = {
      Id: 0,
      TourName: '',
      Artist: '',
      Stage: '',
      ConcertDate: null,
      NumberTicketsAvailable: 0,
      TicketPrice: 0
    }
  }  

 
 

 
}
