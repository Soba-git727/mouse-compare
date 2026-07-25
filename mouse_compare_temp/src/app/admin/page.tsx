'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Upload,
  Settings,
  Menu,
  X,
  TrendingUp,
  Database,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  FileUp,
  Globe,
} from 'lucide-react';

const sidebarLinks = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'moderation', label: 'Moderation Queue', icon: ClipboardList },
  { key: 'import', label: 'Data Import', icon: Upload },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const stats = [
  { label: 'Daily Active Users', value: '2,847', change: '+12%', icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Total Mice', value: '156', icon: Database, color: 'text-blue-400' },
  { label: 'Most Compared', value: 'Viper V3 Pro', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Pending Reviews', value: '23', icon: Clock, color: 'text-orange-400' },
];

const queueItems = [
  { id: 1, user: 'TechGuy42', type: 'Review', item: 'Pulsar X2H', submitted: '2026-07-22', status: 'pending' as const },
  { id: 2, user: 'MouseFan101', type: 'Spec', item: 'Logitech G Pro X Superlight 2', submitted: '2026-07-21', status: 'pending' as const },
  { id: 3, user: 'GearHead99', type: 'Review', item: 'Lamzu Atlantis Mini', submitted: '2026-07-20', status: 'approved' as const },
  { id: 4, user: 'BudgetGamer', type: 'Spec', item: 'Cooler Master MM712', submitted: '2026-07-19', status: 'rejected' as const },
  { id: 5, user: 'ProAimer', type: 'Review', item: 'Razer Viper V3 Pro', submitted: '2026-07-18', status: 'pending' as const },
  { id: 6, user: 'ClawGripKing', type: 'Spec', item: 'Endgame Gear XM2we', submitted: '2026-07-17', status: 'pending' as const },
];

const statusConfig = {
  pending: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending' },
  approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Approved' },
  rejected: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Rejected' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Stats Widgets */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                      {'change' in stat && (
                        <span className="text-xs font-medium text-emerald-400">{stat.change}</span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-[#e8e8ed]">{stat.value}</div>
                    <div className="text-xs text-[#6a6a7a] mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent Queue Preview */}
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="flex items-center justify-between border-b border-[#2a2a3a] px-5 py-4">
                <h3 className="text-sm font-semibold text-[#e8e8ed]">Recent Moderation Queue</h3>
                <button
                  onClick={() => setActiveTab('moderation')}
                  className="flex items-center gap-1 text-xs font-medium text-[#6c5ce7] hover:text-[#7c6cf7]"
                >
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a3a] text-xs uppercase tracking-wider text-[#6a6a7a]">
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-5 py-3 font-medium">Type</th>
                      <th className="px-5 py-3 font-medium">Item</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queueItems.slice(0, 4).map((item) => {
                      const status = statusConfig[item.status];
                      const StatusIcon = status.icon;
                      return (
                        <tr key={item.id} className="border-b border-[#2a2a3a] last:border-0 hover:bg-[#1a1a26]/50 transition-colors">
                          <td className="px-5 py-3 text-[#e8e8ed]">{item.user}</td>
                          <td className="px-5 py-3 text-[#9a9aab]">{item.type}</td>
                          <td className="px-5 py-3 text-[#e8e8ed]">{item.item}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case 'moderation':
        return (
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
            <div className="border-b border-[#2a2a3a] px-5 py-4">
              <h3 className="text-sm font-semibold text-[#e8e8ed]">Moderation Queue</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a3a] text-xs uppercase tracking-wider text-[#6a6a7a]">
                    <th className="px-5 py-3 font-medium">User</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Item</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queueItems.map((item) => {
                    const status = statusConfig[item.status];
                    const StatusIcon = status.icon;
                    return (
                      <tr key={item.id} className="border-b border-[#2a2a3a] last:border-0 hover:bg-[#1a1a26]/50 transition-colors">
                        <td className="px-5 py-3 text-[#e8e8ed] font-medium">{item.user}</td>
                        <td className="px-5 py-3">
                          <span className="text-xs text-[#6a6a7a]">{item.type}</span>
                        </td>
                        <td className="px-5 py-3 text-[#e8e8ed]">{item.item}</td>
                        <td className="px-5 py-3 text-xs text-[#6a6a7a]">{item.submitted}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="rounded-md bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-400/20">
                              Approve
                            </button>
                            <button className="rounded-md bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/20">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'import':
        return (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-dashed border-[#2a2a3a] bg-[#12121a] p-8 text-center transition-colors hover:border-[#6c5ce7]/50">
              <FileUp className="mx-auto h-10 w-10 text-[#6a6a7a]" />
              <p className="mt-3 text-sm font-medium text-[#e8e8ed]">Drop CSV or JSON file here</p>
              <p className="mt-1 text-xs text-[#6a6a7a]">or click to browse files</p>
              <button className="mt-4 rounded-lg bg-[#6c5ce7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5a4bd6]">
                Upload CSV/JSON
              </button>
            </div>

            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-[#6c5ce7]" />
                <h3 className="text-sm font-semibold text-[#e8e8ed]">Automated Scraper</h3>
              </div>
              <p className="text-xs text-[#6a6a7a] mb-4">Fetch mouse data from manufacturer press kits and public sources.</p>
              <button className="flex items-center gap-2 rounded-lg border border-[#2a2a3a] px-4 py-2 text-xs font-medium text-[#e8e8ed] transition-colors hover:bg-[#1a1a26]">
                <Globe className="h-3.5 w-3.5" />
                Run Scraper
              </button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
            <h3 className="text-sm font-semibold text-[#e8e8ed] mb-4">Admin Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Site Name', value: 'MouseDB' },
                { label: 'Default Role', value: 'Guest' },
                { label: 'Review Moderation', value: 'Manual' },
                { label: 'Rate Limit', value: '100 req/min' },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-2 border-b border-[#2a2a3a] last:border-0">
                  <span className="text-sm text-[#e8e8ed]">{setting.label}</span>
                  <span className="text-sm text-[#6a6a7a] font-mono">{setting.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-[#2a2a3a] bg-[#0a0a0f]">
        <nav className="flex-1 space-y-1 p-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = activeTab === link.key;
            return (
              <button
                key={link.key}
                onClick={() => setActiveTab(link.key)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                    : 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 h-full bg-[#0a0a0f] border-r border-[#2a2a3a] p-4">
            <button onClick={() => setSidebarOpen(false)} className="mb-4 text-[#9a9aab]">
              <X className="h-5 w-5" />
            </button>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = activeTab === link.key;
                return (
                  <button
                    key={link.key}
                    onClick={() => { setActiveTab(link.key); setSidebarOpen(false); }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                        : 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-lg border border-[#2a2a3a] px-3 py-2 text-sm text-[#9a9aab] lg:hidden"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#e8e8ed]">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[#9a9aab]">
            {activeTab === 'dashboard' && 'Overview of platform metrics.'}
            {activeTab === 'moderation' && 'Approve or reject user-submitted content.'}
            {activeTab === 'import' && 'Bulk import mouse data via CSV/JSON or automated scraper.'}
            {activeTab === 'settings' && 'Configure admin settings.'}
          </p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}