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
  concertList = [];

  constructor(
    private fb: FormBuilder,
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

  addConcert() {

    if (this.concertForm.value.id == 0)
      this.concertService.saveConcert(this.concertForm.value).subscribe(
        (res: any) => {
          this.concertForm.patchValue({ id: res.id });
          error: error => console.error('There was an error!', error)
        });
  }

  getConcertData() {
    this.concertService.getConcertList().subscribe(data => {
        this.concertList = data as [];
    });
  }

  editConcert(id) {
    this.concertService.getConcertById(id).subscribe(data => {
      this.concertForm.patchValue(data);
    });
  }
}
