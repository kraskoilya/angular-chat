import { User } from 'src/app/core/models/user';
import { BaseItem } from 'src/app/shared/base/base-item';

export class Chat extends BaseItem {
  title!: string;
  unread_messages_count!: number;
  users!: User[];
  created_by!: User;
  avatar?: string;
  last_message?: any;

  constructor(data: Partial<Chat>) {
    super(data);

    if (Array.isArray(data.users)) {
      this.users = data.users.map((el) => new User(el));
    }

    if (data.created_by) {
      this.created_by = new User(data.created_by);
    }
  }
}
