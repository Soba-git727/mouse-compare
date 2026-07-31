'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  User,
  Users,
  Trash2,
  LogOut,
  MousePointer2,
  Plus,
  Pencil,
  Save,
  MessageSquare,
} from 'lucide-react';
import type { Mouse } from '@/data/mice';

const sidebarLinks = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'mice', label: 'Mice', icon: MousePointer2 },
  { key: 'reviews', label: 'Reviews', icon: MessageSquare },
  { key: 'moderation', label: 'Moderation Queue', icon: ClipboardList },
  { key: 'import', label: 'Data Import', icon: Upload },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const stats = [
  { label: 'Daily Active Users', value: '2,847', change: '+12%', icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Total Mice', value: '—', icon: Database, color: 'text-blue-400' },
  { label: 'Total Reviews', value: '—', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Total Accounts', value: '—', icon: Users, color: 'text-purple-400' },
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

type MouseForm = {
  id: string;
  name: string;
  brand: string;
  price: string;
  weight: string;
  dimensions: string;
  length_mm: string;
  width_mm: string;
  height_mm: string;
  sensor: string;
  sensor_desc: string;
  connection: string;
  battery: string;
  switches: string;
  switches_desc: string;
  dpi: string;
  ips: string;
  acceleration: string;
  buttons: string;
  ergonomic: boolean;
  coating: string;
  hand_size_min: string;
  hand_size_max: string;
  grip_styles: string;
  colors: string;
  photo: string;
  rating: string;
  review_count: string;
};

const emptyForm: MouseForm = {
  id: '', name: '', brand: '', price: '', weight: '', dimensions: '', length_mm: '', width_mm: '',
  height_mm: '', sensor: '', sensor_desc: '', connection: 'Wireless', battery: '', switches: '',
  switches_desc: '', dpi: '', ips: '', acceleration: '', buttons: '', ergonomic: false, coating: '',
  hand_size_min: '', hand_size_max: '', grip_styles: '', colors: '', photo: '', rating: '', review_count: '',
};

type AdminReviewItem = {
  id: number;
  userId: string;
  userName: string;
  mouseId: string;
  mouseName: string;
  text: string;
  rating: number;
  createdAt: string;
};

const field = (label: string, key: keyof MouseForm, props: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}, opts: { half?: boolean; textarea?: boolean } = {}) => ({
  label, key, props, opts,
});

const mouseFormFields = [
  field('ID (leave empty to auto-generate)', 'id', { placeholder: 'razer-viper-v3-pro' }, { half: true }),
  field('Name *', 'name', { placeholder: 'Viper V3 Pro' }, { half: true }),
  field('Brand *', 'brand', { placeholder: 'Razer' }, { half: true }),
  field('Price ($)', 'price', { placeholder: '159.99' }, { half: true }),
  field('Weight (g)', 'weight', { placeholder: '54' }, { half: true }),
  field('Dimensions', 'dimensions', { placeholder: '127.0 x 63.9 x 39.9 mm' }, { half: true }),
  field('Length (mm)', 'length_mm', {}, { half: true }),
  field('Width (mm)', 'width_mm', {}, { half: true }),
  field('Height (mm)', 'height_mm', {}, { half: true }),
  field('Sensor', 'sensor', { placeholder: 'Focus Pro 35K' }, { half: true }),
  field('Sensor Description', 'sensor_desc', {}, { textarea: true }),
  field('Connection', 'connection', { placeholder: 'Wireless' }, { half: true }),
  field('Battery (h)', 'battery', {}, { half: true }),
  field('Switches', 'switches', { placeholder: 'Optical Gen-3' }, { half: true }),
  field('Switches Description', 'switches_desc', {}, { textarea: true }),
  field('DPI', 'dpi', {}, { half: true }),
  field('IPS', 'ips', {}, { half: true }),
  field('Acceleration (G)', 'acceleration', {}, { half: true }),
  field('Buttons', 'buttons', {}, { half: true }),
  field('Ergonomic', 'ergonomic', {}, { half: true }),
  field('Coating', 'coating', { placeholder: 'Matte' }, { half: true }),
  field('Hand Size Min (cm)', 'hand_size_min', {}, { half: true }),
  field('Hand Size Max (cm)', 'hand_size_max', {}, { half: true }),
  field('Grip Styles (comma-separated)', 'grip_styles', { placeholder: 'claw, fingertip' }, { half: true }),
  field('Colors (comma-separated)', 'colors', { placeholder: 'Black, White' }, { half: true }),
  field('Photo path', 'photo', { placeholder: '/assets/mice/photos/x.jpg' }, { half: true }),
  field('Rating (0-5)', 'rating', {}, { half: true }),
  field('Review Count', 'review_count', {}, { half: true }),
];

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [adminReviews, setAdminReviews] = useState<AdminReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState('');
  const [editReviewId, setEditReviewId] = useState<number | null>(null);
  const [editReviewText, setEditReviewText] = useState('');
  const [editReviewRating, setEditReviewRating] = useState(5);
  const [editReviewMouseId, setEditReviewMouseId] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [mice, setMice] = useState<Mouse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) setAuthorized(true);
        else router.push('/login');
      })
      .catch(() => router.push('/login'));

    fetch('/api/users/count').then(r => r.json()).then(d => setUserCount(d.count)).catch(() => {});
    fetch('/api/reviews')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load reviews');
        return r.json();
      })
      .then(d => setAdminReviews(d.reviews || []))
      .catch(() => setReviewsError('Could not load reviews.'))
      .finally(() => setReviewsLoading(false));
    fetch('/api/mice').then(r => r.json()).then(d => setMice(d.mice || [])).catch(() => {});
  }, [router]);

  const refreshMice = () => {
    fetch('/api/mice').then(r => r.json()).then(d => setMice(d.mice || [])).catch(() => {});
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (m: Mouse) => {
    setEditingId(m.id);
    setForm({
      id: m.id,
      name: m.name,
      brand: m.brand,
      price: String(m.price),
      weight: String(m.weight),
      dimensions: m.dimensions,
      length_mm: String(m.length_mm),
      width_mm: String(m.width_mm),
      height_mm: String(m.height_mm),
      sensor: m.sensor,
      sensor_desc: m.sensor_desc,
      connection: m.connection,
      battery: String(m.battery),
      switches: m.switches,
      switches_desc: m.switches_desc,
      dpi: String(m.dpi),
      ips: String(m.ips),
      acceleration: String(m.acceleration),
      buttons: String(m.buttons),
      ergonomic: m.ergonomic,
      coating: m.coating,
      hand_size_min: String(m.hand_size_min),
      hand_size_max: String(m.hand_size_max),
      grip_styles: m.grip_styles.join(', '),
      colors: m.colors.join(', '),
      photo: m.photo,
      rating: String(m.rating),
      review_count: String(m.review_count),
    });
    setFormError('');
    setShowForm(true);
  };

  const handleDeleteMouse = async (id: string) => {
    if (!confirm(`Delete "${id}"?`)) return;
    const res = await fetch(`/api/mice/${id}`, { method: 'DELETE' });
    if (res.ok) setMice(prev => prev.filter(m => m.id !== id));
  };

  const handleSubmitMouse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.brand.trim()) {
      setFormError('Name and brand are required.');
      return;
    }
    const payload = {
      id: editingId ? undefined : (form.id.trim() || undefined),
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: parseFloat(form.price) || 0,
      weight: parseInt(form.weight) || 0,
      dimensions: form.dimensions,
      length_mm: parseFloat(form.length_mm) || 0,
      width_mm: parseFloat(form.width_mm) || 0,
      height_mm: parseFloat(form.height_mm) || 0,
      sensor: form.sensor,
      sensor_desc: form.sensor_desc,
      connection: form.connection,
      battery: parseInt(form.battery) || 0,
      switches: form.switches,
      switches_desc: form.switches_desc,
      dpi: parseInt(form.dpi) || 0,
      ips: parseInt(form.ips) || 0,
      acceleration: parseInt(form.acceleration) || 0,
      buttons: parseInt(form.buttons) || 0,
      ergonomic: form.ergonomic,
      coating: form.coating,
      hand_size_min: parseInt(form.hand_size_min) || 0,
      hand_size_max: parseInt(form.hand_size_max) || 0,
      grip_styles: form.grip_styles.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      photo: form.photo,
      rating: parseFloat(form.rating) || 0,
      review_count: parseInt(form.review_count) || 0,
    };
    const res = await fetch(editingId ? `/api/mice/${editingId}` : '/api/mice', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowForm(false);
      refreshMice();
    } else {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error || 'Failed to save mouse.');
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAdminReviews(prev => prev.filter(r => r.id !== id));
      if (editReviewId === id) cancelEditReview();
    }
  };

  const startEditReview = (review: AdminReviewItem) => {
    setEditReviewId(review.id);
    setEditReviewText(review.text);
    setEditReviewRating(review.rating);
    setEditReviewMouseId(review.mouseId);
    setReviewError('');
  };

  const cancelEditReview = () => {
    setEditReviewId(null);
    setEditReviewText('');
    setEditReviewRating(5);
    setEditReviewMouseId('');
    setReviewError('');
  };

  const handleSaveReview = async () => {
    if (!editReviewText.trim()) {
      setReviewError('Review text is required.');
      return;
    }
    const res = await fetch(`/api/reviews/${editReviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editReviewText, rating: editReviewRating }),
    });
    if (res.ok) {
      const data = await res.json();
      setAdminReviews(prev => prev.map(r => (r.id === editReviewId ? data.review : r)));
      cancelEditReview();
    } else {
      const data = await res.json().catch(() => ({}));
      setReviewError(data.error || 'Failed to update review.');
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        setForm(prev => ({ ...prev, photo: data.url }));
      } else {
        setUploadError(data.error || 'Upload failed.');
      }
    } catch {
      setUploadError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  if (!authorized) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Stats Widgets */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const displayValue =
                  stat.label === 'Total Accounts' ? String(userCount) :
                  stat.label === 'Total Mice' ? String(mice.length) :
                  stat.label === 'Total Reviews' ? String(adminReviews.length) :
                  stat.value;
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
                    <div className="text-2xl font-bold text-[#e8e8ed]">{displayValue}</div>
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

      case 'mice':
        return (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#e8e8ed]">Mouse Catalog ({mice.length})</h3>
              <button
                onClick={openCreate}
                className="flex items-center gap-1.5 rounded-lg bg-[#6c5ce7] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5a4bd6]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Mouse
              </button>
            </div>

            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="overflow-x-auto">
                {mice.length === 0 ? (
                  <p className="p-5 text-sm text-[#6a6a7a]">No mice in the catalog yet.</p>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#2a2a3a] text-xs uppercase tracking-wider text-[#6a6a7a]">
                        <th className="px-5 py-3 font-medium">Name</th>
                        <th className="px-5 py-3 font-medium">Brand</th>
                        <th className="px-5 py-3 font-medium">Price</th>
                        <th className="px-5 py-3 font-medium">Weight</th>
                        <th className="px-5 py-3 font-medium">Rating</th>
                        <th className="px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mice.map((m) => (
                        <tr key={m.id} className="border-b border-[#2a2a3a] last:border-0 hover:bg-[#1a1a26]/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={m.photo} alt={m.name} className="h-8 w-8 rounded object-contain bg-[#1a1a26]" />
                              <div>
                                <div className="text-[#e8e8ed] font-medium">{m.name}</div>
                                <div className="text-xs text-[#6a6a7a] font-mono">{m.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-[#9a9aab]">{m.brand}</td>
                          <td className="px-5 py-3 text-[#e8e8ed]">${m.price.toFixed(2)}</td>
                          <td className="px-5 py-3 text-[#9a9aab]">{m.weight}g</td>
                          <td className="px-5 py-3 text-[#f59e0b]">{m.rating.toFixed(1)}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEdit(m)}
                                className="flex items-center gap-1 rounded-md bg-[#1a1a26] px-2.5 py-1 text-xs font-medium text-[#9a9aab] transition-colors hover:bg-[#2a2a3a] hover:text-[#e8e8ed]"
                              >
                                <Pencil className="h-3 w-3" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMouse(m.id)}
                                className="flex items-center gap-1 rounded-md bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/20"
                              >
                                <Trash2 className="h-3 w-3" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-50 bg-black/60">
                <div className="flex min-h-full items-center justify-center p-4">
                  <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col rounded-2xl border border-[#2a2a3a] bg-[#12121a]">
                    <div className="flex items-center justify-between border-b border-[#2a2a3a] px-6 py-4">
                      <h3 className="text-lg font-semibold text-[#e8e8ed]">
                        {editingId ? `Edit ${editingId}` : 'Add Mouse'}
                      </h3>
                      <button onClick={() => setShowForm(false)} className="text-[#6a6a7a] hover:text-[#e8e8ed]">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form id="mouse-form" onSubmit={handleSubmitMouse} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {mouseFormFields.map((f) => (
                        <div key={f.key} className={f.opts.half ? '' : 'sm:col-span-2'}>
                          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#6a6a7a]">
                            {f.label}
                          </label>
                          {f.opts.textarea ? (
                            <AutoTextarea
                              value={form[f.key] as string}
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            />
                          ) : f.key === 'photo' ? (
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2a2a3a] bg-[#1a1a26]">
                                  {form.photo ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={form.photo} alt="Preview" className="h-full w-full object-contain" />
                                  ) : (
                                    <span className="text-xs text-[#6a6a7a]">No img</span>
                                  )}
                                </div>
                                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2a2a3a] bg-[#1a1a26] px-3 py-2 text-sm font-medium text-[#e8e8ed] transition-colors hover:bg-[#2a2a3a]">
                                  <Upload className="h-4 w-4" />
                                  {uploading ? 'Uploading...' : 'Upload Photo'}
                                  <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/gif,image/webp"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                              {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
                              {form.photo && (
                                <p className="mt-2 truncate font-mono text-xs text-[#6a6a7a]">{form.photo}</p>
                              )}
                            </div>
                          ) : f.key === 'ergonomic' ? (
                            <label className="flex items-center gap-2 pt-2">
                              <input
                                type="checkbox"
                                checked={form.ergonomic}
                                onChange={(e) => setForm({ ...form, ergonomic: e.target.checked })}
                                className="h-4 w-4 accent-[#6c5ce7]"
                              />
                              <span className="text-sm text-[#9a9aab]">Ergonomic shape</span>
                            </label>
                          ) : (
                            <input
                              type="text"
                              value={form[f.key] as string}
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                              {...f.props}
                              className="w-full rounded-lg border border-[#2a2a3a] bg-[#1a1a26] px-3 py-2 text-sm text-[#e8e8ed] outline-none transition-colors focus:border-[#6c5ce7]"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {formError && <p className="text-sm text-red-400">{formError}</p>}
                    </form>

                    <div className="flex items-center justify-end gap-2 border-t border-[#2a2a3a] px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="rounded-lg border border-[#2a2a3a] px-4 py-2 text-sm font-medium text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        form="mouse-form"
                        className="flex items-center gap-1.5 rounded-lg bg-[#6c5ce7] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6]"
                      >
                        <Save className="h-4 w-4" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );

      case 'reviews':
        return (
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
            <div className="border-b border-[#2a2a3a] px-5 py-4">
              <h3 className="text-sm font-semibold text-[#e8e8ed]">All Reviews ({adminReviews.length})</h3>
            </div>
            <div className="overflow-x-auto">
              {reviewsLoading ? (
                <p className="p-5 text-sm text-[#6a6a7a]">Loading reviews...</p>
              ) : reviewsError ? (
                <p className="p-5 text-sm text-red-400">{reviewsError}</p>
              ) : adminReviews.length === 0 ? (
                <p className="p-5 text-sm text-[#6a6a7a]">No user reviews yet.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a3a] text-xs uppercase tracking-wider text-[#6a6a7a]">
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-5 py-3 font-medium">Mouse</th>
                      <th className="px-5 py-3 font-medium">Rating</th>
                      <th className="px-5 py-3 font-medium">Review</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminReviews.map((review) => (
                      <tr key={review.id} className="border-b border-[#2a2a3a] last:border-0 hover:bg-[#1a1a26]/50 transition-colors">
                        <td className="px-5 py-3 text-[#e8e8ed] font-medium">{review.userName}</td>
                        <td className="px-5 py-3 text-[#e8e8ed]">{review.mouseName}</td>
                        <td className="px-5 py-3">
                          <span className="text-sm font-bold text-[#f59e0b]">{review.rating}/10</span>
                        </td>
                        <td className="px-5 py-3 max-w-xs">
                          {editReviewId === review.id ? (
                            <div className="space-y-2">
                              <input
                                type="range"
                                min="1" max="10"
                                value={editReviewRating}
                                onChange={e => setEditReviewRating(Number(e.target.value))}
                                className="w-full accent-[#6c5ce7]"
                              />
                              <span className="text-xs text-[#6a6a7a]">{editReviewRating}/10</span>
                              <textarea
                                value={editReviewText}
                                onChange={e => setEditReviewText(e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] px-3 py-2 text-sm text-[#e8e8ed] outline-none focus:border-[#6c5ce7]/50"
                              />
                              {reviewError && <p className="text-xs text-red-400">{reviewError}</p>}
                            </div>
                          ) : (
                            <p className="truncate text-xs text-[#9a9aab]">{review.text}</p>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          {editReviewId === review.id ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={handleSaveReview}
                                className="flex items-center gap-1 rounded-md bg-[#6c5ce7] px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-[#5a4bd6]"
                              >
                                <Save className="h-3 w-3" /> Save
                              </button>
                              <button
                                onClick={cancelEditReview}
                                className="flex items-center gap-1 rounded-md border border-[#2a2a3a] px-2.5 py-1 text-xs font-medium text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]"
                              >
                                <X className="h-3 w-3" /> Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEditReview(review)}
                                className="flex items-center gap-1 rounded-md bg-[#1a1a26] px-2.5 py-1 text-xs font-medium text-[#9a9aab] transition-colors hover:bg-[#2a2a3a] hover:text-[#e8e8ed]"
                              >
                                <Pencil className="h-3 w-3" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="flex items-center gap-1 rounded-md bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/20"
                              >
                                <Trash2 className="h-3 w-3" /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );

      case 'moderation':
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="border-b border-[#2a2a3a] px-5 py-4">
                <h3 className="text-sm font-semibold text-[#e8e8ed]">Content Queue</h3>
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
          <p className="mt-1 text-sm text-[#6a6a7a]">
            {activeTab === 'dashboard' && 'Overview of platform metrics.'}
            {activeTab === 'mice' && 'Create, edit and remove mice from the catalog.'}
            {activeTab === 'reviews' && 'View, edit and delete user reviews.'}
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

function AutoTextarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      rows={1}
      className="w-full resize-none overflow-hidden rounded-lg border border-[#2a2a3a] bg-[#1a1a26] px-3 py-2 text-sm text-[#e8e8ed] outline-none transition-colors focus:border-[#6c5ce7]"
    />
  );
}