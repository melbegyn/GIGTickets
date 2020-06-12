import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr'; 
import { User } from '../shared/model/user.model';
import { Ticket } from '../shared/model/ticket.model';
import { ConcertService } from '../shared/service/concert.service';
import { TicketService } from '../shared/service/ticket.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 
  concertId: any; // Getting Concert id from URL
  concertData: any; // Getting Concert details

  currentUser: User;

  userForm: FormGroup;
  fields: any;
  Tickets: FormArray;

  numberOfTickets: number;

  ticketList = new Array<Ticket>();


  ticketForm: FormGroup;

  constructor(public concertService: ConcertService,
    public ticketService: TicketService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {


    this.userForm = this.fb.group({

      Id: ['', Validators.required],
      FullName: ['', Validators.required],
      UserName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required])],
      Tickets: this.fb.array([])

    }); 

    this.loadForm;

    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadConcertDetails(this.concertId);
     
    ticketService.getTicketsByConcert(this.concertId).subscribe(response => {
      response.map(item => {
        this.ticketList = response
      })
       
      for (let i in response) {
        this.Tickets = this.userForm.get("Tickets") as FormArray;

        if (response[i].UserId == null) {
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
      } 
    }); 
   // console.log(this.concertId)
  }

 

  deleteTicket(index: number) {
    this.Tickets.removeAt(index);
  }


  addTicket(): void {
    this.Tickets = this.userForm.get('Tickets') as FormArray;
    this.Tickets.push(this.createTicket());
  }

  get formData() { return <FormArray>this.userForm.get('Ticket'); } 

  createTicket(): FormGroup {

    return this.fb.group({
      Id: ['', Validators.required],
      ConcertId: ['', Validators.required],
      UserId: ['', Validators.required],
      Price: ['', Validators.required],
      Category: ['', Validators.required]

    });

  }

   
  loadForm(data) {

    const ticketsFormArray = this.userForm.get("Tickets") as FormArray;

    this.fields.Tickets.forEach(x => {
      ticketsFormArray.push(this.patchValues(x.Id, x.ConcertId, x.Price, x.Category, x.UserId))
    })
     
  }

   
  loadConcertDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
    });
  }

  ngOnInit() {

    //console.log(this.concertData);
     

    this.userService.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;

      this.userForm.controls['Id'].setValue(this.currentUser.Id);
      this.userForm.controls['FullName'].setValue(this.currentUser.FullName);
      this.userForm.controls['UserName'].setValue(this.currentUser.UserName);
      this.userForm.controls['Email'].setValue(this.currentUser.Email);
      this.userForm.controls['homeAddress'].setValue(this.currentUser.homeAddress); 
      this.ticketForm.controls['UserId'].setValue(this.currentUser.Id); 

    }, (err) => {
      console.log(err);
    });
  }


  patch() { 
    const control = <FormArray>this.userForm.get('Tickets.Ticket');

    this.fields.Tickets.Ticket.forEach(x => {
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


  buyTicket() {

    //console.log(this.userForm);

    let numberOfTicket = this.Tickets.controls.length;
 
    this.concertService.getConcert(this.concertId).subscribe(concert => {

      console.log(concert.NumberTicketsAvailable);

      concert.NumberTicketsAvailable = concert.NumberTicketsAvailable - numberOfTicket;
    
      console.log(concert.NumberTicketsAvailable);

      this.concertService.putConcert(concert)
        .subscribe((data) => {
          //this.router.navigate(['backoffice']);
        }, err => {
          console.log(err);
        }); 
    });

     this.ticketService.putTicket(this.userForm.value).subscribe(ticket => {
      
      this.toastr.success('Payment successful!');
      setInterval(() => {
          this.router.navigateByUrl('/home');
      }, 5000);
      
    }); 

  }


  navigation(link) {
    this.router.navigate([link]);
  }


}
