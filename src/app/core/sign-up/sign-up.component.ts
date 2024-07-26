import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserDetails } from '../../../types';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  signUpForm = this.formBuilder.nonNullable.group(
    {
      firstName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(4)],
      confirmPassword: ['', Validators.minLength(4)],
    }
    // {
    //   validators: passwordMatchValidator(),
    // }
  );

  onSubmit = () => {
    const rawValue: UserDetails = this.signUpForm.getRawValue();
    console.log(rawValue);
    if (this.signUpForm.valid) {
      this.authService.register(rawValue).subscribe({
        next: () => {
          this.authService.setLoginStatus(true);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log('error registering the user', err);
        },
      });
    }
  };
}
