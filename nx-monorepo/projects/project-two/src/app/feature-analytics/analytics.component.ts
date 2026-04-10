import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@my-workspace/shared/ui-components';

interface ChartBar { label: string; value: number; pct: number; }

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Analytics</h1>
          <p class="page-subtitle">Usage trends and user behaviour insights.</p>
        </div>
        <div class="period-tabs">
          <button *ngFor="let p of periods"
            [class]="'period-btn ' + (activePeriod() === p ? 'active' : '')"
            (click)="activePeriod.set(p)">{{ p }}</button>
        </div>
      </div>

      <div class="kpi-row">
        <lib-card *ngFor="let k of kpis" class="kpi-card">
          <div class="kpi-inner">
            <span class="kpi-label">{{ k.label }}</span>
            <span class="kpi-value">{{ k.value }}</span>
            <span [class]="'kpi-delta ' + (k.up ? 'up' : 'down')">
              {{ k.up ? '↑' : '↓' }} {{ k.delta }}
            </span>
          </div>
        </lib-card>
      </div>

      <lib-card title="Daily active users" subtitle="Unique sessions per day">
        <div class="chart">
          <div *ngFor="let bar of chartData()" class="bar-col">
            <span class="bar-val">{{ bar.value }}</span>
            <div class="bar-track">
              <div class="bar-fill" [style.height.%]="bar.pct"></div>
            </div>
            <span class="bar-label">{{ bar.label }}</span>
          </div>
        </div>
      </lib-card>

      <lib-card title="Top pages" subtitle="Most visited pages this period">
        <table class="pages-table">
          <thead>
            <tr><th>Page</th><th>Views</th><th>Avg. time</th><th>Bounce</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of topPages">
              <td class="page-path">{{ row.path }}</td>
              <td>{{ row.views | number }}</td>
              <td>{{ row.avgTime }}</td>
              <td [class]="'bounce ' + (row.bounce > 50 ? 'high' : 'low')">{{ row.bounce }}%</td>
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
    .period-tabs { display:flex;background:#f1f5f9;border-radius:8px;padding:3px;gap:2px; }
    .period-btn  { background:none;border:none;cursor:pointer;padding:6px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#64748b;transition:all .12s; }
    .period-btn.active { background:#fff;color:#0f172a;box-shadow:0 1px 3px rgba(0,0,0,.1); }
    .kpi-row     { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px; }
    .kpi-inner   { display:flex;flex-direction:column;gap:4px; }
    .kpi-label   { font-size:12px;color:#64748b;font-weight:500;text-transform:uppercase;letter-spacing:.04em; }
    .kpi-value   { font-size:28px;font-weight:700;color:#0f172a;line-height:1.1; }
    .kpi-delta   { font-size:12px;font-weight:600; }
    .up { color:#16a34a; } .down { color:#dc2626; }
    .chart       { display:flex;align-items:flex-end;gap:8px;height:180px;padding-top:24px; }
    .bar-col     { flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%; }
    .bar-val     { font-size:11px;color:#94a3b8; }
    .bar-track   { flex:1;width:100%;background:#f1f5f9;border-radius:4px;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden; }
    .bar-fill    { background:linear-gradient(180deg,#60a5fa,#3b82f6);border-radius:4px;transition:height .4s ease;min-height:4px; }
    .bar-label   { font-size:10px;color:#94a3b8; }
    .pages-table { width:100%;border-collapse:collapse;font-size:13px; }
    th { text-align:left;padding:8px 12px;color:#64748b;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e2e8f0; }
    td { padding:12px;border-bottom:1px solid #f1f5f9;color:#334155; }
    .page-path   { font-family:monospace;font-size:12px;color:#1d4ed8; }
    .bounce.high { color:#dc2626;font-weight:600; } .bounce.low { color:#16a34a;font-weight:600; }
  `]
})
export class AnalyticsComponent {
  periods = ['7d', '30d', '90d'];
  activePeriod = signal('7d');

  kpis = [
    { label: 'Pageviews',      value: '182,430', delta: '14.2%', up: true  },
    { label: 'Unique users',   value: '41,200',  delta: '9.6%',  up: true  },
    { label: 'Session length', value: '3m 42s',  delta: '0.8%',  up: false },
    { label: 'Bounce rate',    value: '38.5%',   delta: '2.1%',  up: false }
  ];

  chartData = signal<ChartBar[]>([
    { label: 'Mon', value: 3200, pct: 72 },
    { label: 'Tue', value: 4100, pct: 92 },
    { label: 'Wed', value: 3800, pct: 85 },
    { label: 'Thu', value: 4450, pct: 100 },
    { label: 'Fri', value: 3900, pct: 88 },
    { label: 'Sat', value: 2100, pct: 47 },
    { label: 'Sun', value: 1850, pct: 42 }
  ]);

  topPages = [
    { path: '/dashboard', views: 42100, avgTime: '4m 12s', bounce: 22 },
    { path: '/reports',   views: 18400, avgTime: '6m 08s', bounce: 18 },
    { path: '/settings',  views: 9800,  avgTime: '2m 44s', bounce: 41 },
    { path: '/login',     views: 8300,  avgTime: '0m 58s', bounce: 64 },
    { path: '/analytics', views: 7600,  avgTime: '5m 30s', bounce: 29 }
  ];
}
