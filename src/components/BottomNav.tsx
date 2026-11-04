import React from 'react';
import { ActiveTab } from '../types';
import { Utensils, Search, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingOrdersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  pendingOrdersCount = 0,
}) => {
  return (
    <nav
      aria-label="Navigasi Utama Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors shadow-lg"
    >
      <div className="grid grid-cols-3 h-14 max-w-md mx-auto items-center px-2">
        {/* Tab 1: Katalog */}
        <button
          onClick={() => onSelectTab('catalog')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
            activeTab === 'catalog'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Utensils className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Katalog</span>
          {activeTab === 'catalog' && (
            <span className="w-6 h-0.5 bg-amber-500 rounded-full absolute bottom-1" />
          )}
        </button>

        {/* Tab 2: Lacak Pesanan */}
        <button
          onClick={() => onSelectTab('tracking')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
            activeTab === 'tracking'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Lacak Pesanan</span>
          {activeTab === 'tracking' && (
            <span className="w-6 h-0.5 bg-amber-500 rounded-full absolute bottom-1" />
          )}
        </button>

        {/* Tab 3: Panel Owner */}
        <button
          onClick={() => onSelectTab('owner')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
            activeTab === 'owner'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <ShieldCheck className="w-4 h-4 mb-0.5" />
            {pendingOrdersCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] rounded-full bg-rose-600 text-white text-[9px] font-mono flex items-center justify-center px-0.5">
                {pendingOrdersCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Panel Owner</span>
          {activeTab === 'owner' && (
            <span className="w-6 h-0.5 bg-amber-500 rounded-full absolute bottom-1" />
          )}
        </button>
      </div>
    </nav>
  );
};
