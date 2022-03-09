import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { createHttpParams } from 'src/app/core/helpers';
import { User } from 'src/app/core/models/user';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { Message } from '../../models/message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.scss'],
})
export class MessagesPanelComponent implements OnInit, OnDestroy {
  get items(): Message[] {
    return this.crudService.storage.items as any;
  }

  get self(): User {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private crudService: MessagesService,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {}

  ngOnDestroy(): void {
    this.crudService.storage.flashAllData();
  }

  ngOnInit(): void {
    this.socketService
      .on('send_message')
      .pipe(filter((data: any) => data.data.user.id !== this.self.id))
      .subscribe((data: any) => {
        this.items.unshift({
          ...data.data.message,
          user: new User(data.data.user),
        });
      });

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
    this.crudService.getItems(httpParams).subscribe(() => {});
  }
}
