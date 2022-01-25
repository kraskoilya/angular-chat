import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User({
      id: '1',
      email: 'email@email.com',
      first_name: 'Ilya',
      last_name: 'Krasko',
      updatedAt: '11.11.1996',
      createdAt: '11.11.1996',
    });

    expect(new User(user)).toBeTruthy();
    expect(user.id).toEqual('1');
    expect(user.email).toEqual('email@email.com');

    const spy = spyOnProperty(user, 'name', 'get').and.returnValue(
      'Ilya Krasko'
    );
    expect(user.name).toBe('Ilya Krasko');
    expect(spy).toHaveBeenCalled();
  });
});
