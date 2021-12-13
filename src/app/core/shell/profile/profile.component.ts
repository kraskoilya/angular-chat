import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  get user(): User {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
