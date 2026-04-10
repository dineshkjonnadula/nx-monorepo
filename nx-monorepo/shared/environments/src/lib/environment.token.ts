import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  production: boolean;
  apiBaseUrl: string;
  appName: string;
  version: string;
  authTokenKey: string;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
