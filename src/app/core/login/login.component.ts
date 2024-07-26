import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit = () => {
    const rawValue = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.authService.login(rawValue).subscribe({
        next: () => {
          this.authService.setLoginStatus(true);
          this.router.navigateByUrl('/');
          this.toaster.success('Login Successfully');
        },
        error: () => {
          this.toaster.error('Login Failed');
        },
      });
    }
  };
}
