import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { APP_ENVIRONMENT } from '@my-workspace/shared/environments';
import { AuthUser, User } from '@my-workspace/shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private env = inject(APP_ENVIRONMENT);

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${this.env.apiBaseUrl}/auth/login`, { email, password })
      .pipe(
        tap(user => {
          localStorage.setItem(this.env.authTokenKey, user.token);
          this.currentUserSubject.next(user);
        }),
        catchError(err => throwError(() => err))
      );
  }

  logout(): void {
    localStorage.removeItem(this.env.authTokenKey);
    this.currentUserSubject.next(null);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.env.apiBaseUrl}/auth/profile`);
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.env.apiBaseUrl}/auth/refresh`, {})
      .pipe(
        tap(({ token }) => {
          const user = this.currentUserSubject.value;
          if (user) {
            this.currentUserSubject.next({ ...user, token });
            localStorage.setItem(this.env.authTokenKey, token);
          }
        })
      );
  }
}
