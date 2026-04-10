import { Routes } from '@angular/router';
import { authGuard, AUTH_ROUTES } from '@my-workspace/shared';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => Promise.resolve(AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./feature-dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          )
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./feature-reports/reports.component').then(
            (m) => m.ReportsComponent
          )
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
