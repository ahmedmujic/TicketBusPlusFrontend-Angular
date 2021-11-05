import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seat } from '../models/seat';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  constructor(private http: HttpClient) {}

  getSeats(routeId: string): Observable<Array<Seat>> {
    return this.http.get<Array<Seat>>(`${environment.apiUrl}/api/booking/Seat/${routeId}`);
  }
}
