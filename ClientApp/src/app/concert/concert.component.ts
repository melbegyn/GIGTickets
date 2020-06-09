import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConcertService } from './concert.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { Concert } from '../shared/concert.model';
 


@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: []
})
export class ConcertComponent implements OnInit {

  formData: Concert;
  //list: Concert[];
  //concertForm: FormGroup;
  concertList;

  constructor(public service: ConcertService) { }

 

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
    //if (this.formData.Id == 0)
      this.insertRecord(form);
   // else
     // this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    this.service.postConcert(form.value).subscribe(
      res => {
        console.log(res);
        this.resetForm(form);
        this.service.refreshList();
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
