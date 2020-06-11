import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../shared/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly rootURL = environment.apiBaseURI;

  constructor(private http: HttpClient) { }

  public getTicketsByConcert(id): Observable<Ticket[]> {
    const url = this.rootURL + '/Ticket/Concert/' + id;
    return this.http.get<Ticket[]>(url);
  }

  public getTicketsByUser(id) {
    const url = this.rootURL + '/Ticket/User/' + id;
    return this.http.get<Ticket[]>(url);
  }


  putTicket(ticket) {
    return this.http.put(this.rootURL + '/UserProfile/' + ticket.Id, ticket)
  }
/*
  getTicketsById(concertId) {
    return this.http.get(this.rootURL + '/Ticket/Add/' + concertId);
  }*/

 
}
