import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return of({ passwordMismatch: true }); // Use bracket notation for dynamic property
    }

    return of(null);
  };
}
