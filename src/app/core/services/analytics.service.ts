import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

constructor(private http: HttpClient) { }

  getIncomeStats(){
    return this.http.get(`${environment.apiUrl}/api/booking/Analytics/getSellStat`);
  }

  getCountryStats(){
    return this.http.get(`${environment.apiUrl}/api/booking/Analytics/country-stats`)
  }

  getMonthStats(){
    return this.http.get(`${environment.apiUrl}/api/booking/Analytics/monthly-stats`)
  }
}
