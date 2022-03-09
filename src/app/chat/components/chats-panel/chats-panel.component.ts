import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { createHttpParams } from 'src/app/core/helpers';
import { User } from 'src/app/core/models/user';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChatCreateComponent } from 'src/app/shared/modals/chat-create/chat-create.component';
import { Chat } from '../../models/chat';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-chats-panel',
  templateUrl: './chats-panel.component.html',
  styleUrls: ['./chats-panel.component.scss'],
})
export class ChatsPanelComponent implements OnInit {
  get items(): Chat[] {
    return this.crudService.storage.items;
  }

  get self(): User {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private crudService: ChatsService,
    private modalService: NzModalService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService
      .on('chat_created')
      .pipe(filter((data: any) => data.data.user.id !== this.self.id))
      .subscribe((data: any) => {
        this.items.unshift(data.data.newChat);
      });

    this.getItems();
  }

  createChat(): void {
    this.modalService.create({
      nzTitle: 'Create new chat',
      nzContent: ChatCreateComponent,
    });
  }

  private getItems(params?: { [key: string]: any }): void {
    const httpParams = createHttpParams(params);
    this.crudService.getItems(httpParams).subscribe(() => {});
  }
}
