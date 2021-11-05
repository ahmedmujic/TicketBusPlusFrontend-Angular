import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoEmail } from '../models/info.model';

@Injectable()
export class InfoService {
  constructor(private http: HttpClient) { }

    sendInfoEmail(info: InfoEmail){
        return this.http.post(`${environment.apiUrl}/api/Info`, info);
    }

}
