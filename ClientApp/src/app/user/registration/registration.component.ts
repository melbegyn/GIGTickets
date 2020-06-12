import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/service/user.service';

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
      },
      err => {
        console.log(err);
      }
    );

  }


}
