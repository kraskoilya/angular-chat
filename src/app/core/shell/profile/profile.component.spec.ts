// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserService } from '../../services/user.service';
// import { ProfileComponent } from './profile.component';

// describe('ProfileComponent', () => {
//   let component: ProfileComponent;
//   let fixture: ComponentFixture<ProfileComponent>;
//   let MockUserService: Partial<UserService>;

//   let mockUser = {
//     name: 'krasko ilya',
//     first_name: 'ilya',
//     last_name: 'krasko',
//     avatar: '',
//     createdAt: '11.11.11',
//     updatedAt: '',
//     email: 'email@email.com',
//     id: 1,
//     update() {},
//   };

//   MockUserService = {
//     user: {
//       name: 'krasko ilya',
//       first_name: 'ilya',
//       last_name: 'krasko',
//       avatar: '',
//       createdAt: '11.11.11',
//       updatedAt: '',
//       email: 'email@email.com',
//       id: 1,

//       update() {},
//     },
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ProfileComponent],
//       providers: [
//         {
//           provide: UserService,
//           useValue: MockUserService,
//         },
//       ],
//     }).compileComponents();
//     MockUserService = TestBed.inject(UserService);
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create component', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`should have user`, () => {
//     component = fixture.componentInstance;
//     expect(component.user).toEqual(mockUser);
//   });
// });
