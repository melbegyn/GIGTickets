import { Component, OnInit } from '@angular/core'; 
import { ConcertService } from './concert.service'; 
import { NgForm } from '@angular/forms';
import { Concert } from '../shared/concert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../shared/ticket.model';


@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: []
})
export class ConcertComponent implements OnInit {

  formData: Concert;
  concertList;

 
  ticketsList: Array<Ticket> = [];


  constructor(
    public service: ConcertService,
    private router: Router) {

   // type Ticket = Array<{ id: number, text: string }>;

  


  }

  ngOnInit() {
     
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

  }

  onSubmit(form: NgForm) { 
      this.addConcert(form); 
  }

/*  generate(): string {
    let isUnique = false;
    let tempId = '';

    while (!isUnique) {
      tempId = this.generator();
      if (!this.idExists(tempId)) {
        isUnique = true;
        this.ids.push(tempId);
      }
    }

    return tempId;
  }*/
  counter(i: number) {
    return new Array(i);
  }



  addConcert(form: NgForm) {
    //console.log(form.value);

     
    console.log(" form.value.NumberTicketsAvailable " + form.value.NumberTicketsAvailable);

    console.log(" form.value.category " + form.value.Category);

    const nbOfTickets = form.value.NumberTicketsAvailable;
 
    for (var counter: number = 1; counter < nbOfTickets; counter++) {

      console.log(counter);
      const ticket: Ticket = {
        Id: counter,
        Price: form.value.TicketPrice,
        Category: form.value.Category,
        ConcertId: form.value.Id
      }
      this.ticketsList.push(ticket);
    }

    for (let ticket of this.ticketsList) {
      console.log(" ticket" + ticket.Category);
      console.log(" ticket" + ticket.Id);
      console.log(" ticket" + ticket.ConcertId);
      console.log(" ticket" + ticket.Price);
    }
    
/*   
      { id: 1, text: 'Sentence 1' },
      { id: 2, text: 'Sentence 2' },
      { id: 3, text: 'Sentence 3' },
      { id: 4, text: 'Sentenc4 ' },
    ];*/

 
    form.value.TicketsList = this.ticketsList;

    
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
  }  

 
 

 
}
