import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, options: Options, body: any): Observable<T> {
    console.log('body is', body);
    return this.httpClient.post(url, body, options) as Observable<T>;
  }

  patch<T>(url: string, options: Options, body: any): Observable<T> {
    return this.httpClient.patch(url, body, options) as Observable<T>;
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete(url) as Observable<T>;
  }
}
