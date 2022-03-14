import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AUTH_TOKEN_STORAGE_KEY } from '../mics/injection-tokens';
import { LoginComponent } from './../auth/login/login.component';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [
        AuthService,
        {
          provide: AUTH_TOKEN_STORAGE_KEY,
          useValue: 'my_test_chat',
        },
      ],
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login method works correctly', (done) => {
    const dummyFormGroup: FormGroup = new FormGroup({
      login: new FormControl('login'),
      password: new FormControl('password'),
    });

    service
      .login({ ...dummyFormGroup.value }, dummyFormGroup)
      .subscribe((user) => {
        expect(user).toBeTruthy();
        done();
      });

    const req = httpMock.expectOne(`${service.URL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...dummyFormGroup.value });
  });

  it('register method works correctly', (done) => {
    const dummyFormGroup: FormGroup = new FormGroup({
      first_name: new FormControl('first_name'),
      last_name: new FormControl('last_name'),
      password: new FormControl('password'),
      password_confirmation: new FormControl('password_confirmation'),
      email: new FormControl('email'),
    });

    service
      .register({ ...dummyFormGroup.value }, dummyFormGroup)
      .subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.email).toBe('email');
        done();
      });

    const req = httpMock.expectOne(`${service.URL}/registration`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...dummyFormGroup.value });
  });

  it('logout method works correctly', fakeAsync((done: DoneFn) => {
    service.logout();

    const req = httpMock.expectOne(`${service.URL}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(service.token).toBe('');
  }));
});
