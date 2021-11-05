import { Station } from './../models/station.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponse } from '../models/pagination-response';
import { PaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private http: HttpClient) {}

  getStations(
    pagination: PaginationModel
  ): Observable<PaginationResponse<Station[]>> {
    let params = new HttpParams();
    params = params.append('itemsPerPage', pagination.itemsPerPage.toString());
    params = params.append('currentPage', pagination.currentPage.toString());
    return this.http.get<PaginationResponse<Station[]>>(
      `${environment.apiUrl}/api/booking/Station`,
      { params: params }
    );
  }
}
