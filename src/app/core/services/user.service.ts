import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService?.isAuthorized$?.subscribe((res) => {
      if (res) {
        this.self().subscribe();
      }
    });
  }

  self(): Observable<User> {
    return this.http.get<User>('users/self').pipe(
      tap((el) => {
        this.user = new User(el);
        return el;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('users').pipe(
      map((el) => {
        return el.map((item) => new User(item));
      })
    );
  }
}
