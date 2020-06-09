import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Concert } from '../shared/concert.model';
import { map, share } from 'rxjs/operators';


const headers: HttpHeaders = new HttpHeaders();
headers.set('Content-Type', 'application/json;charset=UTF-8');


@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  
  readonly rootURL = environment.apiBaseURI;
 
  list: Concert[];

  constructor(private http: HttpClient) { }

 postConcert(formData) {
    return this.http.post(this.rootURL + '/Concert', formData);
  }

  putConcert(concert) {
    console.log("final " + concert.Id);

    console.log("final " + concert.NumberTicketsAvailable);
    console.log("final " + concert.Artist);
    console.log("final " + concert.ConcertDate);
    console.log("final " + concert.Stage);
    console.log("final " + concert.TicketPrice);
    console.log("final " + concert.TourName);







    return this.http.put(this.rootURL + '/Concert/' + concert.Id, concert)
  }

  refreshList() {
    this.http.get(this.rootURL + '/Concert')
      .toPromise()
      .then(res => this.list = res as Concert[]);
  }


  getConcert(id) {
    return this.http.get(this.rootURL + '/Concert/' + id);
  }


/*




  deleteConcert(id) {
    return this.http.delete(this.rootURL + '/Concert/' + id);
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
*/
}
