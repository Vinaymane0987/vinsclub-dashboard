import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  searchTerm$ = new BehaviorSubject<string>('');
  @Output() inputValue: EventEmitter<BehaviorSubject<string>> =
    new EventEmitter<BehaviorSubject<string>>();
  searchTerm: string = '';

  onSearch(): void {
    this.searchTerm$.next(this.searchTerm);
    this.inputValue.emit(this.searchTerm$); // Emit the new search term
  }
}
