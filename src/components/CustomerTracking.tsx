import React, { useState, useEffect } from 'react';
import { OrderRecord, OrderStatus, StoreInfo } from '../types';
import { formatRupiah, cleanPhoneNumber } from '../utils/formatters';
import {
  Search,
  CheckCircle2,
  Clock,
  ChefHat,
  Truck,
  Check,
  AlertCircle,
  UtensilsCrossed,
  Bike,
  CreditCard,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CustomerTrackingProps {
  orders: OrderRecord[];
  initialOrderId?: string;
  storeInfo: StoreInfo;
  onGoToCatalog: () => void;
}

export const CustomerTracking: React.FC<CustomerTrackingProps> = ({
  orders,
  initialOrderId = '',
  storeInfo,
  onGoToCatalog,
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialOrderId || '');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  // Sync initial order id or load latest
  useEffect(() => {
    if (initialOrderId) {
      const cleanId = initialOrderId.replace('#', '').trim().toUpperCase();
      const match = orders.find((o) => o.order_id.toUpperCase() === cleanId);
      if (match) {
        setSelectedOrder(match);
        setSearchInput(match.order_id);
        return;
      }
    }

    // Default to the first order if none specified
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
      setSearchInput(orders[0].order_id);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = searchInput.replace('#', '').trim().toUpperCase();
    const match = orders.find((o) => o.order_id.toUpperCase() === cleanId);
    if (match) {
      setSelectedOrder(match);
    } else {
      setSelectedOrder(null);
    }
  };

  // 4-Step Visual Stepper
  const steps: { label: string; desc: string; icon: React.ReactNode; statusTarget: OrderStatus[] }[] = [
    {
      label: 'Diterima',
      desc: 'Pesanan masuk ke sistem antrean',
      icon: <Clock className="w-4 h-4" />,
      statusTarget: ['Menunggu Konfirmasi', 'Sedang Dibuat', 'Dalam Pengantaran', 'Selesai'],
    },
    {
      label: 'Sedang Dimasak / Dibuat',
      desc: 'Dapur sedang menyiapkan menu',
      icon: <ChefHat className="w-4 h-4" />,
      statusTarget: ['Sedang Dibuat', 'Dalam Pengantaran', 'Selesai'],
    },
    {
      label: 'Diantar / Siap Diambil',
      desc: selectedOrder?.orderType === 'dine_in' ? 'Disajikan ke meja Anda' : 'Dalam perjalanan kurir',
      icon: <Truck className="w-4 h-4" />,
      statusTarget: ['Dalam Pengantaran', 'Selesai'],
    },
    {
      label: 'Selesai',
      desc: 'Pesanan telah diterima & dinikmati',
      icon: <Check className="w-4 h-4" />,
      statusTarget: ['Selesai'],
    },
  ];

  // Helper to determine step index
  const getStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return 0;
      case 'Sedang Dibuat':
        return 1;
      case 'Dalam Pengantaran':
        return 2;
      case 'Selesai':
        return 3;
      case 'Dibatalkan':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIdx = selectedOrder ? getStepIndex(selectedOrder.order_status) : -1;
  const isCancelled = selectedOrder?.order_status === 'Dibatalkan';

  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-in fade-in duration-200">
      {/* Search Bar / Input Kode Pesanan */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Lacak Status Makanan & Minuman
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ketik kode pesanan yang tercantum pada pesan WhatsApp Anda (contoh: #ORD-8291).
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Masukkan kode: misal ORD-8291..."
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Lacak</span>
          </button>
        </form>

        {/* Quick select from available recent orders */}
        {orders.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400">Pesanan Aktif:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.order_id}
                type="button"
                onClick={() => {
                  setSearchInput(o.order_id);
                  setSelectedOrder(o);
                }}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-colors border ${
                  selectedOrder?.order_id === o.order_id
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-200'
                }`}
              >
                #{o.order_id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result Display */}
      {!selectedOrder ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Pesanan #{searchInput.toUpperCase()} Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Pastikan kode pesanan sudah benar, atau klik salah satu kode pesanan aktif di atas untuk melihat demo pelacakan.
          </p>
          <button
            onClick={onGoToCatalog}
            className="px-4 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 rounded-xl hover:bg-amber-100 transition-colors"
          >
            Kembali ke Katalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card Status & Stepper */}
          <div className="p-4 sm:p-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Kode Pemesanan
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    #{selectedOrder.order_id}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedOrder.created_at}</span>
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isCancelled
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : selectedOrder.order_status === 'Selesai'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                  }`}
                >
                  {selectedOrder.order_status}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar (Visual Alur 4 Langkah) */}
            {isCancelled ? (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <strong className="block font-bold">Pesanan Ini Dibatalkan</strong>
                  <span>Silakan hubungi kasir atau pesan menu kembali melalui katalog.</span>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 dark:bg-slate-700 -z-0">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${(currentStepIdx / (steps.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* 4 Steps */}
                  <div className="relative z-10 grid grid-cols-4 gap-2">
                    {steps.map((step, idx) => {
                      const isCompleted = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          {/* Step Icon Circle */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950/60'
                                : isCurrent
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 dark:ring-emerald-900/60 animate-bounce'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                            }`}
                          >
                            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.icon}
                          </div>

                          {/* Step Text */}
                          <span
                            className={`text-[11px] font-bold mt-2 leading-tight ${
                              isCurrent
                                ? 'text-emerald-700 dark:text-emerald-300 font-extrabold'
                                : isCompleted
                                ? 'text-slate-800 dark:text-slate-200'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </span>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 hidden sm:block mt-0.5 line-clamp-1">
                            {step.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time Status Card Highlight */}
                <div className="mt-6 p-3.5 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block">Status Saat Ini:</span>
                      <span className="text-[11px] opacity-90">{steps[currentStepIdx]?.desc}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold bg-white/80 dark:bg-slate-800 px-2.5 py-1 rounded-md shrink-0">
                    Langkah {currentStepIdx + 1} dari 4
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Rincian Tagihan & Status Bayar */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Rincian Tagihan & Informasi Pemesan
              </h4>

              {/* Payment status badge */}
              <div
                className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  selectedOrder.payment_status === 'Lunas'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>
                  {selectedOrder.payment_status === 'Lunas'
                    ? 'Sudah Lunas'
                    : 'Menunggu Pembayaran di Kasir/Kurir'}
                </span>
              </div>
            </div>

            {/* Customer & Location Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Nama Pemesan:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedOrder.customerName}
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {selectedOrder.orderType === 'dine_in' ? 'Nomor Meja:' : 'Alamat Pengiriman:'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {selectedOrder.orderType === 'dine_in'
                    ? selectedOrder.tableNumber
                    : selectedOrder.deliveryAddress}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Menu yang Dipesan:
              </span>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-start justify-between gap-2 text-xs">
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
                    <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Total Harga:</span>
              <span className="text-base sm:text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                {formatRupiah(selectedOrder.subtotal)}
              </span>
            </div>

            {/* Contact Store Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanPhoneNumber(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
                  `Halo ${storeInfo.name}, saya ingin menanyakan pesanan #${selectedOrder.order_id} atas nama ${selectedOrder.customerName}. Terima kasih!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ada Pertanyaan? Hubungi Kasir via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
