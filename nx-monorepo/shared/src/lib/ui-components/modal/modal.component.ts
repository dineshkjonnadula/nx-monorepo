import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="isOpen"
      class="modal-backdrop"
      (click)="onBackdropClick($event)"
    >
      <div [class]="'modal modal-' + size" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ title }}</h2>
            <p *ngIf="subtitle" class="modal-subtitle">{{ subtitle }}</p>
          </div>
          <button class="modal-close" (click)="close.emit()" aria-label="Close">
            ✕
          </button>
        </div>
        <div class="modal-body"><ng-content></ng-content></div>
        <div *ngIf="showFooter" class="modal-footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 16px;
      }
      .modal {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalIn 0.15s ease;
      }
      @keyframes modalIn {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(8px);
        }
      }
      .modal-sm {
        max-width: 400px;
      }
      .modal-md {
        max-width: 560px;
      }
      .modal-lg {
        max-width: 720px;
      }
      .modal-xl {
        max-width: 960px;
      }
      .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 24px 24px 0;
      }
      .modal-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #0f172a;
      }
      .modal-subtitle {
        margin: 4px 0 0;
        font-size: 13px;
        color: #64748b;
      }
      .modal-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #94a3b8;
        font-size: 16px;
        padding: 4px;
        border-radius: 4px;
      }
      .modal-close:hover {
        background: #f1f5f9;
        color: #334155;
      }
      .modal-body {
        padding: 20px 24px;
      }
      .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #f1f5f9;
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
    `
  ]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() size: ModalSize = 'md';
  @Input() showFooter = true;
  @Input() closeOnBackdrop = true;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) this.close.emit();
  }

  onBackdropClick(e: MouseEvent) {
    if (
      this.closeOnBackdrop &&
      (e.target as HTMLElement).classList.contains('modal-backdrop')
    ) {
      this.close.emit();
    }
  }
}
