import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@my-workspace/shared';
import { formatDate } from '@my-workspace/shared';

interface Report {
  id: string;
  name: string;
  type: string;
  status: 'ready' | 'processing' | 'failed';
  createdAt: Date;
  size: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Reports</h1>
          <p class="page-subtitle">Generate and download your data exports.</p>
        </div>
        <lib-button (onClick)="generateReport()">+ New Report</lib-button>
      </div>

      <lib-card>
        <table class="reports-table">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Status</th><th>Created</th><th>Size</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of reports()">
              <td class="report-name">{{ r.name }}</td>
              <td><span class="badge-type">{{ r.type }}</span></td>
              <td><span [class]="'badge-status status-' + r.status">{{ r.status }}</span></td>
              <td class="muted">{{ formatDate(r.createdAt) }}</td>
              <td class="muted">{{ r.size }}</td>
              <td>
                <lib-button variant="ghost" size="sm" [disabled]="r.status !== 'ready'">Download</lib-button>
              </td>
            </tr>
          </tbody>
        </table>
      </lib-card>
    </div>
  `,
  styles: [`
    .page        { padding:32px;max-width:1100px;margin:0 auto; }
    .page-header { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px; }
    .page-title  { margin:0 0 4px;font-size:24px;font-weight:700;color:#0f172a; }
    .page-subtitle { margin:0;color:#64748b;font-size:14px; }
    .reports-table { width:100%;border-collapse:collapse;font-size:13px; }
    th { text-align:left;padding:8px 12px;color:#64748b;font-weight:500;border-bottom:1px solid #e2e8f0;font-size:12px;text-transform:uppercase;letter-spacing:.04em; }
    td { padding:12px;border-bottom:1px solid #f1f5f9;color:#334155; }
    .report-name { font-weight:500;color:#0f172a; }
    .muted       { color:#94a3b8; }
    .badge-type  { background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500; }
    .badge-status { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600; }
    .status-ready      { background:#dcfce7;color:#15803d; }
    .status-processing { background:#fef9c3;color:#a16207; }
    .status-failed     { background:#fee2e2;color:#b91c1c; }
  `]
})
export class ReportsComponent {
  formatDate = formatDate;

  reports = signal<Report[]>([
    { id: '1', name: 'Q1 2024 Revenue Summary', type: 'Financial', status: 'ready',      createdAt: new Date('2024-04-01'), size: '2.4 MB' },
    { id: '2', name: 'User Cohort Analysis',     type: 'Analytics', status: 'ready',      createdAt: new Date('2024-03-28'), size: '1.1 MB' },
    { id: '3', name: 'Monthly Active Users',     type: 'Analytics', status: 'processing', createdAt: new Date('2024-04-09'), size: '—' },
    { id: '4', name: 'Churn Rate Deep Dive',     type: 'Analytics', status: 'failed',     createdAt: new Date('2024-04-08'), size: '—' },
    { id: '5', name: 'Marketing Campaign ROI',   type: 'Marketing', status: 'ready',      createdAt: new Date('2024-03-20'), size: '890 KB' }
  ]);

  generateReport() {
    const newReport: Report = {
      id: Date.now().toString(),
      name: `Custom Report ${this.reports().length + 1}`,
      type: 'Custom', status: 'processing',
      createdAt: new Date(), size: '—'
    };
    this.reports.update(r => [newReport, ...r]);
  }
}
