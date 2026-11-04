import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';
import { FoodIllustration } from './FoodIllustrations';
import { X, Plus, Minus, Clock, Flame, MessageSquare, Star, Leaf, Tag } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onConfirmAdd: (product: Product, quantity: number, notes: string) => void;
  initialQuantity?: number;
  initialNotes?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onConfirmAdd,
  initialQuantity = 1,
  initialNotes = '',
}) => {
  const [qty, setQty] = useState<number>(initialQuantity || 1);
  const [notes, setNotes] = useState<string>(initialNotes || '');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setQty(initialQuantity > 0 ? initialQuantity : 1);
      setNotes(initialNotes || '');
      setImageLoaded(false);
      setImageError(false);
    }
  }, [product, initialQuantity, initialNotes]);

  if (!product) return null;

  const totalPrice = product.price * qty;
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle for Mobile */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Modal Header & Visual Preview */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {/* Skeleton while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center z-0">
              <span className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin opacity-40" />
            </div>
          )}

          {/* Photo */}
          {product.imageUrl && !imageError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-b ${product.accentColor} p-4 flex items-center justify-center`}>
              <FoodIllustration type={product.iconType} className="w-full h-full max-h-[160px] drop-shadow-md" />
            </div>
          )}

          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              {product.badge && (
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-md text-white shadow-sm flex items-center gap-1 ${
                    product.badge.toLowerCase().includes('diskon')
                      ? 'bg-rose-600'
                      : 'bg-amber-600'
                  }`}
                >
                  {product.badge.toLowerCase().includes('diskon') && <Tag className="w-3 h-3" />}
                  <span>{product.badge}</span>
                </span>
              )}
              {product.spiciness && product.spiciness > 0 ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-600 text-white flex items-center gap-1 shadow-sm">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Level {product.spiciness === 1 ? 'Sedang' : 'Pedas'}</span>
                </span>
              ) : null}
              {product.isVegetarian && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Vegetarian</span>
                </span>
              )}
            </div>

            {product.rating && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-black/60 text-amber-300 flex items-center gap-1 backdrop-blur-md border border-white/10 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {product.name}
              </h2>
              <div className="text-right shrink-0">
                {hasDiscount && (
                  <span className="line-through text-xs text-slate-400 font-mono block">
                    {formatRupiah(product.originalPrice!)}
                  </span>
                )}
                <span className="text-lg sm:text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                  {formatRupiah(product.price)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex-wrap">
              <span className="capitalize">{product.category}</span>
              {product.soldCount && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{product.soldCount}</span>
                </>
              )}
              {product.preparationTime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Siap dlm: {product.preparationTime}</span>
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Special Request Notes */}
          <div className="pt-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              <span>Catatan Khusus Pesanan (Opsional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cth: Pedas sedang, jangan pakai bawang goreng, es sedikit / dipisah..."
              rows={2}
              className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah Pesanan
            </span>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Kurangi jumlah"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors shadow-2xs font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-slate-900 dark:text-white font-mono tabular-nums text-sm">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                aria-label="Tambah jumlah"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors shadow-2xs font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-700">
          <button
            onClick={() => {
              onConfirmAdd(product, qty, notes);
              onClose();
            }}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm flex items-center justify-between px-5 shadow-md shadow-amber-500/20 active:scale-[0.99] transition-all"
          >
            <span>Tambahkan ke Keranjang</span>
            <span className="font-mono tabular-nums bg-amber-600/60 px-2.5 py-1 rounded-lg text-xs">
              {formatRupiah(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
