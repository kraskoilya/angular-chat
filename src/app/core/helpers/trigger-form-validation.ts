import { FormArray, FormControl, FormGroup } from '@angular/forms';

export function triggerFormValidation(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      triggerFormValidation(control);
    } else if (control instanceof FormArray) {
      if ((control as FormArray)?.controls?.length) {
        (control as FormArray).controls.forEach(faControl => {
          if (faControl instanceof FormGroup) {
            triggerFormValidation(faControl);
          } else if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
          }
        });
      }
    }
  });
}
