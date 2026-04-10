import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [class]="buttonClasses" [disabled]="disabled || loading" [type]="type" (click)="onClick.emit($event)">
      <span *ngIf="loading" class="btn-spinner"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button { display:inline-flex;align-items:center;gap:8px;font-weight:500;border-radius:6px;border:1px solid transparent;cursor:pointer;transition:all .15s ease;outline:none; }
    button:disabled { opacity:.5;cursor:not-allowed; }
    .btn-sm { padding:6px 12px;font-size:13px; }
    .btn-md { padding:8px 16px;font-size:14px; }
    .btn-lg { padding:12px 24px;font-size:16px; }
    .btn-primary   { background:#3b82f6;color:#fff;border-color:#3b82f6; }
    .btn-primary:hover:not(:disabled)   { background:#2563eb; }
    .btn-secondary { background:#f1f5f9;color:#334155;border-color:#e2e8f0; }
    .btn-secondary:hover:not(:disabled) { background:#e2e8f0; }
    .btn-danger    { background:#ef4444;color:#fff;border-color:#ef4444; }
    .btn-danger:hover:not(:disabled)    { background:#dc2626; }
    .btn-ghost     { background:transparent;color:#64748b; }
    .btn-ghost:hover:not(:disabled)     { background:#f1f5f9; }
    .btn-spinner { width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite; }
    @keyframes spin { to { transform:rotate(360deg); } }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return `btn-${this.variant} btn-${this.size}`;
  }
}
