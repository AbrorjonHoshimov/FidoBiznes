import {AbstractControl} from "@angular/forms";

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && (!control.value.replace(/^\s+|\s+$/g, '').length || !control.value.replace(/\\|\//g, '').length)) {
    control.setValue('');
  }
  return null;
}
