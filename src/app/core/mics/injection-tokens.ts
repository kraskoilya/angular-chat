import { InjectionToken } from '@angular/core';

export const AUTH_TOKEN_STORAGE_KEY = new InjectionToken<string>(
  'app.authTokenStorageKey.token'
);
