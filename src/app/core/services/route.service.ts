import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddRoute, Route, RouteTable } from '../models/route.model';
import { PaginationModel, RoutesPaginationModel } from '../models/pagination.model';
import { PaginationResponse } from '../models/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  getRoutes(pagination: RoutesPaginationModel): any {

    return this.http.get<any>(
      `${environment.apiUrl}/api/booking/Route`, { params: { ...pagination }, observe: 'response' }
    );
  }


  addRoute(route: AddRoute) {
    return this.http.post(`${environment.apiUrl}/api/booking/Route/add`, route);
  }

  getRouteById(routeId: string){
    return this.http.get(`${environment.apiUrl}/api/booking/Route/${routeId}`);
  }

}
