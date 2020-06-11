import { Component, OnInit } from '@angular/core';
import { ConcertService } from './concert.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Concert } from '../shared/concert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../shared/ticket.model';


@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: []
})
export class ConcertComponent implements OnInit {

  concertForm: FormGroup;
  fields: any;
  Tickets: FormArray;
  ticketForm: FormGroup;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    public concertService: ConcertService,
    private fb: FormBuilder) {

    this.concertForm = this.fb.group({

      Id: 0,
      TourName: new FormControl('', Validators.required),
      Artist: new FormControl('', Validators.required),
      Picture: new FormControl('', Validators.required),
      Stage: new FormControl('', Validators.required),
      ConcertDate: new FormControl(null, Validators.required),
      NumberTicketsAvailable: new FormControl(0, Validators.required),
      TicketPrice: new FormControl(0, Validators.required),
      Tickets: this.fb.array([ 
         // this.createTicket()
        ])


    });
    this.Tickets = this.concertForm.get('Tickets') as FormArray;
    this.Tickets.push(this.createTicket());

    //this.loadForm;
  }

  getFormData() { return (<FormArray>this.concertForm.get('Tickets')).controls; }


  ngOnInit() {

  }

 


  deleteRow(index: number) {
    this.Tickets.removeAt(index);
  }

 

  addTicket(): void {

  
    this.Tickets = this.concertForm.get('Tickets') as FormArray;
    this.Tickets.push(this.createTicket());
  }

  createTicket(): FormGroup {

    return this.fb.group({
      Id: 0,
      ConcertId: 0,
      UserId: 0,
      Price: new FormControl(0, Validators.required),
      Category: new FormControl('', Validators.required)

    });

  }

  create( ) {
  
   
     this.concertService.postConcert(this.concertForm.value).subscribe(
      res => {
        this.router.navigate(['backoffice']);
      },
      err => { console.log(err); }
    )
  }

  loadForm(data) {
    const control = this.concertForm.get("Tickets") as FormArray;
    this.fields.Tickets.forEach(x => {
      control.push(this.patchValues(x.Id, x.ConcertId, x.Price, x.Category, x.UserId))
    })
  }


  patchValues(Id, ConcertId, Price, Category, UserId) {
    return this.fb.group({
      id: [Id],
      ConcertId: [ConcertId],
      Price: [Price],
      Category: [Category],
      UserId: [UserId]
    })
  }


  onSubmit() {
    this.addConcert(); 
  }

 
 addConcert() { 
    
   this.concertService.postConcert(this.concertForm.value).subscribe(
     res => {
        
       
       this.concertService.refreshList();
       this.router.navigate(['backoffice']);
     },
     err => { console.log(err); }
   )  
   }

  
 


}
