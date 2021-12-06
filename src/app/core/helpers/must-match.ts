import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(control: FormControl, matchingControl: FormControl): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    if (matchingControl?.errors && !matchingControl?.errors?.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    // set error on matchingControl if validation fails
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mustMatch: true });
      return { mustMatch: true }
    } else {
      matchingControl?.setErrors(null);
      return null
    }
  };
}
