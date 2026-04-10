import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { APP_ENVIRONMENT } from '@my-workspace/shared/environments';
import { Notification, ApiResponse } from '@my-workspace/shared/models';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private http = inject(HttpClient);
  private env = inject(APP_ENVIRONMENT);

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  get unreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  getAll(): Observable<ApiResponse<Notification[]>> {
    return this.http
      .get<ApiResponse<Notification[]>>(`${this.env.apiBaseUrl}/notifications`)
      .pipe(tap(res => this.notificationsSubject.next(res.data)));
  }

  markAsRead(id: string): Observable<ApiResponse<Notification>> {
    return this.http
      .patch<ApiResponse<Notification>>(`${this.env.apiBaseUrl}/notifications/${id}/read`, {})
      .pipe(
        tap(() => {
          const updated = this.notificationsSubject.value.map(n =>
            n.id === id ? { ...n, read: true } : n
          );
          this.notificationsSubject.next(updated);
        })
      );
  }

  markAllAsRead(): Observable<void> {
    return this.http
      .patch<void>(`${this.env.apiBaseUrl}/notifications/read-all`, {})
      .pipe(
        tap(() => {
          const updated = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
          this.notificationsSubject.next(updated);
        })
      );
  }
}
