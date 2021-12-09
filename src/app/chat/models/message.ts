import { User } from 'src/app/core/models/user';
import { BaseItem } from 'src/app/shared/base/base-item';

export class MessageList extends BaseItem {
  data!: Message[];
  count!: number;
}

export class Message extends BaseItem {
  message!: string;
  was_edited!: boolean;
  user!: User;

  constructor(data: Partial<Message>) {
    super(data);

    if (data.user) {
      this.user = new User(data.user);
    }
  }
}
