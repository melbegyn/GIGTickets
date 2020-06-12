import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ConcertService } from '../shared/service/concert.service';
import { TicketService } from '../shared/service/ticket.service';
import { Ticket } from '../shared/model/ticket.model';
import { ToastrService } from 'ngx-toastr'; 


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
    private toastr: ToastrService,
    private fb: FormBuilder) {


    this.concertForm = this.fb.group({ 

      Id: ['', Validators.required],
      TourName: ['', Validators.required],
      Artist: ['', Validators.compose([Validators.required])],
      Stage: ['', Validators.compose([Validators.required])],
      Picture: ['', Validators.compose([Validators.required])],
      EventDate: [null, Validators.compose([Validators.required])],
      NumberTicketsAvailable: [null, Validators.compose([Validators.required])],
      TicketPrice: [null, Validators.compose([Validators.required])],
      Tickets: this.fb.array([])

    });
 
    this.loadForm;

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

    this.Tickets = this.concertForm.get('Tickets') as FormArray;
    this.concertForm.setControl('Tickets', this.TicketsFormArray);
      
    if (this.id > 0) {
      this.concertService.getConcert(this.id)
        .subscribe(resp => {
          this.concertData = resp;

          this.concertForm.setValue(resp)
        }
          , err => {
            console.log(err);
          });
    } 
  }

      

  onSubmit(form) {

    this.Tickets = this.concertForm.get('Tickets') as FormArray;

    //console.log(this.concertForm.value);
  
    this.concertService.putConcert(form)
      .subscribe((data) => {
         
        this.toastr.success('Edit done!');
        setInterval(() => {
          this.router.navigateByUrl('/backoffice');
        }, 5000);

      }, err => {
        console.log(err);
      });

 
 
  }

  navigation(link) {
    this.router.navigate([link]);
  }

  getConcert(id) {
    this.concertService.getConcert(id).subscribe(concert => {
      this.concertData = concert;
    });
  }

}
