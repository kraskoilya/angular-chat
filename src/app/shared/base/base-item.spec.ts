import { BaseItem } from './base-item';

describe('BaseItem', () => {
  let mockBaseClass: BaseItem = {
    id: '1',
    createdAt: '11.11.1990',
    updatedAt: '11.11.1990',
  };

  afterEach(() => {
    mockBaseClass = null as never;
  });

  it('should create an instance', () => {
    expect(new BaseItem(mockBaseClass)).toBeTruthy();
  });
});
