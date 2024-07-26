import { Component, Input } from '@angular/core';
import { UserResponseInterface } from '../types/users.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() users!: UserResponseInterface[];

  constructor() {
    console.log(this.users)
  }
}
