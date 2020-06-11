import { Component, OnInit } from '@angular/core';
import { ConcertService } from '../concert/concert.service';
import { TicketService } from '../service/ticket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../shared/ticket.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // necessary
  //id: number;
  concertId: any; // Getting Concert id from URL
  concertData: any; // Getting Concert details

  currentUser: User;

  userForm: FormGroup;
  fields: any;
  Tickets: FormArray;


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
      Email: ['', Validators.compose([Validators.required])],
      Tickets: this.fb.array([
        this.ticketForm = this.fb.group({
          Id: ['', Validators.required],
          ConcertId: ['', Validators.required],
          UserId: ['', Validators.required],
          Price: ['', Validators.required],
          Category: ['', Validators.required]

        })])

    });

    this.loadForm;

    this.concertId = this.actRoute.snapshot.params['id'];
    this.loadConcertDetails(this.concertId);



    ticketService.getTicketsById(this.concertId).subscribe(response => {
      response.map(item => {
        this.ticketList = response
      })

      this.ticketForm.controls['Price'].setValue(response[0].Price);
      this.ticketForm.controls['Category'].setValue(response[0].Category);
      this.ticketForm.controls['Id'].setValue(response[0].Id);
      this.ticketForm.controls['ConcertId'].setValue(response[0].ConcertId);
      /*      if (response[0].UserId != null) {
              this.ticketForm.controls['UserId'].setValue(response[0].UserId);
            }*/



    });

    console.log(this.concertId)
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

    this.userService.getUserProfile().subscribe((data) => {
      this.currentUser = data as User;

      this.userForm.controls['Id'].setValue(this.currentUser.Id);
      this.userForm.controls['FullName'].setValue(this.currentUser.FullName);
      this.userForm.controls['UserName'].setValue(this.currentUser.UserName);
      this.userForm.controls['Email'].setValue(this.currentUser.Email);

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

    console.log(this.userForm);

    this.concertService.putTicket(this.userForm.value).subscribe(ticket => {
      
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
