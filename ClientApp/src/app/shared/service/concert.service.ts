import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../../environments/environment';
import { Concert } from '../model/concert.model';

 
const headers: HttpHeaders = new HttpHeaders();
headers.set('Content-Type', 'application/json;charset=UTF-8');


@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  
  readonly rootURL = environment.apiBaseURI;
 
  list: Concert[];
  
  constructor(private http: HttpClient) { }

  postConcert(concert) { 
    return this.http.post(this.rootURL + '/Concert', concert);
  }

  putConcert(concert) {
    console.log(concert);
    return this.http.put(this.rootURL + '/Concert/' + concert.Id, concert)
  }

  refreshList() {
     
    this.http.get(this.rootURL + '/Concert')
      .toPromise()
      .then(res => {
        this.list = res as Concert[];
         // console.log(JSON.stringify(this.list));
      }
    );    
  }


  getConcerts() {
    return this.http.get(this.rootURL + '/Concert/');
  }

 
  getConcert(id) {
    return this.http.get<Concert>(this.rootURL + '/Concert/' + id);
  }

  deleteConcert(id) { 
    return this.http.delete(this.rootURL + '/Concert/' + id);
  }
   
}
