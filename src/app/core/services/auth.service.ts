import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { httpErrorResponceHandler } from '../helpers';
import { AUTH_TOKEN_STORAGE_KEY } from '../mics/injection-tokens';
import { AccessData } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = 'auth';
  isAuthorized$!: BehaviorSubject<boolean>;

  private readonly tokenType = 'Bearer';
  private interruptedUrl!: string;

  get token(): string {
    return (
      localStorage.getItem(this.storageKey) ||
      sessionStorage.getItem(this.storageKey) ||
      ''
    );
  }

  get tokenWithType(): string {
    return this.token ? `${this.tokenType} ${this.token}` : '';
  }

  get hasToken(): boolean {
    return !!this.token;
  }

  constructor(
    @Inject(AUTH_TOKEN_STORAGE_KEY) private storageKey: string,
    private http: HttpClient,
    private router: Router
  ) {
    this.isAuthorized$ = new BehaviorSubject<boolean>(this.hasToken);
  }

  /**
   * @description Update auth data manually
   */
  updateData(res: AccessData): void {
    this.saveToken(res.access_token);
    this.isAuthorized$.next(true);
  }

  /**
   * @description Update auth token manually
   */
  updateToken(token: string, notify?: boolean): void {
    this.saveToken(token);

    if (notify) {
      this.isAuthorized$.next(true);
    }
  }

  /**
   * @description Save token in the storage
   */
  saveToken(token: string, rememberMe = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.storageKey, token);
  }

  /**
   * @description Remove token from storages
   */
  clearToken(): void {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

  // ngx-auth methods

  isAuthorized(): Observable<boolean> {
    return of(this.hasToken);
  }

  getInterruptedUrl(): string {
    return this.interruptedUrl;
  }

  setInterruptedUrl(url: string): void {
    this.interruptedUrl = url;
  }

  login(params: HttpParams, form: FormGroup): Observable<any> {
    return this.http.post(`${this.URL}/login`, params).pipe(
      tap((res: any) => this.updateData(res)),
      catchError((err) => {
        return httpErrorResponceHandler(err, form);
      })
    );
  }

  register(params: HttpParams, form: FormGroup): Observable<any> {
    return this.http.post(`${this.URL}/registration`, params).pipe(
      catchError((err) => {
        return httpErrorResponceHandler(err, form);
      })
    );
  }
}
