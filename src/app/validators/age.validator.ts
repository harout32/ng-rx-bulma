import { AbstractControl } from '@angular/forms';

const errorMessage = 'invalidAge';
export function ValidAge(control: AbstractControl) {
  if (control.value !== '') {
    if (Number.isNaN(+control.value)) {
      return { validAge: errorMessage };
    }
    if (control.value < 18 || control.value > 65) {
      return { validAge: errorMessage };
    }
  }
  return null;
}
