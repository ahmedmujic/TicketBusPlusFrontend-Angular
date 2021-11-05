import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TownsPaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http: HttpClient) { }

  getTowns(pagination: TownsPaginationModel): any {
    return this.http.get<any>(
      `${environment.apiUrl}/api/booking/Town`, { params: { ...pagination }, observe: 'response'  }
    );
  }

}
