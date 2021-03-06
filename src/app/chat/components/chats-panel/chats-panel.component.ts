import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { createHttpParams } from 'src/app/core/helpers';
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

  constructor(
    private crudService: ChatsService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
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
