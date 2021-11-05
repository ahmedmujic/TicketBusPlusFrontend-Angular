import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddTicket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}

  bookTicket(ticket: AddTicket){
    return this.http.post(`${environment.apiUrl}/api/booking/Ticket`, ticket);
  }

}
