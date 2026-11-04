export type CategoryId = 'all' | 'makanan' | 'minuman' | 'cemilan';

export interface Product {
  id: string;
  name: string;
  category: 'makanan' | 'minuman' | 'cemilan';
  price: number;
  description: string;
  badge?: string;
  spiciness?: 0 | 1 | 2 | 3;
  preparationTime?: string;
  isPopular?: boolean;
  isOutOfStock?: boolean;
  imageUrl?: string;
  originalPrice?: number;
  rating?: number;
  soldCount?: string;
  isVegetarian?: boolean;
  discountPercentage?: number;
  accentColor: string;
  iconType: 'rice' | 'chicken' | 'satay' | 'noodle' | 'meat' | 'soup' | 'coffee' | 'cendol' | 'tea' | 'avocado' | 'orange' | 'ginger' | 'banana' | 'tofu' | 'tempeh';
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderType = 'dine_in' | 'takeaway_delivery';

export type PaymentMethod = 'cash' | 'qris' | 'transfer';

export interface OrderDetails {
  customerName: string;
  orderType: OrderType;
  tableNumber: string;
  deliveryAddress: string;
  customerPhone?: string;
  generalNotes?: string;
  paymentMethod: PaymentMethod;
}

export type OrderStatus =
  | 'Menunggu Konfirmasi'
  | 'Sedang Dibuat'
  | 'Dalam Pengantaran'
  | 'Selesai'
  | 'Dibatalkan';

export type PaymentStatus = 'Belum Bayar' | 'Lunas';

export interface OrderRecord {
  order_id: string; // e.g. "ORD-8291"
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string; // e.g. "12:45 WIB"
  created_timestamp: number;
  customerName: string;
  orderType: OrderType;
  tableNumber: string;
  deliveryAddress: string;
  customerPhone?: string;
  generalNotes?: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  whatsappNumber: string; // e.g. "6281234567890"
  operatingHours: string;
  isOpen: boolean;
}

export type ActiveTab = 'catalog' | 'tracking' | 'owner';
