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
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.scss'],
})
export class ChatCreateComponent implements OnInit {
  form!: FormGroup;
  users!: User[];

  errorMessage!: string | null;

  constructor(
    private fb: FormBuilder,
    private chatsService: ChatsService,
    private modal: NzModalRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
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

    body.users = body.users
      ? body.users.map((id: number) => {
          return {
            id: id,
          };
        })
      : [];

    this.chatsService.createItem(body, this.form).subscribe(
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
      title: [null, Validators.required],
      users: [null, Validators.required],
      // password: [null, Validators.required],
    });

    this.form.valueChanges.subscribe((res) => {
      this.errorMessage = null;
    });
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.initilizationForm();
    });
  }
}
