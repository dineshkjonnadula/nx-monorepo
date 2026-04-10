import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@my-workspace/shared';
import { ButtonComponent } from '@my-workspace/shared';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Sign in</h1>
        <p class="login-subtitle">
          Welcome back — enter your credentials to continue.
        </p>
        <div *ngIf="errorMsg()" class="login-error">{{ errorMsg() }}</div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            class="form-input"
            type="email"
            [(ngModel)]="email"
            placeholder="you@example.com"
            [disabled]="loading()"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            class="form-input"
            type="password"
            [(ngModel)]="password"
            placeholder="••••••••"
            [disabled]="loading()"
          />
        </div>
        <lib-button
          class="login-btn"
          [loading]="loading()"
          [disabled]="!email || !password"
          (onClick)="onLogin()"
        >
          Sign in
        </lib-button>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8fafc;
        padding: 24px;
      }
      .login-box {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 40px;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }
      .login-title {
        margin: 0 0 4px;
        font-size: 24px;
        font-weight: 700;
        color: #0f172a;
      }
      .login-subtitle {
        margin: 0 0 28px;
        color: #64748b;
        font-size: 14px;
      }
      .login-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        border-radius: 6px;
        padding: 10px 14px;
        font-size: 13px;
        margin-bottom: 16px;
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        color: #374151;
        margin-bottom: 6px;
      }
      .form-input {
        width: 100%;
        box-sizing: border-box;
        padding: 9px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        color: #111827;
        outline: none;
        transition: border-color 0.15s;
      }
      .form-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
      .login-btn {
        width: 100%;
        margin-top: 8px;
        justify-content: center;
      }
    `
  ]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  errorMsg = signal('');

  onLogin() {
    if (!this.email || !this.password) return;
    this.loading.set(true);
    this.errorMsg.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMsg.set(
          err?.error?.message ?? 'Login failed. Please try again.'
        );
        this.loading.set(false);
      }
    });
  }
}
