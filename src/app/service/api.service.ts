import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);


  constructor() {}

  post(url: string, body: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${url}`, body);
  }

  get(url: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}${url}`);
  }
}
