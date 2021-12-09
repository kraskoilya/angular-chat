import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/chat/models/chat';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input() item!: Chat;

  get activeChatId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
