import { Injectable } from '@angular/core';
import { BaseStorage } from 'src/app/shared/base/base-storage';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatsStorageService extends BaseStorage<Chat> {}
