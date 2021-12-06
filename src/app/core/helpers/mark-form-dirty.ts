import { FormArray, FormGroup } from '@angular/forms';

export function markFormDirty(form: FormGroup): void {
  for (const [key, value] of Object.entries(form.controls)) {
    if (value instanceof FormArray) {
      value.controls.forEach(control => {
        markFormDirty(control as FormGroup);
      });
    }

    if (!value.dirty) {
      value.markAsDirty();
      value.updateValueAndValidity();
    }
  }
}
