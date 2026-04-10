import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses">
      <div *ngIf="title || subtitle" class="card-header">
        <h3 *ngIf="title" class="card-title">{{ title }}</h3>
        <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </div>
      <div class="card-body"><ng-content></ng-content></div>
      <div *ngIf="hasFooter" class="card-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
      }
      .card-elevated {
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.07),
          0 2px 4px -2px rgba(0, 0, 0, 0.05);
      }
      .card-header {
        padding: 20px 24px 0;
      }
      .card-title {
        margin: 0 0 4px;
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
      }
      .card-subtitle {
        margin: 0;
        font-size: 13px;
        color: #64748b;
      }
      .card-body {
        padding: 20px 24px;
      }
      .card-footer {
        padding: 16px 24px;
        border-top: 1px solid #f1f5f9;
        background: #f8fafc;
      }
    `
  ]
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() elevated = true;
  @Input() hasFooter = false;

  get cardClasses(): string {
    return `card ${this.elevated ? 'card-elevated' : ''}`;
  }
}
