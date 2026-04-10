import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, ButtonComponent } from '@my-workspace/shared';

interface SettingSection { id: string; label: string; icon: string; }

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="settings-layout">
      <nav class="settings-nav">
        <h2 class="nav-title">Settings</h2>
        <ul class="nav-list">
          <li *ngFor="let s of sections"
            [class]="'nav-item ' + (activeSection() === s.id ? 'active' : '')"
            (click)="activeSection.set(s.id)">
            <span class="nav-icon">{{ s.icon }}</span>{{ s.label }}
          </li>
        </ul>
      </nav>

      <div class="settings-content">

        <ng-container *ngIf="activeSection() === 'profile'">
          <lib-card title="Profile" subtitle="Update your personal information">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">First name</label>
                <input class="form-input" [(ngModel)]="profile.firstName" />
              </div>
              <div class="form-group">
                <label class="form-label">Last name</label>
                <input class="form-input" [(ngModel)]="profile.lastName" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Email</label>
                <input class="form-input" type="email" [(ngModel)]="profile.email" />
              </div>
            </div>
            <div class="form-actions">
              <lib-button (onClick)="saveProfile()">Save changes</lib-button>
              <lib-button variant="secondary" (onClick)="resetProfile()">Reset</lib-button>
            </div>
          </lib-card>
        </ng-container>

        <ng-container *ngIf="activeSection() === 'notifications'">
          <lib-card title="Notification preferences" subtitle="Choose what you want to be notified about">
            <div class="toggle-list">
              <div *ngFor="let pref of notifPrefs" class="toggle-row">
                <div>
                  <p class="toggle-label">{{ pref.label }}</p>
                  <p class="toggle-desc">{{ pref.description }}</p>
                </div>
                <label class="switch">
                  <input type="checkbox" [(ngModel)]="pref.enabled" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            <div class="form-actions">
              <lib-button (onClick)="saveNotifications()">Save preferences</lib-button>
            </div>
          </lib-card>
        </ng-container>

        <ng-container *ngIf="activeSection() === 'security'">
          <lib-card title="Security" subtitle="Manage your password and authentication">
            <div class="form-group">
              <label class="form-label">Current password</label>
              <input class="form-input" type="password" [(ngModel)]="security.current" />
            </div>
            <div class="form-group">
              <label class="form-label">New password</label>
              <input class="form-input" type="password" [(ngModel)]="security.next" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm new password</label>
              <input class="form-input" type="password" [(ngModel)]="security.confirm" />
            </div>
            <div class="form-actions">
              <lib-button (onClick)="changePassword()">Update password</lib-button>
            </div>
          </lib-card>
        </ng-container>

      </div>
    </div>
  `,
  styles: [`
    .settings-layout { display:flex;gap:0;min-height:calc(100vh - 56px); }
    .settings-nav    { width:220px;flex-shrink:0;background:#fff;border-right:1px solid #e2e8f0;padding:28px 16px; }
    .nav-title       { margin:0 0 16px;font-size:13px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;padding:0 8px; }
    .nav-list        { list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px; }
    .nav-item        { display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:14px;color:#475569;transition:all .12s; }
    .nav-item:hover  { background:#f1f5f9;color:#0f172a; }
    .nav-item.active { background:#eff6ff;color:#1d4ed8;font-weight:500; }
    .nav-icon        { font-size:16px; }
    .settings-content { flex:1;padding:32px;max-width:680px; }
    .form-grid       { display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px; }
    .full-width      { grid-column:1 / -1; }
    .form-group      { display:flex;flex-direction:column;gap:6px;margin-bottom:16px; }
    .form-label      { font-size:13px;font-weight:500;color:#374151; }
    .form-input      { padding:9px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;transition:border-color .15s; }
    .form-input:focus { border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15); }
    .form-actions    { display:flex;gap:8px;margin-top:8px; }
    .toggle-list     { display:flex;flex-direction:column;gap:0;margin-bottom:20px; }
    .toggle-row      { display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid #f1f5f9; }
    .toggle-label    { margin:0 0 2px;font-size:14px;font-weight:500;color:#0f172a; }
    .toggle-desc     { margin:0;font-size:12px;color:#94a3b8; }
    .switch          { position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0; }
    .switch input    { opacity:0;width:0;height:0; }
    .slider          { position:absolute;inset:0;background:#cbd5e1;border-radius:11px;cursor:pointer;transition:background .2s; }
    .slider::before  { content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform .2s; }
    input:checked + .slider           { background:#3b82f6; }
    input:checked + .slider::before   { transform:translateX(18px); }
  `]
})
export class SettingsComponent {
  activeSection = signal('profile');

  sections: SettingSection[] = [
    { id: 'profile',       label: 'Profile',       icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security',      label: 'Security',      icon: '🔒' }
  ];

  profile = { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' };
  security = { current: '', next: '', confirm: '' };

  notifPrefs = [
    { label: 'Email alerts',        description: 'Receive alerts by email',           enabled: true  },
    { label: 'Push notifications',  description: 'Browser push notifications',        enabled: false },
    { label: 'Weekly digest',       description: 'Summary of activity every Monday',  enabled: true  },
    { label: 'Security alerts',     description: 'Notify on login from new device',   enabled: true  }
  ];

  saveProfile()       { alert('Profile saved!'); }
  resetProfile()      { this.profile = { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }; }
  saveNotifications() { alert('Notification preferences saved!'); }
  changePassword() {
    if (this.security.next !== this.security.confirm) { alert('Passwords do not match.'); return; }
    alert('Password updated!');
    this.security = { current: '', next: '', confirm: '' };
  }
}
