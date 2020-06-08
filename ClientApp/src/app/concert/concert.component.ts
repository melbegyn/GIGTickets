import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConcertService } from './concert.service';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {

  concertForm: FormGroup;
  concertList;

  constructor(private fb: FormBuilder, private http: HttpClient,
              private concertService: ConcertService) { }

  ngOnInit() {

    this.concertForm = this.fb.group({
      tourName: [''],
      artist: [''],
      stage: [''],
      concertDate: [''],
      nbTicketsAvailable: [''],
      ticketPrice: ['']
    });
    this.getConcertData();
  }

  OnSubmit() {
    this.concertService.saveConcert(this.concertForm.value).subscribe(data => {
      this.getConcertData();
    });    
  }

  getConcertData() {
    this.concertService.getConcerts().subscribe(data => {
      this.concertList = data;
    });
  }
}
