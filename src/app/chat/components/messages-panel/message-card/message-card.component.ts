import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/chat/models/message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
})
export class MessageCardComponent implements OnInit {
  @Input() item!: Message;

  constructor() {}

  ngOnInit(): void {}
}
