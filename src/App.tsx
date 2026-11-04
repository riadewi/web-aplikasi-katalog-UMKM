import React, { useState, useEffect, useMemo } from 'react';
import { CategoryId, Product, CartItem, StoreInfo, OrderRecord, OrderStatus, ActiveTab } from './types';
import { DEFAULT_STORE_INFO, MOCK_PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/mockOrders';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingCart } from './components/FloatingCart';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreSettingsModal } from './components/StoreSettingsModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OwnerDashboard } from './components/OwnerDashboard';
import { CustomerTracking } from './components/CustomerTracking';
import { BottomNav } from './components/BottomNav';
import { Utensils, MessageCircle, Sparkles, Search, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_mode');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Store information state
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('store_info');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_STORE_INFO;
        }
      }
    }
    return DEFAULT_STORE_INFO;
  });

  // Global Orders Queue State
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('umkm_orders');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch {
          return INITIAL_ORDERS;
        }
      }
    }
    return INITIAL_ORDERS;
  });

  // Persist orders
  useEffect(() => {
    localStorage.setItem('umkm_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart_items');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Persist cart items
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter & Search states for catalog
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<{ order: OrderRecord; message: string } | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [isDarkMode]);

  // Persist store info
  const handleSaveStoreInfo = (newInfo: StoreInfo) => {
    setStoreInfo(newInfo);
    localStorage.setItem('store_info', JSON.stringify(newInfo));
  };

  // Order Queue actions
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, order_status: newStatus } : o))
    );
  };

  const handleTogglePaymentStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.order_id === orderId) {
          return {
            ...o,
            payment_status: o.payment_status === 'Lunas' ? 'Belum Bayar' : 'Lunas',
          };
        }
        return o;
      })
    );
  };

  const handleResetMockOrders = () => {
    setOrders(INITIAL_ORDERS);
    localStorage.setItem('umkm_orders', JSON.stringify(INITIAL_ORDERS));
  };

  // Cart handlers
  const handleAddToCart = (product: Product, quantity = 1, notes = '') => {
    if (product.isOutOfStock) return;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          notes: notes || updated[existingIndex].notes,
        };
        return updated;
      }
      return [...prev, { product, quantity, notes }];
    });
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleEditNotes = (item: CartItem) => {
    setSelectedProduct(item.product);
    setIsCartOpen(false);
  };

  // Checkout & Success Handlers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: OrderRecord, message: string) => {
    // 1. Save new order into global queue state
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Set last order details
    setLastOrder({ order: newOrder, message });
    setTrackingOrderId(newOrder.order_id);

    // 3. Clear cart
    setCartItems([]);

    // 4. Close checkout & show success modal
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const handleResetOrder = () => {
    setLastOrder(null);
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products for Catalog
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts for Category tabs
  const categoryCounts = useMemo(() => {
    return {
      all: MOCK_PRODUCTS.length,
      makanan: MOCK_PRODUCTS.filter((p) => p.category === 'makanan').length,
      minuman: MOCK_PRODUCTS.filter((p) => p.category === 'minuman').length,
      cemilan: MOCK_PRODUCTS.filter((p) => p.category === 'cemilan').length,
    };
  }, []);

  // Cart totals
  const totalCartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Map product id to quantity in cart for quick lookups
  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => {
      map.set(item.product.id, item.quantity);
    });
    return map;
  }, [cartItems]);

  const selectedProductInCart = selectedProduct
    ? cartItems.find((item) => item.product.id === selectedProduct.id)
    : null;

  // Pending orders count for notification badge on owner tab
  const pendingOrdersCount = useMemo(() => {
    return orders.filter(
      (o) => o.order_status === 'Menunggu Konfirmasi' || o.order_status === 'Sedang Dibuat'
    ).length;
  }, [orders]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24 md:pb-16">
      {/* 1. Header with Mode Tabs */}
      <Header
        storeInfo={storeInfo}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {/* VIEW 1: KATALOG MENU */}
        {activeTab === 'catalog' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Banner Singkat */}
            <Banner
              storeInfo={storeInfo}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />

            {/* Quick Action Bar to switch to Tracking or Owner */}
            <div className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 pl-1">
                Punya pesanan yang sedang diproses?
              </span>
              <button
                onClick={() => setActiveTab('tracking')}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lacak Pesanan Anda &rarr;</span>
              </button>
            </div>

            {/* Filter Kategori & Search Bar */}
            <section aria-label="Filter dan Pencarian Menu">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                counts={categoryCounts}
              />
            </section>

            {/* Product Catalog Grid */}
            <section aria-label="Daftar Menu">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 capitalize">
                  {searchQuery
                    ? `Hasil pencarian "${searchQuery}"`
                    : selectedCategory === 'all'
                    ? 'Semua Menu Rekomendasi'
                    : `Menu ${selectedCategory}`}
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                  {filteredProducts.length} menu tersedia
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <Utensils className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Menu Tidak Ditemukan
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Tidak ada menu yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Coba cari dengan kata kunci lain.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    Tampilkan Semua Menu
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantityInCart={quantityMap.get(product.id) || 0}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      onUpdateQuantity={handleUpdateQuantity}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Info Card / Trust Notice for UMKM */}
            <section aria-label="Informasi Pemesanan" className="mt-8 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Pemesanan Otomatis ke WhatsApp + Lacak Status Real-Time
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pelanggan dapat melacak status masakan, dan kasir dapat mengupdate pesanan di panel owner.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('owner')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
              >
                Buka Panel Kasir &rarr;
              </button>
            </section>
          </div>
        )}

        {/* VIEW 2: LACAK PESANAN PELANGGAN */}
        {activeTab === 'tracking' && (
          <CustomerTracking
            orders={orders}
            initialOrderId={trackingOrderId}
            storeInfo={storeInfo}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {/* VIEW 3: DASHBOARD OWNER / KASIR */}
        {activeTab === 'owner' && (
          <OwnerDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onTogglePaymentStatus={handleTogglePaymentStatus}
            onResetMockOrders={handleResetMockOrders}
          />
        )}

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} {storeInfo.name} · Katalog Digital & Sistem Order UMKM</p>
          <div className="flex items-center justify-center gap-3 text-[11px]">
            <button onClick={() => setActiveTab('catalog')} className="hover:underline">Katalog</button>
            <span>·</span>
            <button onClick={() => setActiveTab('tracking')} className="hover:underline">Lacak Pesanan</button>
            <span>·</span>
            <button onClick={() => setActiveTab('owner')} className="hover:underline">Mode Owner</button>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation (Always accessible with thumb) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Floating Cart (Only shown on catalog when items > 0) */}
      {activeTab === 'catalog' && (
        <FloatingCart
          totalItems={totalCartQuantity}
          subtotal={cartSubtotal}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirmAdd={(product, quantity, notes) => {
          handleAddToCart(product, quantity, notes);
          setSelectedProduct(null);
        }}
        initialQuantity={selectedProductInCart?.quantity || 1}
        initialNotes={selectedProductInCart?.notes || ''}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        onEditNotes={handleEditNotes}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        storeInfo={storeInfo}
        onOrderSuccess={handleOrderSuccess}
      />

      <StoreSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        storeInfo={storeInfo}
        onSave={handleSaveStoreInfo}
      />

      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        order={lastOrder?.order || null}
        message={lastOrder?.message || ''}
        onResetOrder={handleResetOrder}
        onTrackOrder={handleTrackSpecificOrder}
      />
    </div>
  );
}
