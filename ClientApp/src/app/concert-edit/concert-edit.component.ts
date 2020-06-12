import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConcertService } from '../concert/concert.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Concert } from '../shared/concert.model';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../shared/ticket.model';
import { UserService } from '../service/user.service';
import { TicketService } from '../service/ticket.service';


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
  fields: any;
  Tickets: FormArray;

  ticketList = new Array<Ticket>();

  ticketForm: FormGroup;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private concertService: ConcertService,
    private ticketService: TicketService,
    private fb: FormBuilder) {


    this.concertForm = this.fb.group({ 

      Id: ['', Validators.required],
      TourName: ['', Validators.required],
      Artist: ['', Validators.compose([Validators.required])],
      Stage: ['', Validators.compose([Validators.required])],
      Picture: ['', Validators.compose([Validators.required])],
      ConcertDate: [null, Validators.compose([Validators.required])],
      NumberTicketsAvailable: [null, Validators.compose([Validators.required])],
      TicketPrice: [null, Validators.compose([Validators.required])],
      Tickets: this.fb.array([
        //this.createTicket()
        ])

    });


   // this.loadForm;

    if (this.actRoute.snapshot.params["id"]) {
      this.id = this.actRoute.snapshot.params['id'];
    }



    ticketService.getTicketsByConcert(this.id).subscribe(response => {
      response.map(item => {
        this.ticketList = response
      })

      for (let i in response) {
        this.Tickets = this.concertForm.get("Tickets") as FormArray;

        this.Tickets.push(
          this.fb.group(
            {

              Id: [response[i].Id, Validators.required],
              ConcertId: [response[i].ConcertId, Validators.required],
              UserId: [response[i].UserId, Validators.required],
              Price: [response[i].Price, Validators.required],
              Category: [response[i].Category, Validators.required]
            })
        );
      }
    });
  }

  loadForm(data) {

    const ticketsFormArray = this.concertForm.get("Tickets") as FormArray;

    this.fields.Tickets.forEach(x => {
      ticketsFormArray.push(this.patchValues(x.Id, x.ConcertId, x.Price, x.Category, x.UserId))
    })


  }



  patchValues(Id, ConcertId, Price, Category, UserId) {
    return this.fb.group({
      id: [Id],
      ConcertId: [ConcertId],
      Price: [Price],
      Category: [Category],
      UserId: null
    })
  }
  createTicket(): FormGroup {

    return this.fb.group({
      Id: ['', Validators.required],
      ConcertId: ['', Validators.required],
      UserId: ['', Validators.required],
      Price: ['', Validators.required],
      Category: ['', Validators.required]

    });
  }


  get TicketsFormArray(): FormArray {
    return this.concertForm.get('Tickets') as FormArray;
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
