import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConcertService } from '../concert/concert.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Concert } from '../shared/concert.model';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {

  concertForm: FormGroup;
  id: number;
  concertData: any;
  concertId: any;


  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private concertService: ConcertService,
    private fb: FormBuilder) {

    if (this.actRoute.snapshot.params["id"]) {
      this.id = this.actRoute.snapshot.params['id'];
    }
     

    this.concertForm = this.fb.group({ 

      Id: 0,
      TourName: ['', Validators.required],
      Artist: ['', Validators.compose([Validators.required])],
      Stage: ['', Validators.compose([Validators.required])],
      ConcertDate: [null, Validators.compose([Validators.required])],
      NumberTicketsAvailable: [null, Validators.compose([Validators.required])],
      TicketPrice: [null, Validators.compose([Validators.required])]
    });
     
  }

  ngOnInit() {

    if (this.id > 0) {
      this.concertService.getConcert(this.id)
        .subscribe(resp => this.concertForm.setValue(resp)
          , err => {
            console.log(err);
          });
    }

    //console.log(" values " + JSON.stringify(this.concertForm.value));  
  }



/*  loadConcert(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;

      this.concertForm.controls['TourName'].setValue(this.concertData['TourName']);
      this.concertForm.controls['Artist'].setValue(this.concertData['Artist']);
      this.concertForm.controls['Stage'].setValue(this.concertData['Stage']);
      this.concertForm.controls['NumberTicketsAvailable'].setValue(this.concertData['NumberTicketsAvailable']);
      this.concertForm.controls['TicketPrice'].setValue(this.concertData['TicketPrice']);
      this.concertForm.controls['ConcertDate'].setValue(this.concertData['ConcertDate']);
    }); 
  }*/


  update() {

    console.log(" values " + JSON.stringify(this.concertForm.value));  

    this.concertService.putConcert(this.concertForm.value)
      .subscribe((data) => {
        this.router.navigate(['backoffice']);
      }, err => {
        console.log(err);
      });
  }


  getConcert(id) {
    this.concertService.getConcert(id).subscribe(concert => {
      this.concertData = concert;
    });
  }

}
