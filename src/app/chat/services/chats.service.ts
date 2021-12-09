import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base/base-service.service';
import { Chat } from '../models/chat';
import { ChatsStorageService } from './chats-storage.service';

@Injectable()
export class ChatsService extends BaseService<Chat> {
  url = 'chats';
  model = Chat;
  storage: ChatsStorageService = new ChatsStorageService();
}
