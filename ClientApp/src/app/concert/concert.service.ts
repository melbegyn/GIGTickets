import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const headers: HttpHeaders = new HttpHeaders();
headers.set('Content-Type', 'application/json');


@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  constructor(private http: HttpClient) { }

  saveConcert(ConcertData) {
    return this.http.post('https://localhost:44374/api/Concert', ConcertData, { headers: headers });
  }                     

  updateConcert(ConcertData) { 
    return this.http.put('https://localhost:44374/api/Concert', ConcertData, { headers: headers });
  }

  getConcertList() {
    return this.http.get(environment.apiBaseURI + '/Concert', { headers: headers });
  }

  getConcertById(id) {
    return this.http.get('https://localhost:44374/api/Concert/' + id, { headers: headers });
  }

  deleteConcertById(id) {
    return this.http.delete('https://localhost:44374/api/Concert/' + id, { headers: headers } );
  }

}
