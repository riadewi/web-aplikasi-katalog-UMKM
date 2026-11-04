import React, { useState } from 'react';
import { CartItem, OrderDetails, OrderRecord, OrderType, PaymentMethod, StoreInfo } from '../types';
import { formatRupiah, generateWhatsAppMessage, createWhatsAppUrl, generateOrderId, getFormattedTime } from '../utils/formatters';
import { X, Copy, Check, UtensilsCrossed, Bike, CreditCard, Banknote, QrCode, AlertCircle, FileText, ChevronDown, ChevronUp, User, Hash, Phone, MapPin, MessageSquare } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  storeInfo: StoreInfo;
  onOrderSuccess: (order: OrderRecord, message: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  storeInfo,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [generalNotes, setGeneralNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Form validation: Checkout button cannot be clicked if mandatory data is empty
  const isFormValid =
    orderType === 'dine_in'
      ? customerName.trim().length > 0 && tableNumber.trim().length > 0
      : customerName.trim().length > 0 && customerPhone.trim().length > 0 && deliveryAddress.trim().length > 0;

  const orderDetails: OrderDetails = {
    customerName,
    orderType,
    tableNumber,
    deliveryAddress,
    customerPhone,
    paymentMethod,
    generalNotes,
  };

  const previewMessage = generateWhatsAppMessage(
    storeInfo,
    cartItems,
    orderDetails,
    subtotal,
    'PREVIEW'
  );

  const handleProceedWhatsApp = () => {
    if (!isFormValid) return;

    const realOrderId = generateOrderId();
    const finalMessage = generateWhatsAppMessage(
      storeInfo,
      cartItems,
      orderDetails,
      subtotal,
      realOrderId
    );

    const newOrder: OrderRecord = {
      order_id: realOrderId,
      order_status: 'Menunggu Konfirmasi',
      payment_status: 'Belum Bayar',
      created_at: getFormattedTime(Date.now()),
      created_timestamp: Date.now(),
      customerName: customerName.trim(),
      orderType,
      tableNumber: tableNumber.trim(),
      deliveryAddress: deliveryAddress.trim(),
      customerPhone: customerPhone.trim(),
      generalNotes: generalNotes.trim(),
      paymentMethod,
      items: [...cartItems],
      subtotal,
    };

    // Guaranteed format: https://wa.me/[NOMOR_HP]?text=${encodeURIComponent(pesan)}
    const waUrl = createWhatsAppUrl(storeInfo.whatsappNumber, finalMessage);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Notify parent
    onOrderSuccess(newOrder, finalMessage);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Formulir Pemesanan & WhatsApp
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kirim pesanan rapi langsung ke WhatsApp {storeInfo.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* 1. Radio / Tab Pilihan Pemesanan: "Makan di Tempat" vs "Bawa Pulang/Kirim" */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              1. Pilihan Pemesanan
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                  orderType === 'dine_in'
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  orderType === 'dine_in' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Makan di Tempat</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Nama & Nomor Meja</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway_delivery')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                  orderType === 'takeaway_delivery'
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  orderType === 'takeaway_delivery' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Bawa Pulang / Kirim</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Nama, WA, & Alamat</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Informasi Form Pemesanan Sesuai Tipe */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                2. Data Pemesan
              </label>
              <span className="text-[11px] text-rose-500 font-medium">* Kolom wajib diisi</span>
            </div>

            {/* Nama Pemesan (Wajib untuk semua) */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Nama Pemesan</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Masukkan nama lengkap / panggilan Anda..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            {/* Pilihan 1: Makan di Tempat -> Minta Nomor Meja (Wajib) */}
            {orderType === 'dine_in' && (
              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <Hash className="w-3.5 h-3.5 text-amber-500" />
                  <span>Nomor Meja</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Misal: Meja 04, Meja 12, atau Area Lesehan..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            )}

            {/* Pilihan 2: Bawa Pulang / Kirim -> Minta No. WhatsApp & Alamat (Wajib) */}
            {orderType === 'takeaway_delivery' && (
              <>
                <div>
                  <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No. WhatsApp Pemesan</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Misal: 08123456789 (untuk konfirmasi pengiriman)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Alamat Lengkap Pengiriman / Lokasi Ambil</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Tulis alamat lengkap, nomor rumah, patokan / petunjuk arah..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
                  />
                </div>
              </>
            )}

            {/* Catatan Tambahan untuk Penjual (Opsional) */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>Catatan Tambahan untuk Penjual</span>
                <span className="text-[11px] text-slate-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="text"
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Misal: Tolong sendok garpu & tisu, sambal dipisah..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          </div>

          {/* 3. Pilihan Metode Pembayaran */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              3. Pilihan Pembayaran
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tunai</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-blue-600" />
                <span>QRIS</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                <span>Transfer</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Text Preview Accordion */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-1 font-medium transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>Lihat Format Pesan WhatsApp (*Cetak Tebal*)</span>
              </span>
              {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPreview && (
              <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto">
                {previewMessage}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Total {totalItems} menu:</span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
              {formatRupiah(subtotal)}
            </span>
          </div>

          {/* Validation Notice if Disabled */}
          {!isFormValid && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-2 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {orderType === 'dine_in'
                  ? 'Mohon lengkapi Nama Pemesan & Nomor Meja terlebih dahulu.'
                  : 'Mohon lengkapi Nama Pemesan, No. WhatsApp, & Alamat terlebih dahulu.'}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              title="Salin isi pesan ke papan klip"
              className="px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Pesan'}</span>
            </button>

            {/* WhatsApp Checkout Button with Strict Disabled Validation */}
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleProceedWhatsApp}
              className={`flex-1 h-12 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isFormValid
                  ? 'bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] shadow-md shadow-emerald-500/20 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
              </svg>
              <span>Kirim Pesanan ke WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
