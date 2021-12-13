import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ChatsService } from 'src/app/chat/services/chats.service';
import { MessagesService } from 'src/app/chat/services/messages.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit, AfterViewInit {
  @ViewChild('inputMessage') inputMessage!: ElementRef;
  @ViewChild('chatBlock') chatBlock!: ElementRef;

  message: FormControl = this.fb.control(null);

  constructor(
    private fb: FormBuilder,
    private crudService: MessagesService,
    private chatsService: ChatsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const el = this.inputMessage.nativeElement;
    this.message.setValue(null, { emitEvent: false });
    el.focus();
  }

  triggerFunction(event: KeyboardEvent): void {
    if (
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      event.key === 'Enter'
    ) {
      event.preventDefault();
      this.send();
    }
  }

  send() {
    if (this.message.value) {
      const body = { message: this.message.value } as any;

      this.crudService.createItem(body).subscribe((res) => {
        this.socketService.emit('send_message', body.message);
        this.message.setValue(null, { emitEvent: false });
      });
    }
  }
}
