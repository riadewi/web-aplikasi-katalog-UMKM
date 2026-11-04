import React, { useState, useMemo } from 'react';
import { OrderRecord, OrderStatus, PaymentStatus } from '../types';
import { formatRupiah } from '../utils/formatters';
import {
  ChefHat,
  Truck,
  AlertCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  UtensilsCrossed,
  Bike,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  Phone,
  RotateCcw,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

interface OwnerDashboardProps {
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onTogglePaymentStatus: (orderId: string) => void;
  onResetMockOrders: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onTogglePaymentStatus,
  onResetMockOrders,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [paymentFilter, setPaymentFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 1. KPI Metric Calculations
  const metrics = useMemo(() => {
    const sedangDibuat = orders.filter((o) => o.order_status === 'Sedang Dibuat').length;
    const dalamPengantaran = orders.filter((o) => o.order_status === 'Dalam Pengantaran').length;
    const belumBayar = orders.filter((o) => o.payment_status === 'Belum Bayar').length;
    const omzetLunas = orders
      .filter((o) => o.payment_status === 'Lunas')
      .reduce((sum, o) => sum + o.subtotal, 0);

    return {
      sedangDibuat,
      dalamPengantaran,
      belumBayar,
      omzetLunas,
    };
  }, [orders]);

  // 2. Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Process status filter
      if (statusFilter !== 'Semua' && order.order_status !== statusFilter) {
        return false;
      }
      // Payment status filter
      if (paymentFilter !== 'Semua' && order.payment_status !== paymentFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = order.order_id.toLowerCase().includes(q);
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesAddress = order.deliveryAddress?.toLowerCase().includes(q);
        const matchesTable = order.tableNumber?.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesAddress && !matchesTable) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, paymentFilter, searchQuery]);

  // Next status sequence helper
  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'Menunggu Konfirmasi':
        return 'Sedang Dibuat';
      case 'Sedang Dibuat':
        return 'Dalam Pengantaran';
      case 'Dalam Pengantaran':
        return 'Selesai';
      default:
        return null;
    }
  };

  const statusColors: Record<OrderStatus, { bg: string; text: string; border: string }> = {
    'Menunggu Konfirmasi': {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800',
    },
    'Sedang Dibuat': {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800',
    },
    'Dalam Pengantaran': {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800',
    },
    'Selesai': {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
    'Dibatalkan': {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-800',
    },
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Bar Owner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Panel Kasir & Dapur Aktif
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mt-0.5">
            Dashboard Rekapan Pesanan
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Kelola proses masak, pengiriman, dan status pembayaran pesanan masuk.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onResetMockOrders}
            className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-1.5 transition-colors border border-white/10"
            title="Muat ulang contoh data antrean pesanan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Muat Data Demo</span>
          </button>
        </div>
      </div>

      {/* 1. Kartu Ringkasan (KPI Metrics Strip) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Sedang Dibuat */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
              Sedang Dibuat
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
              {metrics.sedangDibuat}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">pesanan di dapur</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Dalam Pengantaran */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
              Dalam Pengantaran
            </span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono tabular-nums">
              {metrics.dalamPengantaran}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">dalam perjalanan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: Belum Bayar */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
              Belum Bayar
            </span>
            <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono tabular-nums">
              {metrics.belumBayar}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">tagihan tertunda</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Total Omzet Lunas */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
              Omzet Lunas Hari Ini
            </span>
            <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums leading-tight">
              {formatRupiah(metrics.omzetLunas)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">pembayaran terkonfirmasi</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Filter & Pencarian Pesanan */}
      <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3 shadow-xs">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan Kode (#ORD-...), Nama Pemesan, atau Meja/Alamat..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Status Proses Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-slate-400 shrink-0 mr-1 text-[11px] font-semibold">Proses:</span>
            {['Semua', 'Menunggu Konfirmasi', 'Sedang Dibuat', 'Dalam Pengantaran', 'Selesai'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap shrink-0 text-xs ${
                  statusFilter === status
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Status Pembayaran Tabs */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-slate-400 mr-1 text-[11px] font-semibold">Bayar:</span>
            {['Semua', 'Belum Bayar', 'Lunas'].map((pay) => (
              <button
                key={pay}
                onClick={() => setPaymentFilter(pay)}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap text-xs ${
                  paymentFilter === pay
                    ? pay === 'Lunas'
                      ? 'bg-emerald-600 text-white'
                      : pay === 'Belum Bayar'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {pay}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Kartu Detail Tiap Pesanan (List of Orders) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            Daftar Antrean Pesanan ({filteredOrders.length})
          </h3>
          <span className="text-[11px] text-slate-400">Diurutkan waktu terbaru</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Tidak ada pesanan yang sesuai filter
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba atur ulang filter proses atau kata kunci pencarian.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.order_status);
            const statusStyle = statusColors[order.order_status];

            return (
              <div
                key={order.order_id}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all overflow-hidden p-4 sm:p-5 space-y-3.5"
              >
                {/* Header Card: ID, Customer Name, Time, Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded-md">
                      #{order.order_id}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {order.customerName}
                    </h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{order.created_at}</span>
                    </span>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Process Status Badge */}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                    >
                      {order.order_status}
                    </span>

                    {/* Payment Status Badge with Toggle */}
                    <button
                      onClick={() => onTogglePaymentStatus(order.order_id)}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all flex items-center gap-1 ${
                        order.payment_status === 'Lunas'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                      }`}
                      title="Klik untuk ubah status pembayaran"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${order.payment_status === 'Lunas' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span>{order.payment_status}</span>
                      <span className="text-[9px] opacity-70 underline">(Ubah)</span>
                    </button>
                  </div>
                </div>

                {/* Location / Dine-in details */}
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {order.orderType === 'dine_in' ? (
                    <>
                      <UtensilsCrossed className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          Makan di Tempat:
                        </span>{' '}
                        <strong className="text-amber-600 dark:text-amber-400 font-bold">
                          {order.tableNumber || '-'}
                        </strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <Bike className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          Bawa Pulang / Kirim:
                        </span>{' '}
                        <span>{order.deliveryAddress || 'Ambil sendiri di kasir'}</span>
                        {order.customerPhone && (
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{order.customerPhone}</span>
                            <a
                              href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 hover:underline font-semibold flex items-center gap-0.5"
                            >
                              <MessageCircle className="w-3 h-3" /> Chat WA
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Items Breakdown */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Daftar Menu ({order.items.reduce((s, i) => s + i.quantity, 0)} item):
                  </span>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-1.5 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {item.quantity}x {item.product.name}
                          </span>
                          {item.notes && (
                            <span className="block text-[11px] text-amber-600 dark:text-amber-400 italic">
                              Catatan: {item.notes}
                            </span>
                          )}
                        </div>
                        <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400 shrink-0">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.generalNotes && (
                    <div className="mt-2 text-[11px] bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 p-2 rounded-lg border border-amber-200/50">
                      <strong>Catatan Tambahan:</strong> &ldquo;{order.generalNotes}&rdquo;
                    </div>
                  )}
                </div>

                {/* Footer Card: Total & Quick Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Total Tagihan:</span>
                    <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                      {formatRupiah(order.subtotal)}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      ({order.paymentMethod})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Manual Status Selector Dropdown */}
                    <select
                      value={order.order_status}
                      onChange={(e) => onUpdateOrderStatus(order.order_id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none"
                    >
                      <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                      <option value="Sedang Dibuat">Sedang Dibuat</option>
                      <option value="Dalam Pengantaran">Dalam Pengantaran</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>

                    {/* Quick advance to next step */}
                    {nextStatus && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.order_id, nextStatus)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                      >
                        <span>Ke &quot;{nextStatus}&quot;</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
