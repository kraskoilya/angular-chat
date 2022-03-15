import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { ChatsService } from 'src/app/chat/services/chats.service';
import { AUTH_TOKEN_STORAGE_KEY } from 'src/app/core/mics/injection-tokens';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { NzModulesModule } from '../../nz-modules/nz-modules.module';
import { ChatCreateComponent } from './chat-create.component';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'email1@email.com',
    first_name: 'Ilya',
    last_name: 'Krasko',
    createdAt: '',
    updatedAt: '',
    name: 'Ilya Krasko',

    update() {},
  },
  {
    id: '2',
    email: 'email@email.com',
    first_name: 'Ilya',
    last_name: 'Krasko',
    createdAt: '',
    updatedAt: '',
    name: 'Ilya Krasko',

    update() {},
  },
];

describe('ChatCreateComponent', () => {
  let component: ChatCreateComponent;
  let fixture: ComponentFixture<ChatCreateComponent>;
  let fb: FormBuilder;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
  userServiceSpy.getUsers.and.returnValue(of(mockUsers));

  let chatsServiceSpy = jasmine.createSpyObj('ChatsService', ['createItem']);
  chatsServiceSpy.createItem.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NzModulesModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ChatCreateComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ChatsService, useValue: chatsServiceSpy },
        FormBuilder,
        {
          provide: NzModalRef,
          useFactory: (modalSvc: NzModalService) =>
            modalSvc.create({
              nzClosable: false,
              nzContent: ChatCreateComponent,
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
        set: { entryComponents: [ChatCreateComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCreateComponent);
    component = fixture.componentInstance;

    fb = TestBed.inject(FormBuilder);

    component.form = fb.group({
      title: [null, Validators.required],
      users: [null, Validators.required],
    });

    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getUsers to create chat', () => {
    expect(userServiceSpy.getUsers).toHaveBeenCalled();

    expect(component.users?.length).toBe(2);
  });

  it('should be valid if form value is VALID', () => {
    component.form.setValue({
      title: 'Ilya',
      users: mockUsers,
    });

    expect(component.form.valid).toEqual(true);
  });

  it('should be valid if form value is INVALID', () => {
    component.form.setValue({
      title: 'Ilya',
      users: null,
    });

    expect(component.form.invalid).toEqual(true);
  });

  it('should allow chat to create', () => {
    const formData = {
      title: 'Ilya',
      users: mockUsers.map((el) => el.id),
    };
    component.form.setValue(formData);
    expect(component.form.errors).toBeNull();
    expect(component.form.valid).toEqual(true);

    component.send();

    const body = {
      ...formData,
      users: formData.users.map((el) => {
        return {
          id: el,
        };
      }),
    };

    expect(chatsServiceSpy.createItem).toHaveBeenCalledWith(
      body,
      component.form
    );
    expect(component.errorMessage).toBeNull();
  });
});
