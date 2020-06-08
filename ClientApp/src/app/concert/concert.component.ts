import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConcertService } from './concert.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {

  concertForm: FormGroup;
  concertList;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private concertService: ConcertService) { }

  ngOnInit() {
     
      this.resetForm();
    

    
   // this.concertForm = this.fb.group({
    //  tourName: ['', Validators.required],
    //  artist: ['', Validators.required],
    //  stage: ['', Validators.required],
    //  concertDate: ['', Validators.required],
     // nbTicketsAvailable: ['', Validators.required],
     // ticketPrice: ['', Validators.required]
    //});
    //this.getConcertData();
    
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.concertService.postConcert().subscribe(
      res => {
        this.resetForm(form);
        this.concertService.refreshList();
      },
      err => { console.log(err); }
    )
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.concertService.formData = {
      id: 0,
      TourName: '',
      Artist: '',
      Stage: '',
      ConcertDate: null,
      NumberTicketsAvailable: 0,
      TicketPrice: 0
    }
  }  


  submit(formGroup) {
    if (formGroup.valid) {
      this.http.post(environment.apiBaseURI + '/Concert', formGroup.value).subscribe(res => {
        //here you received the response of your post
        console.log(res);
        //you can do asomething, like
        alert("datos enviados");
      })
    }
  }

  addConcert(data: any) {
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');
    
    const json = JSON.stringify(data); 
      console.log("on entre dans la functon!")

      console.log(" this.concertForm " + this.concertForm)

      console.log(" this.concertForm value " + this.concertForm.value.tourName)

    this.http.post(environment.apiBaseURI + '/Concert', json, {headers: headerOptions} ).subscribe(res => {
            
        console.warn("res", res);
      });
    console.warn(data);


  }

 


  getConcertData() {
    this.concertService.getConcertList().subscribe(data => {
        this.concertList = data;
    });
  }

  editConcert(id) {
    this.concertService.getConcertById(id).subscribe(data => {
      this.concertForm.patchValue(data);
    });
  }
}
