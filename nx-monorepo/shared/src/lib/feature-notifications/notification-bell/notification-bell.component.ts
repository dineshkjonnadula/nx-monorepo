import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '@my-workspace/shared';
import { Notification } from '@my-workspace/shared';
import { timeAgo } from '@my-workspace/shared';

@Component({
  selector: 'lib-notification-bell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bell-wrapper">
      <button class="bell-btn" (click)="togglePanel()" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span *ngIf="unreadCount() > 0" class="badge">{{ unreadCount() }}</span>
      </button>
      <div *ngIf="panelOpen()" class="notif-panel">
        <div class="panel-header">
          <span class="panel-title">Notifications</span>
          <button *ngIf="unreadCount() > 0" class="mark-all-btn" (click)="markAllRead()">Mark all read</button>
        </div>
        <div *ngIf="notifications().length === 0" class="empty-state">No notifications yet</div>
        <ul class="notif-list">
          <li *ngFor="let n of notifications()"
            [class]="'notif-item ' + (n.read ? 'read' : 'unread')"
            (click)="markRead(n)">
            <span [class]="'notif-dot dot-' + n.type"></span>
            <div class="notif-content">
              <p class="notif-title">{{ n.title }}</p>
              <p class="notif-msg">{{ n.message }}</p>
              <span class="notif-time">{{ timeAgo(n.createdAt) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .bell-wrapper { position:relative; }
    .bell-btn     { background:none;border:none;cursor:pointer;color:#64748b;padding:8px;border-radius:8px;position:relative;display:flex; }
    .bell-btn:hover { background:#f1f5f9;color:#334155; }
    .badge        { position:absolute;top:4px;right:4px;background:#ef4444;color:#fff;font-size:10px;font-weight:700;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 3px; }
    .notif-panel  { position:absolute;right:0;top:calc(100% + 8px);width:340px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 10px 25px -5px rgba(0,0,0,.12);z-index:100;overflow:hidden; }
    .panel-header { display:flex;align-items:center;justify-content:space-between;padding:16px 16px 12px;border-bottom:1px solid #f1f5f9; }
    .panel-title  { font-weight:600;font-size:14px;color:#0f172a; }
    .mark-all-btn { background:none;border:none;cursor:pointer;font-size:12px;color:#3b82f6;padding:0; }
    .empty-state  { padding:32px 16px;text-align:center;color:#94a3b8;font-size:13px; }
    .notif-list   { list-style:none;margin:0;padding:0;max-height:340px;overflow-y:auto; }
    .notif-item   { display:flex;gap:10px;padding:12px 16px;cursor:pointer;transition:background .1s; }
    .notif-item:hover { background:#f8fafc; }
    .notif-item.unread { background:#f0f7ff; }
    .notif-dot    { width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px; }
    .dot-info    { background:#3b82f6; } .dot-success { background:#22c55e; }
    .dot-warning { background:#f59e0b; } .dot-error   { background:#ef4444; }
    .notif-content { flex:1;min-width:0; }
    .notif-title  { margin:0 0 2px;font-size:13px;font-weight:600;color:#0f172a; }
    .notif-msg    { margin:0 0 4px;font-size:12px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
    .notif-time   { font-size:11px;color:#94a3b8; }
  `]
})
export class NotificationBellComponent implements OnInit {
  private svc = inject(NotificationsService);

  notifications = signal<Notification[]>([]);
  unreadCount = signal(0);
  panelOpen = signal(false);
  timeAgo = timeAgo;

  ngOnInit() {
    this.svc.notifications$.subscribe(list => {
      this.notifications.set(list);
      this.unreadCount.set(list.filter(n => !n.read).length);
    });
    this.svc.getAll().subscribe();
  }

  togglePanel() { this.panelOpen.update(v => !v); }
  markRead(n: Notification) { if (!n.read) this.svc.markAsRead(n.id).subscribe(); }
  markAllRead() { this.svc.markAllAsRead().subscribe(); }
}
