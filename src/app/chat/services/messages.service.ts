import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base/base-service.service';
import { Message, MessageList } from '../models/message';
import { MessagesStorageService } from './messages-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService extends BaseService<MessageList> {
  url = '';
  model = Message;
  storage: MessagesStorageService = new MessagesStorageService();
}
