import React from 'react';
import { StoreInfo } from '../types';
import { MapPin, Clock, MessageSquareQuote, Sparkles, ChefHat } from 'lucide-react';

interface BannerProps {
  storeInfo: StoreInfo;
  onOpenSettings: () => void;
}

export const Banner: React.FC<BannerProps> = ({ storeInfo, onOpenSettings }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-2xl p-4 sm:p-6 shadow-sm border border-amber-600/30">
      {/* Background Decorative Subtle Circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-black/10 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Tagline */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm text-amber-50">
            <ChefHat className="w-3.5 h-3.5 text-amber-200" />
            <span>Katalog Resmi UMKM Kuliner</span>
          </div>
          <div className="text-[11px] font-medium text-amber-100 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{storeInfo.operatingHours}</span>
          </div>
        </div>

        {/* Main Banner Message */}
        <div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            {storeInfo.name}
          </h2>
          <p className="text-xs sm:text-sm text-amber-50/90 mt-1 max-w-xl leading-relaxed">
            Pilih menu favoritmu, tambahkan ke keranjang, dan pesan langsung ke kasir via WhatsApp. Cepat, praktis, tanpa perlu download aplikasi!
          </p>
        </div>

        {/* Store Location & WhatsApp destination preview */}
        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-amber-100 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-200" />
            <span className="truncate">{storeInfo.address}</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-[11px] font-medium text-white hover:text-amber-200 underline underline-offset-2 shrink-0 transition-colors"
          >
            Ubah No. WA: +{storeInfo.whatsappNumber}
          </button>
        </div>
      </div>
    </div>
  );
};
