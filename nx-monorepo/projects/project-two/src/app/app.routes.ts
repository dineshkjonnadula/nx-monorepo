import { Routes } from '@angular/router';
import { authGuard, AUTH_ROUTES } from '@my-workspace/shared/feature-auth';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => Promise.resolve(AUTH_ROUTES)
  },
  {
    path: '',
    loadComponent: () =>
      import('./shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'analytics',
        loadComponent: () =>
          import('./feature-analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./feature-settings/settings.component').then(m => m.SettingsComponent)
      },
      { path: '', redirectTo: 'analytics', pathMatch: 'full' }
    ]
  }
];
