import { Observable } from 'rxjs';
import { PaginationModel } from './../models/pagination.model';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bus } from '../models/busses/bus';
import { PaginationResponse } from '../models/pagination-response';
import { Upload } from '../models/Upload.interface';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private http: HttpClient) {}

  getBusses(pagination: PaginationModel): any {
    let params = new HttpParams();
    params = params.append('itemsPerPage', pagination.itemsPerPage.toString());
    params = params.append('currentPage', pagination.currentPage.toString());
    return this.http.get<any>(`${environment.apiUrl}/api/booking/Bus`, {
      params: params,
      observe: 'response',
    });
  }

  addBus(bus: Bus) {
    console.log(bus);
    return this.http.post(`${environment.apiUrl}/api/booking/Bus`, bus);
  }

  isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
  }

  isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    );
  }

  upload(): (source: Observable<HttpEvent<unknown>>) => Observable<Upload> {
    const initialState: Upload = { state: 'PENDING', progress: 0 };
    const calculateState = (
      upload: Upload,
      event: HttpEvent<unknown>
    ): Upload => {
      if (this.isHttpProgressEvent(event)) {
        return {
          progress: event.total
            ? Math.round((100 * event.loaded) / event.total)
            : upload.progress,
          state: 'IN_PROGRESS',
        };
      }
      if (this.isHttpResponse(event)) {
        return {
          progress: 100,
          state: 'DONE',
        };
      }
      return upload;
    };
    return (source) => source.pipe(scan(calculateState, initialState));
  }

  uploadAddBusCsv(formData: FormData) {
    return this.http
      .post(`${environment.apiUrl}/api/booking/Bus/csv`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(this.upload());
  }
}

function observe<T>(
  arg0: string,
  arg1: { params: HttpParams },
  observe: any,
  arg3: string
): any {
  throw new Error('Function not implemented.');
}
