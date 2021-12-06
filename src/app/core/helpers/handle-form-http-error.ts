import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  AbstractControlDirective,
  FormGroup,
  NgForm,
  ValidationErrors,
} from '@angular/forms';

/* Monkey patch form errors */
Object.defineProperty(AbstractControlDirective.prototype, 'errors', {
  get(): any {
    return this.control ? this.control.errors : null;
  },
  set(value: any): void {
    this.control.errors = value;
  },
});

export function handleFormHttpError(
  form: NgForm | FormGroup,
  error: HttpErrorResponse,
  deletingPart?: string
): void {
  let errors: ValidationErrors = error.error.errors;
  if (!errors) {
    errors = {
      serverError: error.error
        ? error.error.message || error.error.error
        : error.statusText,
    };
  }

  for (let [key, value] of Object.entries(errors)) {
    let control: AbstractControl | null;

    if (deletingPart) {
      key = key.replace(deletingPart, '');
    }

    if (form instanceof FormGroup) {
      control = form.get(key);
    } else if (form instanceof NgForm) {
      control = form.controls[key];
    } else {
      throw new TypeError(
        'handleFormHttpError must be used with a ngForm or formGroup directive'
      );
    }

    if (control) {
      control.setErrors({ serverError: value });
    } else {
      // tslint:disable-next-line: no-string-literal
      if ((form as any)['submitted']) {
        (form as any).errors = null;
      }
      if (!form.errors) {
        if (form instanceof FormGroup) {
          form.setErrors({ serverError: [] });
        }
        if (form instanceof NgForm) {
          (form as any).errors = { serverError: [] };
        }
      }

      (form as any).errors.serverError.push(value);
    }
  }
}
