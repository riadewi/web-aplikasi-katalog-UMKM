import React from 'react';
import { CartItem } from '../types';
import { formatRupiah } from '../utils/formatters';
import { FoodIllustration } from './FoodIllustrations';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Utensils } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onEditNotes: (item: CartItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  onEditNotes,
}) => {
  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Keranjang Pesanan
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {totalQuantity} menu dipilih
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body: Cart Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100 dark:divide-slate-800/80">
          {cartItems.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <Utensils className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Keranjangmu masih kosong
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Yuk jelajahi katalog dan pilih menu makanan atau minuman favoritmu!
                </p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div key={item.product.id} className="pt-3.5 first:pt-0 flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center relative">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-b ${item.product.accentColor} p-1 -z-0 absolute inset-0 flex items-center justify-center`}>
                      <FoodIllustration type={item.product.iconType} className="w-full h-full" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 0)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Hapus dari keranjang"
                        aria-label="Hapus menu ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      {formatRupiah(item.product.price)} x {item.quantity} = <strong className="text-slate-800 dark:text-slate-200 font-semibold">{formatRupiah(itemTotal)}</strong>
                    </p>

                    {/* Notes preview or add note */}
                    <div className="mt-1">
                      {item.notes ? (
                        <button
                          onClick={() => onEditNotes(item)}
                          className="text-[11px] text-amber-700 dark:text-amber-300 italic text-left bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/60 block w-full truncate transition-colors"
                        >
                          Catatan: {item.notes} (edit)
                        </button>
                      ) : (
                        <button
                          onClick={() => onEditNotes(item)}
                          className="text-[11px] text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 underline decoration-dashed"
                        >
                          + Tambah catatan pesanan
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-2xs"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-2xs"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Price Summary & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
            {/* Calculation */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between items-center">
                <span>Subtotal ({totalQuantity} item)</span>
                <span className="font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                <span>Biaya Kemasan & Layanan</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Pembayaran</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                  {formatRupiah(subtotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm flex items-center justify-between px-5 shadow-md shadow-amber-500/20 active:scale-[0.99] transition-all"
            >
              <span>Lanjut ke Pengisian Data</span>
              <div className="flex items-center gap-1">
                <span className="font-mono tabular-nums text-xs bg-amber-600/60 px-2 py-0.5 rounded-md">
                  {formatRupiah(subtotal)}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
