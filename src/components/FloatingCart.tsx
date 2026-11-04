import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface FloatingCartProps {
  totalItems: number;
  subtotal: number;
  onOpenCart: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({
  totalItems,
  subtotal,
  onOpenCart,
}) => {
  if (totalItems === 0) return null;

  return (
    <aside aria-label="Ringkasan Keranjang" className="fixed bottom-14 md:bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-gradient-to-t from-slate-900/30 via-slate-900/5 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full h-14 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-2xl shadow-xl shadow-amber-500/25 px-4 flex items-center justify-between border border-amber-400/30 transition-all transform active:scale-[0.98] group"
        >
          {/* Left: Cart Icon & Item Count */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-red-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-amber-500 font-mono tabular-nums">
                {totalItems}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[11px] font-medium text-amber-100 uppercase tracking-wider block">
                {totalItems} Menu Dipilih
              </span>
              <span className="text-base font-extrabold text-white font-mono tabular-nums leading-tight">
                {formatRupiah(subtotal)}
              </span>
            </div>
          </div>

          {/* Right: Checkout CTA */}
          <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-amber-700 hover:bg-amber-50 px-3.5 py-2 rounded-xl transition-colors shadow-2xs group-hover:translate-x-0.5">
            <span>Lihat Keranjang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </aside>
  );
};
