import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Concert } from '../../shared/model/concert.model';
import { User } from '../../shared/model/user.model';
import { Ticket } from '../../shared/model/ticket.model';
import { UserService } from '../../shared/service/user.service';
import { TicketService } from '../../shared/service/ticket.service';
import { ConcertService } from '../../shared/service/concert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  ticketList = new Array<Ticket>();
  idUser: string; 
  ticket = Ticket;
  concertList = new Array<Concert>(); 
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private concertService: ConcertService,
    private fb: FormBuilder) { }


  ngOnInit() {

    this.userForm = this.fb.group({
      Id: ['', Validators.required],
      FullName: ['', Validators.required],
      UserName: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required])]
    });


    this.userService.getUserProfile().subscribe((data) => {
      //this.userDetails = data;
      //console.log("this " + this.currentUser.Id);
      this.currentUser = data as User;

      this.userForm.controls['FullName'].setValue(data.FullName);
      this.userForm.controls['UserName'].setValue(data.UserName);
      this.userForm.controls['Email'].setValue(data.Email);
      this.userForm.controls['Id'].setValue(data.Id);

      this.userForm.get('Id').setValue(data.Id);

 
    }, (err) => {
      console.log(err);
    });
   
    console.log(this.userForm.value.Id);
    console.log(this.userForm.controls.Id.value);
    console.log(this.userForm.value['Id']);
    this.idUser = this.userForm.get('Id').value;

  }


  getTicketsOfUser() {
    console.log(this.userForm.value.Id);
    console.log(this.userForm.controls.Id.value);
    console.log(this.userForm.value['Id']);
    this.idUser = this.userForm.get('Id').value;

     
    this.ticketService.getTicketsByUser(this.idUser)
      .toPromise()
      .then(res => {
        this.ticketList = res as Ticket[];
       
        for (let re in res as Ticket[]) {

          this.concertService.getConcert(this.ticketList[re].ConcertId).subscribe(rest => {
            this.concertList.push(rest);
             
              console.log(JSON.stringify(this.ticketList));
            }
            );
        }
         

        console.log(JSON.stringify(this.ticketList));
      }
      );
  }

}
