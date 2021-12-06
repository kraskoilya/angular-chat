import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly ignoredPaths = ['/assets/'];
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.ignoredPaths.some((path) => request.url.startsWith(path))) {
      return next.handle(request);
    }
    if (
      request.url.startsWith('http://') ||
      request.url.startsWith('https://')
    ) {
      // Ignore absolute URL
      return next.handle(request);
    }
    const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
    return next.handle(apiReq);
  }
}
