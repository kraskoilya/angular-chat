export class BaseItem {
  id!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(data: Partial<BaseItem>) {
    Object.assign(this, data);
  }
}
