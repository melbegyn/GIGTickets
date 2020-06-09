import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(
    public service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {

    console.log(" test " + JSON.stringify(this.service.formModel.value))
    this.service.register().subscribe(
      (res: any) => {

        if (res.key !== '') {
          this.service.formModel.reset();
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error('Registration failed');

        /*if (res.succeeded) {
          console.log(" 0 ")
          this.service.formModel.reset();
          console.log(" 1 "  )
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          console.log(" 2 ")
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration failed.');
                break;

              default:
                this.toastr.error(element.description, 'Registration failed.');
                break;
            }
          });
        }*/
      },
      err => {
        console.log(err);
      }
    );
  }

}
