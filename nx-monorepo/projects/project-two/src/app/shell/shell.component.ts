import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '@my-workspace/shared';
import { NotificationBellComponent } from '@my-workspace/shared';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NotificationBellComponent
  ],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="logo-mark">P2</span>
          <span class="logo-text">Admin Console</span>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/analytics" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">📊</span> Analytics
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">⚙️</span> Settings
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="user-chip">
            <span class="user-avatar">{{ initials() }}</span>
            <div class="user-info">
              <span class="user-name">{{ userName() }}</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
          <button class="logout-btn" (click)="logout()" title="Sign out">
            ↩
          </button>
        </div>
      </aside>

      <div class="main-area">
        <header class="topbar">
          <lib-notification-bell />
        </header>
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .shell {
        display: flex;
        height: 100vh;
        overflow: hidden;
      }
      .sidebar {
        width: 220px;
        flex-shrink: 0;
        background: #0f172a;
        display: flex;
        flex-direction: column;
      }
      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .logo-mark {
        width: 32px;
        height: 32px;
        background: #3b82f6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .logo-text {
        font-size: 14px;
        font-weight: 600;
        color: #f1f5f9;
      }
      .sidebar-nav {
        flex: 1;
        padding: 16px 10px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .nav-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 12px;
        border-radius: 8px;
        font-size: 14px;
        color: #94a3b8;
        text-decoration: none;
        transition: all 0.12s;
      }
      .nav-link:hover {
        background: rgba(255, 255, 255, 0.06);
        color: #e2e8f0;
      }
      .nav-link.active {
        background: rgba(59, 130, 246, 0.2);
        color: #60a5fa;
      }
      .nav-icon {
        font-size: 16px;
      }
      .sidebar-footer {
        padding: 12px 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .user-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }
      .user-avatar {
        width: 30px;
        height: 30px;
        background: #334155;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        color: #94a3b8;
        flex-shrink: 0;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .user-name {
        font-size: 12px;
        font-weight: 600;
        color: #e2e8f0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-role {
        font-size: 10px;
        color: #64748b;
      }
      .logout-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #64748b;
        font-size: 16px;
        padding: 4px;
        border-radius: 4px;
      }
      .logout-btn:hover {
        color: #ef4444;
      }
      .main-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #f8fafc;
      }
      .topbar {
        height: 56px;
        background: #fff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 24px;
        flex-shrink: 0;
      }
      .content {
        flex: 1;
        overflow-y: auto;
      }
    `
  ]
})
export class ShellComponent {
  private auth = inject(AuthService);
  initials = signal('JS');
  userName = signal('Jane Smith');

  logout() {
    this.auth.logout();
  }
}
