import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.hasToken) {
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          this.authService.tokenWithType
        ),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
