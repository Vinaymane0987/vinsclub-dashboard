import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { LoginComponent } from '../login/login.component';
import { Home2Component } from '../home2/home2.component';
import { ProductActions } from '../products/store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarComponent, LoginComponent, Home2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
