import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createHttpParams } from 'src/app/core/helpers';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Message } from '../../models/message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.scss'],
})
export class MessagesPanelComponent implements OnInit {
  get items(): Message[] {
    return this.crudService.storage.items as any;
  }

  get self(): User {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private crudService: MessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      if (res.id) {
        if (this.crudService.storage.items) {
          this.crudService.storage.flashAllData();
        }
        this.crudService.url = `chats/${res.id}/messages`;
        this.getItems();
      }
    });
  }

  private getItems(params?: { [key: string]: any }): void {
    const httpParams = createHttpParams(params);
    this.crudService.getItems(httpParams).subscribe(() => {
      console.log(this.items);
    });
  }
}
