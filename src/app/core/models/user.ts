import { BaseItem } from 'src/app/shared/base/base-item';

export class User extends BaseItem {
  first_name!: string;
  last_name!: string;
  email!: string;
  avatar?: string;

  get name(): string {
    return this.first_name + ' ' + this.last_name;
  }

  constructor(data: Partial<User>) {
    super(data);
  }

  update(data: Partial<User>): void {
    Object.assign(this, data);
  }
}
