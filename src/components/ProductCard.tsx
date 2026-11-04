import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';
import { FoodIllustration } from './FoodIllustrations';
import { Plus, Minus, Star, Flame, Leaf, Clock, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

  return (
    <div
      onClick={() => {
        if (!product.isOutOfStock) onSelectProduct(product);
      }}
      className={`group relative flex flex-col justify-between bg-white dark:bg-slate-800/95 rounded-2xl border transition-all duration-200 overflow-hidden ${
        product.isOutOfStock
          ? 'border-slate-200/60 dark:border-slate-800/60 opacity-75 cursor-not-allowed'
          : 'border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-amber-500/50 dark:hover:border-amber-500/50 cursor-pointer'
      }`}
    >
      {/* 1. Realistic Food Image Container with 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
        {/* Loading Placeholder Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center z-0">
            <span className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin opacity-40" />
          </div>
        )}

        {/* Real Food Photography */}
        {product.imageUrl && !imageError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transform transition-all duration-500 ${
              product.isOutOfStock
                ? 'opacity-50 grayscale-[40%]'
                : 'group-hover:scale-108'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          /* High-Fidelity Vector Fallback if Image Fails or is Unavailable */
          <div className={`w-full h-full bg-gradient-to-b ${product.accentColor} p-3 flex items-center justify-center`}>
            <div className={`w-full h-full flex items-center justify-center ${product.isOutOfStock ? 'opacity-40 grayscale-[35%]' : 'group-hover:scale-105 transition-transform'}`}>
              <FoodIllustration type={product.iconType} className="w-full h-full max-h-[140px] drop-shadow-sm" />
            </div>
          </div>
        )}

        {/* Subtle Scrim Gradient on Top & Bottom for High Contrast Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* 2. Realistic Badges & Highlights */}
        {/* Top-Left: Badge Promo / Best Seller */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none z-10">
          {product.isOutOfStock ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-sm">
              Habis
            </span>
          ) : product.badge ? (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white shadow-sm flex items-center gap-1 backdrop-blur-xs ${
                product.badge.toLowerCase().includes('diskon')
                  ? 'bg-rose-600'
                  : product.badge.toLowerCase().includes('best') || product.badge.toLowerCase().includes('terlaris')
                  ? 'bg-amber-600'
                  : 'bg-slate-900/80 border border-white/20'
              }`}
            >
              {product.badge.toLowerCase().includes('diskon') && <Tag className="w-2.5 h-2.5" />}
              <span>{product.badge}</span>
            </span>
          ) : null}
        </div>

        {/* Top-Right: Rating & Indicator */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 pointer-events-none z-10">
          {/* Spicy Level Badge */}
          {product.spiciness && product.spiciness > 0 && !product.isOutOfStock ? (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-600/90 text-white flex items-center gap-0.5 shadow-sm backdrop-blur-xs">
              <Flame className="w-3 h-3 fill-current" />
              <span>{product.spiciness === 1 ? 'Sedang' : 'Pedas'}</span>
            </span>
          ) : null}

          {/* Vegetarian Badge */}
          {product.isVegetarian && !product.isOutOfStock && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-0.5 shadow-sm">
              <Leaf className="w-3 h-3 fill-current" />
            </span>
          )}

          {/* Rating Badge */}
          {product.rating && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-amber-300 flex items-center gap-1 shadow-sm backdrop-blur-md border border-white/10 font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </span>
          )}
        </div>

        {/* Bottom Banner on Photo: Preparation Time & Sold count */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/95 pointer-events-none z-10">
          {product.soldCount ? (
            <span className="text-[10px] font-medium drop-shadow-md">
              {product.soldCount}
            </span>
          ) : <span />}

          {product.preparationTime && (
            <span className="text-[10px] font-medium flex items-center gap-1 drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>{product.preparationTime}</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Product Information Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-0.5">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Appetizing Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 4. Realistic Price Layout & Quick Action Controls */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
          {/* Price Container */}
          <div className="min-w-0">
            {hasDiscount && (
              <span className="line-through text-[11px] text-slate-400 dark:text-slate-500 font-mono tabular-nums block leading-none">
                {formatRupiah(product.originalPrice!)}
              </span>
            )}
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm sm:text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                {formatRupiah(product.price)}
              </span>
            </div>
          </div>

          {/* Quick Action Button (+ / - directly on card) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            {product.isOutOfStock ? (
              <button
                disabled
                aria-label={`${product.name} sedang habis`}
                className="min-h-[38px] px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 cursor-not-allowed"
              >
                Habis
              </button>
            ) : quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                aria-label={`Tambah ${product.name} ke keranjang`}
                className="min-h-[38px] px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 hover:shadow-sm active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tambah</span>
              </button>
            ) : (
              <div className="flex items-center bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 rounded-xl p-0.5 shadow-2xs">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  aria-label="Kurangi pesanan"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-800 dark:text-amber-200 hover:bg-amber-200/60 dark:hover:bg-amber-900 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-amber-900 dark:text-amber-100 font-mono tabular-nums">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                  aria-label="Tambah pesanan"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-800 dark:text-amber-200 hover:bg-amber-200/60 dark:hover:bg-amber-900 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
