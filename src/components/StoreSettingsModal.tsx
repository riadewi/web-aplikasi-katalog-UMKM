import React, { useState } from 'react';
import { StoreInfo } from '../types';
import { X, Save, RotateCcw, Store, Phone, MapPin, Clock } from 'lucide-react';
import { DEFAULT_STORE_INFO } from '../data/products';
import { cleanPhoneNumber } from '../utils/formatters';

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
  onSave: (newInfo: StoreInfo) => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
  storeInfo,
  onSave,
}) => {
  const [name, setName] = useState(storeInfo.name);
  const [tagline, setTagline] = useState(storeInfo.tagline);
  const [address, setAddress] = useState(storeInfo.address);
  const [whatsappNumber, setWhatsappNumber] = useState(storeInfo.whatsappNumber);
  const [operatingHours, setOperatingHours] = useState(storeInfo.operatingHours);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreInfo = {
      name: name.trim() || DEFAULT_STORE_INFO.name,
      tagline: tagline.trim() || DEFAULT_STORE_INFO.tagline,
      address: address.trim() || DEFAULT_STORE_INFO.address,
      whatsappNumber: cleanPhoneNumber(whatsappNumber.trim()) || DEFAULT_STORE_INFO.whatsappNumber,
      operatingHours: operatingHours.trim() || DEFAULT_STORE_INFO.operatingHours,
      isOpen: true,
    };
    onSave(updated);
    onClose();
  };

  const handleReset = () => {
    setName(DEFAULT_STORE_INFO.name);
    setTagline(DEFAULT_STORE_INFO.tagline);
    setAddress(DEFAULT_STORE_INFO.address);
    setWhatsappNumber(DEFAULT_STORE_INFO.whatsappNumber);
    setOperatingHours(DEFAULT_STORE_INFO.operatingHours);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Informasi & Nomor WhatsApp UMKM
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sesuaikan dengan data toko Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-3.5 overflow-y-auto flex-1">
          {/* Store Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nama Toko / Warung
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* WhatsApp Destination */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nomor WhatsApp Tujuan Pesanan</span>
              </span>
              <span className="text-[11px] text-emerald-600 font-normal">Format: 628xxx</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Misal: 6281234567890 atau 081234567890"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Setiap kali pembeli checkout, pesanan otomatis dikirim ke nomor WhatsApp ini.
            </p>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Slogan / Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Alamat Lengkap Toko</span>
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none"
            />
          </div>

          {/* Operating Hours */}
          <div>
            <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Jam Operasional</span>
            </label>
            <input
              type="text"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              placeholder="09:00 - 21:30 WIB"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
