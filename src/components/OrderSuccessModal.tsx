import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, RotateCcw, Copy, Check, Search } from 'lucide-react';
import { OrderRecord } from '../types';
import { formatRupiah } from '../utils/formatters';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord | null;
  message: string;
  onResetOrder: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  order,
  message,
  onResetOrder,
  onTrackOrder,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/30">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Pesanan Berhasil Dicatat & Dialihkan!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Halaman chat WhatsApp telah terbuka dengan teks pesanan yang sudah terformat rapi.
          </p>
        </div>

        {/* WhatsApp reminder banner */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 text-left text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Penting: Tekan tombol Kirim di WhatsApp</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Pastikan Anda menekan tombol <strong>Kirim (Send)</strong> di chat WhatsApp agar pihak kasir/dapur langsung menerima dan memproses pesanan.
          </p>
        </div>

        {/* Short Summary Card */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-left text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Kode Pesanan:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">#{order.order_id}</span>
          </div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Pemesan:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</span>
          </div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Tipe:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {order.orderType === 'dine_in' ? `Makan di Meja (${order.tableNumber})` : 'Bawa Pulang / Kirim'}
            </span>
          </div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Total Tagihan:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
              {formatRupiah(order.subtotal)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col gap-2">
          {/* Track order directly */}
          <button
            onClick={() => {
              onTrackOrder(order.order_id);
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Lacak Status Pesanan Ini (#{order.order_id})</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Teks Pesanan Berhasil Disalin!' : 'Salin Ulang Teks Pesanan'}</span>
          </button>

          <button
            onClick={() => {
              onResetOrder();
              onClose();
            }}
            className="w-full py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Pesanan Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
