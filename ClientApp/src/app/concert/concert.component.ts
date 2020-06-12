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

  public concertForm: FormGroup;
 // TicketsArray: FormArray;


  ticketForm: FormGroup;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    public concertService: ConcertService,
    private fb: FormBuilder) {

   
   // this.Tickets = this.concertForm.get('Tickets') as FormArray;
  //  this.Tickets.push(this.createTicket());

    //this.loadForm;
  }

  get TicketsFormArray(): FormArray {
    return this.concertForm.get('Tickets') as FormArray;
}

  //getFormData() { return (<FormArray>this.concertForm.get('Tickets')).controls; }


  ngOnInit() {
  

/*    this.user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      })
    });*/

    this.concertForm = this.fb.group({

      Id: 0,
      TourName: ['', Validators.required],
      Artist: ['', Validators.required],
      Picture: ['', Validators.required],
      Stage: ['', Validators.required],
      ConcertDate: [null, Validators.required],
      NumberTicketsAvailable: [0, Validators.required],
      TicketPrice: [0, Validators.required],
      Tickets: this.fb.array([
         this.createTicket()
      ])


    });

   
  }

 

  deleteRow(index: number) {
    //this.Tickets.removeAt(index);
    this.TicketsFormArray.removeAt(index);
  }

 

  addTicket(): void {
    //let fg = this.fb.group(new Employee());
    //this.empFormArray.push(this.createTicket());	 
      
    this.TicketsFormArray.push(this.createTicket());
  }

  createTicket(): FormGroup {

   return this.fb.group({
      Id: 0,
      ConcertId: 0,
      UserId: null,
      Price: '',
      Category: ''

    });
     
  //  return this.fb.group(new Ticket());


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
    /*const control = this.concertForm.get("Tickets") as FormArray;
    this.fields.Tickets.forEach(x => {
      control.push(this.patchValues(x.Id, x.ConcertId, x.Price, x.Category, x.UserId))
    })*/

    this.TicketsFormArray.push(this.createTicket());

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


/*  onSubmit() {

    if (this.concertForm.valid) {
      console.log("Form Submitted!");
      this.addConcert(); 
      this.concertForm.reset();
    }
      console.log("valid!");
    
    
    console.log(this.concertForm.value)
  
  }*/
  onSubmit( form) {
    
    console.log(form);
  //  let serializedForm = JSON.stringify(form);
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

   // return this.http.post('/api/referer/insert', body, options).subscribe();

    this.concertService.postConcert(form.getRawValue()).subscribe(
      res => {


        this.concertService.refreshList();
        this.router.navigate(['backoffice']);
      },
      err => { console.log(err); }
    )  

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
