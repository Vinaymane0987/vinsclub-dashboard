import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { HomeComponent } from './core/home/home.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { LoginComponent } from './core/login/login.component';
import { SignUpComponent } from './core/sign-up/sign-up.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HomeComponent,
    TopbarComponent,
    LoginComponent,
    SignUpComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignupPage(): boolean {
    return this.router.url === '/sign-up';
  }
}
