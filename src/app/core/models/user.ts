export class User {
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  createdAt!: string;
  updatedAt!: string;
  avatar?: string;

  get name(): string {
    return this.first_name + ' ' + this.last_name;
  }

  constructor(data: Partial<User>) {
    this.update(data);
  }

  update(data: Partial<User>): void {
    Object.assign(this, data);
  }
}
