import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@my-workspace/shared';
import { CardComponent } from '@my-workspace/shared';
import { NotificationBellComponent } from '@my-workspace/shared';

interface Metric {
  label: string;
  value: string;
  change: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, NotificationBellComponent],
  template: `
    <div class="layout">
      <header class="topbar">
        <div class="topbar-left">
          <span class="app-name">Analytics Portal</span>
          <nav class="topbar-nav">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Dashboard</a>
            <a routerLink="/reports"   routerLinkActive="active" class="nav-link">Reports</a>
          </nav>
        </div>
        <div class="topbar-right">
          <lib-notification-bell />
          <button class="avatar-btn" (click)="logout()">
            {{ initials() }} <span class="logout-hint">Sign out</span>
          </button>
        </div>
      </header>

      <main class="main">
        <div class="page-header">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Welcome back, {{ firstName() }}. Here's what's happening today.</p>
        </div>

        <div class="metrics-grid">
          <lib-card *ngFor="let m of metrics">
            <div class="metric-body">
              <span class="metric-icon">{{ m.icon }}</span>
              <div class="metric-info">
                <span class="metric-label">{{ m.label }}</span>
                <span class="metric-value">{{ m.value }}</span>
              </div>
              <span [class]="'metric-change ' + (m.change >= 0 ? 'pos' : 'neg')">
                {{ m.change >= 0 ? '▲' : '▼' }} {{ m.change | number:'1.1-1' }}%
              </span>
            </div>
          </lib-card>
        </div>

        <lib-card title="Recent Activity" subtitle="Last 7 days">
          <div class="activity-list">
            <div *ngFor="let a of activity" class="activity-row">
              <span class="activity-dot"></span>
              <span class="activity-text">{{ a }}</span>
            </div>
          </div>
        </lib-card>
      </main>
    </div>
  `,
  styles: [`
    .layout    { min-height:100vh;background:#f8fafc; }
    .topbar    { display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:60px;background:#fff;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:10; }
    .topbar-left { display:flex;align-items:center;gap:32px; }
    .app-name  { font-weight:700;font-size:16px;color:#0f172a; }
    .topbar-nav { display:flex;gap:4px; }
    .nav-link  { padding:6px 12px;border-radius:6px;font-size:14px;color:#64748b;text-decoration:none;transition:all .12s; }
    .nav-link:hover { background:#f1f5f9;color:#0f172a; }
    .nav-link.active { background:#eff6ff;color:#1d4ed8;font-weight:500; }
    .topbar-right { display:flex;align-items:center;gap:8px; }
    .avatar-btn { display:flex;align-items:center;gap:8px;background:#f1f5f9;border:none;cursor:pointer;padding:6px 12px;border-radius:8px;font-weight:600;font-size:13px;color:#334155; }
    .logout-hint { font-weight:400;color:#94a3b8;font-size:12px; }
    .main      { padding:32px;max-width:1100px;margin:0 auto; }
    .page-header   { margin-bottom:28px; }
    .page-title    { margin:0 0 4px;font-size:24px;font-weight:700;color:#0f172a; }
    .page-subtitle { margin:0;color:#64748b;font-size:14px; }
    .metrics-grid  { display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-bottom:24px; }
    .metric-body   { display:flex;align-items:center;gap:12px; }
    .metric-icon   { font-size:28px; }
    .metric-info   { display:flex;flex-direction:column;gap:2px; }
    .metric-label  { font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em; }
    .metric-value  { font-size:24px;font-weight:700;color:#0f172a; }
    .metric-change { font-size:12px;font-weight:600;margin-left:auto; }
    .pos { color:#16a34a; } .neg { color:#dc2626; }
    .activity-list { display:flex;flex-direction:column;gap:12px; }
    .activity-row  { display:flex;align-items:center;gap:10px;font-size:13px;color:#475569; }
    .activity-dot  { width:6px;height:6px;border-radius:50%;background:#3b82f6;flex-shrink:0; }
  `]
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);

  firstName = signal('');
  initials = signal('');

  metrics: Metric[] = [
    { label: 'Total Users',     value: '24,512', change: 12.4,  icon: '👥' },
    { label: 'Revenue',         value: '$84.2k', change: 8.1,   icon: '💰' },
    { label: 'Active Sessions', value: '1,340',  change: -3.2,  icon: '📡' },
    { label: 'Conversion',      value: '3.6%',   change: 0.8,   icon: '🎯' }
  ];

  activity = [
    'User alice@example.com signed up',
    'Report "Q1 Summary" was exported',
    'New API key generated for integration',
    'Threshold alert triggered for CPU usage',
    'Scheduled backup completed successfully'
  ];

  ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.firstName.set(user.firstName);
      this.initials.set(`${user.firstName[0]}${user.lastName[0]}`);
    }
  }

  logout() { this.auth.logout(); }
}
