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
    private concertService: ConcertService,
    private fb: FormBuilder) {

    this.concertForm = this.fb.group({

      Id: 0,
      TourName: ['', Validators.required],
      Artist: ['', Validators.required],
      Stage: ['', Validators.required],
      ConcertDate: ['', Validators.required],
      NumberTicketsAvailable: ['', Validators.required],
      TicketPrice: ['', Validators.required],
      Tickets: this.fb.array([
        this.ticketForm = this.fb.group({
          Id: 0,
          ConcertId: 0,
          UserId: 0,
          Price: ['', Validators.required],
          Category: ['', Validators.required]

        })])


    });

    this.loadForm;
    /* console.log("1")
    
     console.log("2")
     // patch the values from your object
   
     console.log("3")*/

  }




  ngOnInit() {

    /*this.fields = {
      Id: 0,
      TourName: ['', Validators.required],
      Artist: ['', Validators.compose([Validators.required])],
      Stage: ['', Validators.compose([Validators.required])],
      ConcertDate: [null, Validators.compose([Validators.required])],
      NumberTicketsAvailable: [null, Validators.compose([Validators.required])],
      TicketPrice: [null, Validators.compose([Validators.required])],
      
      Tickets: {
        Ticket: [
          {
            Id: 1,
            Price: 20,
            Category: 'VIP',
            ConcertId: 0

          },
          {
            Id: 2,
            Price: 30,
            Category: 'VIP',
            ConcertId: 0
          }
        ]
      }
    };*/
    /*    this.concertForm = this.fb.group({
          Tickets: this.fb.group({
            Ticket: this.fb.array([])
          })
        });*/
    //  this.patch()

  }



  add(value: NgForm) {
    //const data = JSON.stringify(formData.value);
    //this.employeeDetails.getRawValue()
    this.concertService.postConcert(value).subscribe(
      res => {

        //this.resetForm(this.concertForm);
        //this.concertService.refreshList();
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
  patch() {

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


  onSubmit(form: NgForm) {
    //this.addConcert(form); 
  }

  /* 
    counter(i: number) {
      return new Array(i);
    }
  
  
  
    addConcert(form: NgForm) { 
   
      const nbOfTickets = form.value.NumberTicketsAvailable;
   
      for (var counter: number = 1; counter < nbOfTickets; counter++) {
  
        console.log(counter);
        const ticket: Ticket = {
          Id: counter,
          Price: form.value.TicketPrice,
          Category: form.value.Category,
          ConcertId: form.value.Id
        }
       // this.ticketsList.push(ticket);
      }
  
  
   
      form.value.TicketsList = this.ticketsList;
  
      for (let ticket of form.value.TicketsList) {
        console.log(" ticket" + ticket.Category);
        console.log(" ticket" + ticket.Id);
        console.log(" ticket" + ticket.ConcertId);
        console.log(" ticket" + ticket.Price);
      }
      
      console.log(" values " + JSON.stringify(form.value));
   
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
   
  */
  /* resetForm(form?: NgForm) {
     if (form != null)
       form.form.reset({ id: this.concertForm.id });
     this.formData = {
       Id: 0,
       TourName: '',
       Artist: '',
       Stage: '',
       ConcertDate: null,
       NumberTicketsAvailable: 0,
       TicketPrice: 0,
       TicketsList: [
         {
           Id: 0,
           Category: '',
           Price: 0,
           ConcertId: 0
         }
       ]
     } 
   } */





}
