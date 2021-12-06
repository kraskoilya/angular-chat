import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import {
  focusFirstInvalidField,
  markFormDirty,
  triggerFormValidation,
} from '../../helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  errorMessage!: string | null;

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

    console.log(this.form);

    if (this.form.invalid) {
      triggerFormValidation(this.form);
      focusFirstInvalidField();
      markFormDirty(this.form);
      return;
    }

    const body = { ...this.form.value };

    this.authService.login(body, this.form).subscribe(
      (res) => {
        this.router.navigate([this.appRoutes.CHAT]);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 401) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

  private initilizationForm(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.form.valueChanges.subscribe((res) => {
      this.errorMessage = null;
    });
  }
}
