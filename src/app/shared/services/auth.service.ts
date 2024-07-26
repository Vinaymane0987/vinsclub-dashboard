import { Injectable, signal } from '@angular/core';
import { LoginRequest, Response, User, UserDetails } from '../../../types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) {}
  isLoggedIn = signal<boolean>(false);
  private apiUrl = 'http://localhost:3000';

  register(userDetails: UserDetails): Observable<Response<User>> {
    return this.apiService.post(
      `${this.apiUrl}/users/register`,
      {},
      userDetails
    );
  }

  login(loginRequest: LoginRequest): Observable<Response<User>> {
    return this.apiService.post(`${this.apiUrl}/users/login`, {}, loginRequest);
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.set(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  }

  checkLoginStatus(): boolean {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : this.isLoggedIn();
  }

  logout(): void {
    this.isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}

// signIn(email: string, password: string): Observable<void> {
//   const promise = signInWithEmailAndPassword(
//     this.firebaseAuth,
//     email,
//     password
//   )
//     .then(() => {
//       this.router.navigate(['/']);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return from(promise);
// }

// signUp(UserDetails: UserDetails): Observable<void> {
//   const promise = createUserWithEmailAndPassword(
//     this.firebaseAuth,
//     UserDetails.email,
//     UserDetails.password
//   )
//     .then((response) =>
//       updateProfile(response.user, { displayName: UserDetails.firstName })
//     )
//     .catch((error) => {
//       console.log('error creating user');
//     });
//   return from(promise);
// }
