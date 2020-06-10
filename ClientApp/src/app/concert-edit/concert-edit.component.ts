import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConcertService } from '../concert/concert.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
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
  Tickets: FormArray;

  ticketForm: FormGroup;

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
      TicketPrice: [null, Validators.compose([Validators.required])],
      Tickets: this.fb.array([
        this.ticketForm = this.fb.group({
          Id: [null, Validators.compose([Validators.required])],
          ConcertId: [null, Validators.compose([Validators.required])],
          Price: [null, Validators.compose([Validators.required])],
          Category: ['', Validators.required]

        })])

    });
     
  }

  ngOnInit() {

   // this.concertForm.controls['Tickets'] = this.fb.array([]);

    console.log("this.id " + this.id)

    if (this.id > 0) {
      this.concertService.getConcert(this.id)
        .subscribe(resp => {
          this.concertData = resp;
  
          this.concertForm.setValue(resp)
        } 
          , err => {
            console.log(err);
          });

 
/*      this.concertForm.patchValue({
        Id: this.id,
        TourName: this.concertData.TourName,
        Artist: this.concertData.Artist,
        Stage: this.concertData.Stage,
        ConcertDate: this.concertData.ConcertDate,
        NumberTicketsAvailable: this.concertData.NumberTicketsAvailable,
        TicketPrice: this.concertData.TicketPrice,
      });
      this.concertForm.setControl('Tickets', this.fb.array(this.concertData.Tickets || []));*/
    }

   // this.concertForm.setControl('Tickets', this.fb.array([]));

    console.log(" values " + JSON.stringify(this.concertForm.value));  
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
   
    

    this.concertForm.setControl('Tickets', this.fb.array(this.concertData.Tickets || []));

     
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
