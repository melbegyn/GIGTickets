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
   
  deleteConcert(id) {
    return this.http.delete(this.rootURL + '/Concert/' + id);
  }

}
