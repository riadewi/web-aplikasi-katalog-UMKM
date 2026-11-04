import React from 'react';
import { ActiveTab, StoreInfo } from '../types';
import { Store, Moon, Sun, Settings, Utensils, Search, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  storeInfo: StoreInfo;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingOrdersCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  storeInfo,
  isDarkMode,
  onToggleTheme,
  onOpenSettings,
  activeTab,
  onSelectTab,
  pendingOrdersCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div
          onClick={() => onSelectTab('catalog')}
          className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate tracking-tight group-hover:text-amber-600 transition-colors">
                {storeInfo.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Buka</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {storeInfo.tagline}
            </p>
          </div>
        </div>

        {/* Center Zone: Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onSelectTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Katalog Menu</span>
          </button>

          <button
            onClick={() => onSelectTab('tracking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tracking'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Lacak Pesanan</span>
          </button>

          <button
            onClick={() => onSelectTab('owner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'owner'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Panel Owner</span>
            {pendingOrdersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-mono flex items-center justify-center">
                {pendingOrdersCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick button to toggle owner on mobile */}
          <button
            onClick={() => onSelectTab(activeTab === 'owner' ? 'catalog' : 'owner')}
            className={`md:hidden px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              activeTab === 'owner'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Beralih ke Panel Owner / Kasir"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner</span>
            {pendingOrdersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-mono flex items-center justify-center">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            title="Pengaturan Warung & No. WhatsApp"
            className="min-h-[38px] px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Info Toko</span>
          </button>

          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            aria-label="Toggle theme"
            className="min-h-[38px] min-w-[38px] p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-lg transition-colors flex items-center justify-center shrink-0"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
