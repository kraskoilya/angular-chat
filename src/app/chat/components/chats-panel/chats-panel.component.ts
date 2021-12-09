import { Component, OnInit } from '@angular/core';
import { createHttpParams } from 'src/app/core/helpers';
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

  constructor(private crudService: ChatsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(params?: { [key: string]: any }): void {
    const httpParams = createHttpParams(params);
    this.crudService.getItems(httpParams).subscribe(() => {});
  }
}
