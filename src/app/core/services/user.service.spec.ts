import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let fakeAuthService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);
    fakeAuthService = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpMock?.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects self() to have been called', (done: DoneFn) => {
    service.self().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`users/self`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('expect update() to have been called', (done: DoneFn) => {
    const user: Partial<User> = {
      id: '2',
      email: 'email@email.com',
      first_name: 'Ilya',
      last_name: 'Krasko',
    };

    service.update({ ...user }).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.id).toEqual('2');
      done();
    });

    const req = httpMock.expectOne({
      method: 'PATCH',
      url: `users/${user.id}`,
    });
    expect(req.request.method).toBe('PATCH');
    req.flush({ ...user });
  });

  it('expect getUsers() to have been called', (done: DoneFn) => {
    const users: User[] = [
      {
        id: '1',
        email: 'email1@email.com',
        first_name: 'Ilya',
        last_name: 'Krasko',
        name: 'Krasko',
        createdAt: '',
        updatedAt: '',

        update() {},
      },
      {
        id: '2',
        email: 'email@email.com',
        first_name: 'Ilya',
        last_name: 'Krasko',
        name: 'Krasko',
        createdAt: '',
        updatedAt: '',

        update() {},
      },
    ];

    service.getUsers().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res?.length).toBe(0);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `users`,
    });
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
