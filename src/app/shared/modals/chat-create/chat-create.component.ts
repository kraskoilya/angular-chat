import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ChatsService } from 'src/app/chat/services/chats.service';
import {
  focusFirstInvalidField,
  markFormDirty,
  triggerFormValidation,
} from 'src/app/core/helpers';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.scss'],
})
export class ChatCreateComponent implements OnInit {
  form!: FormGroup;

  errorMessage!: string | null;

  constructor(
    private fb: FormBuilder,
    private chatsService: ChatsService,
    private modal: NzModalRef
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

    console.log(this.form);

    if (this.form.invalid) {
      triggerFormValidation(this.form);
      focusFirstInvalidField();
      markFormDirty(this.form);
      return;
    }

    const body = { ...this.form.value };

    this.chatsService.createItem(body, this.form).subscribe(
      (res) => {},
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
      title: [null, Validators.required],
      // password: [null, Validators.required],
    });

    this.form.valueChanges.subscribe((res) => {
      this.errorMessage = null;
    });
  }
}
