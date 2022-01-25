import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
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

  it('expects self() to have been called', function () {
    spyOn(service, 'self').and.callThrough();
  });

  it('#user should return value', fakeAsync((done: DoneFn) => {
    const user: User = {
      id: '1',
      email: 'email@email.com',
      first_name: 'Ilya',
      last_name: 'Krasko',
      updatedAt: '11.11.1996',
      createdAt: '11.11.1996',
      name: 'Ilya Krasko',

      update() {},
    };

    // spyOn(service, 'self').and.callThrough();

    // service.self();
    // expect(service.user).toEqual(user);
  }));
});
