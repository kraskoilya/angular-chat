import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import {
  focusFirstInvalidField,
  markFormDirty,
  MustMatch,
  triggerFormValidation,
} from '../../helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  errorMessage!: string[] | null;

  get appRoutes() {
    return appRoutes;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initilizationForm();
  }

  send(): void {
    this.errorMessage = null;
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (this.form.invalid) {
      triggerFormValidation(this.form);
      focusFirstInvalidField();
      markFormDirty(this.form);
      return;
    }

    const body = { ...this.form.value };

    this.authService.register(body, this.form).subscribe(
      (res) => {
        this.router.navigate([this.appRoutes.LOGIN]);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    );
  }

  private initilizationForm(): void {
    const password = this.fb.control(null, [
      Validators.required,
      Validators.minLength(8),
    ]);
    const password_confirmation = this.fb.control(null, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.form = this.fb.group(
      {
        first_name: [null, [Validators.required, Validators.maxLength(32)]],
        last_name: [null, [Validators.required, Validators.maxLength(32)]],
        password,
        password_confirmation,
        email: [null, [Validators.required, Validators.email]],
      },
      {
        validators: MustMatch(password, password_confirmation),
      }
    );

    this.form.valueChanges.subscribe((res) => {
      this.errorMessage = null;
    });
  }
}
