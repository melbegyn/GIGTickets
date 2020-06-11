import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../shared/user.model';
import { Ticket } from '../../shared/ticket.model';
import { TicketService } from '../../service/ticket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  ticketList = new Array<Ticket>();
  idUser: string;

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
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


  test() {
    console.log(this.userForm.value.Id);
    console.log(this.userForm.controls.Id.value);
    console.log(this.userForm.value['Id']);
    this.idUser = this.userForm.get('Id').value;


    console.log("this.idUser controle from " + this.userForm.get('Id').value);
    console.log("this.idUser " + this.idUser);
    this.ticketService.getTicketsByUser(this.idUser)
      .toPromise()
      .then(res => {
        this.ticketList = res as Ticket[];
        console.log(JSON.stringify(this.ticketList));
      }
      );
  }

}
