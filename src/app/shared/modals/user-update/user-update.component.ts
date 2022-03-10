import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  focusFirstInvalidField,
  markFormDirty,
  triggerFormValidation,
} from 'src/app/core/helpers';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  @Input() item!: User;

  form!: FormGroup;
  errorMessage!: string | null;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initilizationForm();
  }

  destroyModal(): void {
    this.modal.destroy();
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
    body.id = this.item.id;

    this.userService.update(body).subscribe(
      (res) => {
        this.modal.close();
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
      first_name: [
        this.item?.first_name || null,
        [Validators.required, Validators.maxLength(32)],
      ],
      last_name: [
        this.item?.last_name || null,
        [Validators.required, Validators.maxLength(32)],
      ],
      email: [
        this.item?.email || null,
        [Validators.required, Validators.email],
      ],
    });

    this.form.valueChanges.subscribe((res) => {
      this.errorMessage = null;
    });
  }
}
