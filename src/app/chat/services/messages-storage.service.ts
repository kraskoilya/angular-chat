import { Injectable } from '@angular/core';
import { BaseStorage } from 'src/app/shared/base/base-storage';
import { MessageList } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessagesStorageService extends BaseStorage<MessageList> {}
