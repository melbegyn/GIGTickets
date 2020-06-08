import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  constructor(private http: HttpClient) { }

  saveConcert(ConcertData) {
    return this.http.post('http://localhost:44374/concert', ConcertData);
  }

  updateConcert(ConcertData) {
    return this.http.put('http://localhost:44374/concert', ConcertData);
  }

  getConcerts() {
    return this.http.get('http://localhost:44374/concert');
  }

  getConcertById(id) {
    return this.http.get('http://localhost:44374/concert/'+id, );
  }

  deleteConcertById(id) {
    return this.http.delete('http://localhost:44374/concert/' + id, );
  }

}
