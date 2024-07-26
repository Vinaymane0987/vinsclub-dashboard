import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from './store/actions';
import { UserResponseInterface } from './types/users.interface';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { selectError, selectUsers } from './store/reducer';
import { CommonModule, NgIf } from '@angular/common';
import { UserComponent } from './user/user.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf, CommonModule, UserComponent, TopbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users$: Observable<UserResponseInterface[]>;
  error$: Observable<string | null>;
  filteredUsers = signal<UserResponseInterface[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');

  onSearchTermChange(searchTerm$: BehaviorSubject<string>) {
    searchTerm$.pipe(debounceTime(300)).subscribe((term) => {
      this.filterUser(term);
    });
  }

  filterUser(term: string) {
    // Subscribe to users$ to get the latest user data
    this.users$.subscribe((users) => {
      if (term.trim() === '') {
        // If the search term is empty, show all users
        this.filteredUsers.set(users);
      } else {
        // Filter users based on the search term
        const filtered = users.filter((user) =>
          user.name.toLowerCase().includes(term.toLowerCase())
        );
        this.filteredUsers.set(filtered); // Update the filtered users signal
      }
    });
  }

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.users$.subscribe((users) => this.filteredUsers.set(users));
  }
}
