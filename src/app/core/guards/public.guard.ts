import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { appRoutes } from 'src/app/app.routes';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.hasToken) {
      this.router.navigate([appRoutes.CHAT]);
      return false;
    }
    return true;
  }
}
