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

  public getTicketsById(id): Observable<Ticket[]> {
    const url = this.rootURL + '/Ticket/Add/' + id;
    return this.http.get<Ticket[]>(url);
  }
}
