import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatCardComponent } from './components/chats-panel/chat-card/chat-card.component';
import { ChatsPanelComponent } from './components/chats-panel/chats-panel.component';
import { MessageCardComponent } from './components/messages-panel/message-card/message-card.component';
import { MessageInputComponent } from './components/messages-panel/message-input/message-input.component';
import { MessagesPanelComponent } from './components/messages-panel/messages-panel.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatsPanelComponent,
    MessagesPanelComponent,
    ChatCardComponent,
    MessageCardComponent,
    MessageInputComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
  providers: [DatePipe],
})
export class ChatModule {}
