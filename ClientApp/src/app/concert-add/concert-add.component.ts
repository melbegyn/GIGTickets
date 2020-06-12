import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../shared/service/concert.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-concert',
  templateUrl: './concert-add.component.html',
  styleUrls: []
})
export class ConcertAddComponent implements OnInit {

  public concertForm: FormGroup; 
  ticketForm: FormGroup;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    public concertService: ConcertService,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  get TicketsFormArray(): FormArray {
    return this.concertForm.get('Tickets') as FormArray;
  }
 

  ngOnInit() {
     
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



  deleteTicket(index: number) { 
    this.TicketsFormArray.removeAt(index);
  }

   
  addTicket(): void { 
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
  }

  create() { 
    this.concertService.postConcert(this.concertForm.value).subscribe(
      res => {
        this.router.navigate(['backoffice']);
      },
      err => { console.log(err); }
    )
  }

  loadForm(data) { 
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

   
  onSubmit(form) {

    console.log(form);  
    this.concertService.postConcert(form.getRawValue()).subscribe(
      res => {
        this.toastr.success('Concert created!');
        setInterval(() => {
          this.router.navigateByUrl('/backoffice');
        }, 5000);
         
      },
      err => { console.log(err); }
    ) 
  }

/*  addConcert() {

    this.concertService.postConcert(this.concertForm.value).subscribe(
      res => { 
        this.concertService.refreshList();
        this.router.navigate(['backoffice']);
      },
      err => { console.log(err); }
    )
  }*/
   

}
