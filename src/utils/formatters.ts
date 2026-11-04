import { CartItem, OrderDetails, StoreInfo } from '../types';

/**
 * Format a number to Indonesian Rupiah currency format.
 * Example: 25000 -> "Rp 25.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clean phone number for WhatsApp link
 * e.g. 0812-3456-7890 -> 6281234567890
 */
export function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

/**
 * Creates a standard WhatsApp link
 * Format: https://wa.me/[NOMOR_HP]?text=${encodeURIComponent(pesan)}
 */
export function createWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Format timestamp to e.g. "12:45 WIB"
 */
export function getFormattedTime(timestamp: number = Date.now()): string {
  const d = new Date(timestamp);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes} WIB`;
}

/**
 * Generate unique 6-character order code, e.g. "ORD-8291"
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${randomNum}`;
}

/**
 * Builds a WhatsApp formatted order message
 */
export function generateWhatsAppMessage(
  store: StoreInfo,
  cartItems: CartItem[],
  orderDetails: OrderDetails,
  subtotal: number,
  orderNumber: string
): string {
  const dateStr = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  const orderTypeDetails =
    orderDetails.orderType === 'dine_in'
      ? `• *Tipe Pemesanan:* 🍽️ Makan di Tempat (Dine-in)\n• *Nomor Meja:* *${orderDetails.tableNumber || '-'}*`
      : `• *Tipe Pemesanan:* 🛵 Bawa Pulang / Kirim\n• *No. WhatsApp Pemesan:* *${orderDetails.customerPhone || '-'}*\n• *Alamat Pengiriman:* *${orderDetails.deliveryAddress || '-'}*`;

  const paymentMethodLabel =
    orderDetails.paymentMethod === 'cash'
      ? '💵 Tunai / Bayar di Kasir'
      : orderDetails.paymentMethod === 'qris'
      ? '📱 QRIS'
      : '🏦 Transfer Bank';

  let itemsList = '';
  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    itemsList += `${index + 1}. *${item.product.name}*\n`;
    itemsList += `   • ${item.quantity}x @ ${formatRupiah(item.product.price)} = *${formatRupiah(itemTotal)}*\n`;
    if (item.notes && item.notes.trim()) {
      itemsList += `   _Catatan: ${item.notes.trim()}_\n`;
    }
  });

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cleanOrderCode = orderNumber.startsWith('#') ? orderNumber : `#${orderNumber}`;

  const message = `Halo *${store.name}*! 👋\nSaya ingin memesan menu dengan rincian berikut:\n\n` +
    `🔖 *ID Pesanan:* *${cleanOrderCode}*\n` +
    `📅 *Waktu:* ${dateStr}\n` +
    `🔍 *Lacak Pesanan:* Buka tab Lacak Pesanan dan masukkan *${cleanOrderCode}*\n\n` +
    `👤 *INFORMASI PEMESAN*\n` +
    `• *Nama Pemesan:* *${orderDetails.customerName || '-'}*\n` +
    `${orderTypeDetails}\n` +
    `• *Metode Bayar:* ${paymentMethodLabel}\n\n` +
    `📋 *DAFTAR PESANAN (${totalQuantity} item)*\n` +
    `────────────────────\n` +
    `${itemsList}` +
    `────────────────────\n` +
    `*TOTAL PEMBAYARAN: ${formatRupiah(subtotal)}*\n\n` +
    `${orderDetails.generalNotes?.trim() ? `💬 *Catatan Tambahan:*\n"${orderDetails.generalNotes.trim()}"\n\n` : ''}` +
    `Mohon segera diproses dan dikonfirmasi ketersediaannya ya. Terima kasih banyak! 🙏`;

  return message;
}
