import { OrderRecord } from '../types';
import { MOCK_PRODUCTS } from './products';
import { getFormattedTime } from '../utils/formatters';

const now = Date.now();
const minutesAgo = (mins: number) => now - mins * 60 * 1000;

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    order_id: 'ORD-8291',
    order_status: 'Sedang Dibuat',
    payment_status: 'Lunas',
    created_at: getFormattedTime(minutesAgo(15)),
    created_timestamp: minutesAgo(15),
    customerName: 'Budi Santoso',
    orderType: 'dine_in',
    tableNumber: 'Meja 04',
    deliveryAddress: '',
    customerPhone: '081234567890',
    generalNotes: 'Minta sendok garpu & tisu ya.',
    paymentMethod: 'qris',
    items: [
      {
        product: MOCK_PRODUCTS[0], // Nasi Goreng Spesial (25.000)
        quantity: 2,
        notes: 'Satu pedas sedang, satu tidak pedas',
      },
      {
        product: MOCK_PRODUCTS[6], // Es Kopi Susu Gula Aren (18.000)
        quantity: 2,
        notes: 'Less ice',
      },
    ],
    subtotal: 86000,
  },
  {
    order_id: 'ORD-7342',
    order_status: 'Dalam Pengantaran',
    payment_status: 'Belum Bayar',
    created_at: getFormattedTime(minutesAgo(35)),
    created_timestamp: minutesAgo(35),
    customerName: 'Siti Rahma',
    orderType: 'takeaway_delivery',
    tableNumber: '',
    deliveryAddress: 'Jl. Kaliurang KM 6.5 Gang Megatruh No. 12 (Pagar Hitam)',
    customerPhone: '085712348899',
    generalNotes: 'Nanti telepon kalau sudah sampai pagar ya mas.',
    paymentMethod: 'cash',
    items: [
      {
        product: MOCK_PRODUCTS[1], // Ayam Bakar Madu (28.000)
        quantity: 1,
        notes: 'Sambal terasi dipisah',
      },
      {
        product: MOCK_PRODUCTS[8], // Es Teh Solo (6.000)
        quantity: 2,
        notes: 'Manis sedang',
      },
      {
        product: MOCK_PRODUCTS[14], // Tempe Mendoan (14.000)
        quantity: 1,
        notes: 'Goreng agak garing',
      },
    ],
    subtotal: 54000,
  },
  {
    order_id: 'ORD-9104',
    order_status: 'Menunggu Konfirmasi',
    payment_status: 'Belum Bayar',
    created_at: getFormattedTime(minutesAgo(5)),
    created_timestamp: minutesAgo(5),
    customerName: 'Doni Prasetyo',
    orderType: 'dine_in',
    tableNumber: 'Meja 08',
    deliveryAddress: '',
    customerPhone: '081399887766',
    generalNotes: 'Dine in 3 orang',
    paymentMethod: 'cash',
    items: [
      {
        product: MOCK_PRODUCTS[2], // Sate Ayam Madura (26.000)
        quantity: 2,
        notes: 'Bumbu kacang banyakin',
      },
      {
        product: MOCK_PRODUCTS[7], // Es Cendol Nangka (15.000)
        quantity: 2,
      },
    ],
    subtotal: 82000,
  },
  {
    order_id: 'ORD-5520',
    order_status: 'Selesai',
    payment_status: 'Lunas',
    created_at: getFormattedTime(minutesAgo(75)),
    created_timestamp: minutesAgo(75),
    customerName: 'Annisa Putri',
    orderType: 'dine_in',
    tableNumber: 'Meja 02',
    deliveryAddress: '',
    customerPhone: '082133445566',
    generalNotes: '',
    paymentMethod: 'transfer',
    items: [
      {
        product: MOCK_PRODUCTS[3], // Mie Goreng Jawa (22.000)
        quantity: 1,
      },
      {
        product: MOCK_PRODUCTS[9], // Jus Alpukat (18.000)
        quantity: 1,
      },
    ],
    subtotal: 40000,
  },
];
