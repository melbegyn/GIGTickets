import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'; 
import { ConcertService } from '../concert/concert.service';
import { Concert } from '../shared/concert.model';
import { Ticket } from '../shared/ticket.model';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  
  tap
} from "rxjs/operators";
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-concert-details',
  templateUrl: './concert-details.component.html',
  styleUrls: ['./concert-details.component.css']
})


export class ConcertDetailsComponent implements OnInit {

  // necessary
  id: number;

  userId: number;
  currentUser: User;
   

  concertId: any; // Getting Concert id from URL
  concertData: any; // Getting Concert details
  //ticketsListData: Ticket[];

  userForm: FormGroup;
  fields: any;
  Tickets: FormArray;
   
  ticketForm: FormGroup;
 
   
  ticketList = new Array<Ticket>();
 
  constructor(
    public concertService: ConcertService,
    public ticketService: TicketService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {


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
    this.loadProductDetails(this.concertId);

    ticketService.getTicketsById(this.concertId).subscribe(response => {
      this.ticketList = response.map(item => {
        return new Ticket(
          item.Id,
          item.Price,
          item.Category,
          item.ConcertId,
          item.UserId
        );
      });

      this.ticketForm.controls['Price'].setValue(response[0].Price);
      this.ticketForm.controls['Category'].setValue(response[0].Category);
      this.ticketForm.controls['Id'].setValue(response[0].Id);
      this.ticketForm.controls['ConcertId'].setValue(response[0].ConcertId);
/*      if (response[0].UserId != null) {
        this.ticketForm.controls['UserId'].setValue(response[0].UserId);
      }*/

      

    });
 
  
    //this.patch(); 

  }

  loadForm(data) {
   
    const ticketsFormArray = this.userForm.get("Tickets") as FormArray;

    this.fields.Tickets.forEach(x => {
      ticketsFormArray.push(this.patchValues(x.Id, x.ConcertId, x.Price, x.Category, x.UserId))
    })

 
  }

/*  getData(): Observable<any> {
    return this.concertService.getTicketsByIdMel(this.concertId).pipe(map(res => res));
  }

 */

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


  loadProductDetails(concertId) {
    this.concertService.getConcert(concertId).subscribe(concert => {
      this.concertData = concert;
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
      this.router.navigateByUrl('/home');
    });  

  }

  navigation(link) {
    this.router.navigate([link]);
  }

 

}

 
 

