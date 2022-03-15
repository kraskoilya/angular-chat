import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModulesModule } from 'src/app/shared/nz-modules/nz-modules.module';
import { AUTH_TOKEN_STORAGE_KEY } from '../../mics/injection-tokens';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const mockUser = {
    id: '1',
    name: 'krasko ilya',
    first_name: 'ilya',
    last_name: 'krasko',
    avatar: '',
    createdAt: '11.11.11',
    updatedAt: '',
    email: 'email@email.com',
    update() {},
  };

  let userServiceSpy = jasmine.createSpyObj('UserService', ['user']);

  let authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
  authServiceSpy.logout.and.returnValue();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NzModulesModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NzDropDownModule,
      ],
      declarations: [ProfileComponent],
      providers: [
        NzModalService,
        AuthService,
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        {
          provide: AUTH_TOKEN_STORAGE_KEY,
          useValue: 'my_test_chat',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    userServiceSpy.user = mockUser;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have user`, fakeAsync((done: DoneFn) => {
    tick();
    expect(component.user).toEqual(mockUser);
  }));

  it('should open "Update information" modal', () => {
    expect(component).toBeTruthy();
  });

  it(`should logout user`, fakeAsync((done: DoneFn) => {
    authServiceSpy.logout();
    tick();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(authServiceSpy.logout.calls.count()).toBe(1);
  }));
});
