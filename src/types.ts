import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface UserDetails {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Product {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

// export interface ProductResponse {
//   statusCode: number;
//   message: string;
//   data: Product[] | Product;
// }
