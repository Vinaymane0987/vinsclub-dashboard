import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { UserResponseInterface } from '../types/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<UserResponseInterface[]> {
    return this.apiService.get<UserResponseInterface[]>(
      'https://jsonplaceholder.typicode.com/users',
      { responseType: 'json' }
    );
  }
}
