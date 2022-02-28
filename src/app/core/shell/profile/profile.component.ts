import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChatCreateComponent } from 'src/app/shared/modals/chat-create/chat-create.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  get user(): User {
    return this.userService.user;
  }

  constructor(
    private modalService: NzModalService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  createChat(): void {
    this.modalService.create({
      nzTitle: 'Create new chat',
      nzContent: ChatCreateComponent,
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
