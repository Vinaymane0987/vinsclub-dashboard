import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Response } from '../../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getAllProduct = (url: string): Observable<Response<Product[]>> => {
    return this.apiService.get(url, { responseType: 'json' });
  };

  findOne = (url: string): Observable<Response<Product>> => {
    return this.apiService.get(url, { responseType: 'json' });
  };

  addProduct = (url: string, body: Product): Observable<Response<Product>> => {
    return this.apiService.post(url, {}, body);
  };

  editProduct = (url: string, body: Product): Observable<Response<Product>> => {
    return this.apiService.patch(url, {}, body);
  };

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url);
  };
}
