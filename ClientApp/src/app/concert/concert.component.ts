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
  }


  ngOnInit() {

  }

  saveProduct(values) {
    const concertData = new FormData();
    concertData.append('TourName', values.TourName);
    concertData.append('Stage', values.Stage);
    concertData.append('Artist', values.Artist);
    concertData.append('NumberTicketsAvailable', values.NumberTicketsAvailable);
    concertData.append('TicketPrice', values.TicketPrice);
    concertData.append('Tickets', values.Tickets);
    this.concertService.postConcert(concertData).subscribe(result => {
      this.router.navigate(['backoffice']);
    });
  }



  add(value) {
    console.log(value)
    this.concertService.postConcert(value).subscribe(
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


  onSubmit(form: NgForm) {
    this.addConcert(form); 
  }

 
 addConcert(form: NgForm) { 

   this.concertService.postConcert(form.value).subscribe(
     res => {
       console.log(res);
       
       this.concertService.refreshList();
       this.router.navigate(['backoffice']);
     },
     err => { console.log(err); }
   )  
   }

  
 


}
