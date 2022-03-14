import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { AUTH_TOKEN_STORAGE_KEY } from 'src/app/core/mics/injection-tokens';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { NzModulesModule } from '../../nz-modules/nz-modules.module';
import { UserUpdateComponent } from './user-update.component';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let fb: FormBuilder;

  const mockUser: User = {
    id: '1',
    email: 'email1@email.com',
    first_name: 'Ilya',
    last_name: 'Krasko',
    createdAt: '',
    updatedAt: '',
    name: 'Ilya Krasko',

    update() {},
  };

  let userServiceSpy = jasmine.createSpyObj('UserService', ['update']);
  userServiceSpy.update.and.returnValue(of(mockUser));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NzModulesModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [UserUpdateComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        FormBuilder,
        {
          provide: NzModalRef,
          useFactory: (modalSvc: NzModalService) =>
            modalSvc.create({
              nzClosable: false,
              nzContent: UserUpdateComponent,
            }),
          deps: [NzModalService],
        },
        {
          provide: AUTH_TOKEN_STORAGE_KEY,
          useValue: 'my_test_chat',
        },
      ],
    })
      .overrideModule(BrowserTestingModule, {
        set: { entryComponents: [UserUpdateComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    component.form = fb.group({
      first_name: [null, [Validators.required, Validators.maxLength(32)]],
      last_name: [null, [Validators.required, Validators.maxLength(32)]],
      email: [null, [Validators.required, Validators.email]],
    });

    component.item = mockUser;

    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept values', () => {
    let pastebin: User = mockUser;

    expect(pastebin.id).toEqual('1');
    expect(pastebin.email).toEqual('email1@email.com');
  });

  it('should be valid if form value is VALID', () => {
    component.form.setValue({
      first_name: 'Ilya',
      last_name: 'Krasko',
      email: 'email1@email.com',
    });

    expect(component.form.valid).toEqual(true);
  });

  it('should be valid if form value is INVALID', () => {
    component.form.setValue({
      first_name: 'Ilya',
      last_name: 'Krasko',
      email: 'invalidemail',
    });

    expect(component.form.invalid).toEqual(true);
  });

  it('should allow user to update', () => {
    const formData = {
      first_name: 'Ilya',
      last_name: 'Krasko',
      email: 'email1@email.com',
    };

    component.form.setValue(formData);
    expect(component.form.errors).toBeNull();

    component.send();

    expect(userServiceSpy.update).toHaveBeenCalledWith({
      ...formData,
      id: component.item.id,
    });
  });
});
