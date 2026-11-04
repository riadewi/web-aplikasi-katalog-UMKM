import React from 'react';
import { Product } from '../types';

interface FoodIllustrationProps {
  type: Product['iconType'];
  className?: string;
}

export const FoodIllustration: React.FC<FoodIllustrationProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'rice':
      // Nasi Goreng Spesial
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ceramic Plate */}
          <ellipse cx="100" cy="105" rx="88" ry="42" fill="#E2E8F0" />
          <ellipse cx="100" cy="102" rx="80" ry="38" fill="#FFFFFF" />
          <ellipse cx="100" cy="100" rx="72" ry="32" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          {/* Banana Leaf Base */}
          <path d="M40 98 C60 75 140 75 160 98 C145 118 55 118 40 98 Z" fill="#15803D" opacity="0.85" />
          <path d="M45 98 Q100 85 155 98" stroke="#166534" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Nasi Goreng Mound */}
          <ellipse cx="98" cy="95" rx="55" ry="24" fill="#B45309" />
          <ellipse cx="98" cy="92" rx="52" ry="22" fill="#D97706" />
          <ellipse cx="98" cy="90" rx="48" ry="20" fill="#F59E0B" />
          {/* Grains texture */}
          <circle cx="80" cy="92" r="1.5" fill="#78350F" />
          <circle cx="95" cy="98" r="1.5" fill="#78350F" />
          <circle cx="112" cy="90" r="1.5" fill="#78350F" />
          <circle cx="120" cy="95" r="1.5" fill="#78350F" />
          <circle cx="75" cy="85" r="1.5" fill="#78350F" />
          <circle cx="90" cy="84" r="1.5" fill="#FEF3C7" />
          {/* Fried Egg (Telur Mata Sapi) */}
          <path d="M85 70 C70 72 65 85 75 92 C85 96 115 95 120 85 C122 75 105 68 85 70 Z" fill="#FFFFFF" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))" />
          <circle cx="93" cy="81" r="11" fill="#F59E0B" />
          <circle cx="90" cy="78" r="3" fill="#FCD34D" opacity="0.8" />
          {/* Sliced Cucumber & Tomato */}
          <circle cx="138" cy="95" r="11" fill="#22C55E" />
          <circle cx="138" cy="95" r="7" fill="#86EFAC" />
          <circle cx="145" cy="85" r="10" fill="#EF4444" />
          <circle cx="145" cy="85" r="5" fill="#FCA5A5" />
          {/* Kerupuk */}
          <ellipse cx="60" cy="80" rx="14" ry="10" fill="#FEF08A" stroke="#FBBF24" strokeWidth="1.5" transform="rotate(-15 60 80)" />
          {/* Fried Shallots */}
          <path d="M96 73 L100 75 M104 78 L108 77 M82 85 L85 87" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'chicken':
      // Ayam Bakar Madu
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Banana Leaf Platter */}
          <ellipse cx="100" cy="105" rx="85" ry="42" fill="#166534" />
          <ellipse cx="100" cy="100" rx="80" ry="38" fill="#15803D" />
          <path d="M30 100 Q100 80 170 100" stroke="#14532D" strokeWidth="1.5" />
          {/* Glazed Grilled Chicken Thigh & Drumstick */}
          <path d="M70 100 C60 80 80 60 110 65 C135 68 145 88 135 105 C125 115 85 118 70 100 Z" fill="#78350F" />
          <path d="M78 95 C70 82 86 68 108 72 C128 75 136 90 128 102 C120 110 88 112 78 95 Z" fill="#9A3412" />
          <path d="M85 90 C80 82 92 74 105 76 C118 78 124 88 118 96 C112 102 92 104 85 90 Z" fill="#C2410C" />
          {/* Grill Marks */}
          <line x1="88" y1="80" x2="115" y2="76" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
          <line x1="92" y1="92" x2="122" y2="86" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
          <line x1="96" y1="102" x2="124" y2="98" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
          {/* Glossy Honey Highlights */}
          <ellipse cx="102" cy="82" rx="6" ry="2" fill="#FDE68A" opacity="0.6" />
          <ellipse cx="112" cy="94" rx="5" ry="2" fill="#FDE68A" opacity="0.6" />
          {/* Sambal Terasi Cobek Mini */}
          <ellipse cx="52" cy="95" rx="18" ry="10" fill="#1E293B" />
          <ellipse cx="52" cy="93" rx="14" ry="7" fill="#DC2626" />
          <circle cx="50" cy="92" r="1" fill="#FEF08A" />
          <circle cx="55" cy="94" r="1" fill="#FEF08A" />
          {/* Lime / Jeruk Limau */}
          <circle cx="145" cy="98" r="8" fill="#84CC16" />
          <circle cx="145" cy="98" r="6" fill="#BEF264" />
          {/* Basil Leaf */}
          <path d="M135 110 C145 105 155 112 150 120 C140 120 135 115 135 110 Z" fill="#15803D" />
        </svg>
      );

    case 'satay':
      // Sate Ayam Madura
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handmade Clay Dish */}
          <ellipse cx="100" cy="105" rx="86" ry="40" fill="#78350F" opacity="0.3" />
          <ellipse cx="100" cy="100" rx="82" ry="36" fill="#A16207" />
          <ellipse cx="100" cy="97" rx="76" ry="32" fill="#CA8A04" />
          <ellipse cx="100" cy="95" rx="70" ry="28" fill="#FEF3C7" />
          {/* Peanut Sauce Base */}
          <ellipse cx="100" cy="93" rx="58" ry="22" fill="#78350F" />
          <ellipse cx="100" cy="91" rx="52" ry="18" fill="#92400E" />
          <ellipse cx="98" cy="90" rx="46" ry="15" fill="#B45309" />
          {/* Skewers 1, 2, 3 */}
          <g transform="rotate(-18 100 85)">
            <line x1="30" y1="85" x2="165" y2="85" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="75" cy="85" r="7" fill="#451A03" />
            <circle cx="92" cy="85" r="8" fill="#78350F" />
            <circle cx="110" cy="85" r="7.5" fill="#451A03" />
            <circle cx="127" cy="85" r="7" fill="#92400E" />
          </g>
          <g transform="rotate(-4 100 90)">
            <line x1="32" y1="90" x2="168" y2="90" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="78" cy="90" r="7.5" fill="#78350F" />
            <circle cx="96" cy="90" r="8.5" fill="#451A03" />
            <circle cx="114" cy="90" r="8" fill="#92400E" />
            <circle cx="131" cy="90" r="7" fill="#78350F" />
          </g>
          <g transform="rotate(12 100 95)">
            <line x1="34" y1="95" x2="166" y2="95" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="95" r="7" fill="#92400E" />
            <circle cx="98" cy="95" r="8" fill="#78350F" />
            <circle cx="116" cy="95" r="7.5" fill="#451A03" />
            <circle cx="133" cy="95" r="7" fill="#78350F" />
          </g>
          {/* Sweet Soy Sauce Drizzle */}
          <path d="M75 80 Q95 72 120 78 Q135 85 140 92" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
          {/* Shallots & Chilli pieces */}
          <circle cx="85" cy="88" r="3" fill="#BE185D" />
          <circle cx="120" cy="98" r="3" fill="#DC2626" />
          <circle cx="105" cy="94" r="2.5" fill="#22C55E" />
        </svg>
      );

    case 'noodle':
      // Mie Goreng Jawa Rempah
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bowl Plate */}
          <ellipse cx="100" cy="108" rx="82" ry="38" fill="#E2E8F0" />
          <ellipse cx="100" cy="102" rx="76" ry="34" fill="#0F766E" />
          <ellipse cx="100" cy="99" rx="70" ry="29" fill="#115E59" />
          {/* Noodles Mesh */}
          <ellipse cx="100" cy="92" rx="55" ry="22" fill="#D97706" />
          <path d="M65 92 Q85 75 110 88 T140 85" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M60 85 Q90 100 120 82 T145 92" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M70 95 Q100 78 125 96 T138 88" stroke="#D97706" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M75 88 Q95 82 115 90 T130 84" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Greens (Sawi) */}
          <path d="M70 82 C75 75 90 78 85 86 C80 90 72 88 70 82 Z" fill="#16A34A" />
          <path d="M125 80 C135 76 142 85 135 90 C128 92 124 85 125 80 Z" fill="#15803D" />
          {/* Meatballs / Bakso sliced */}
          <ellipse cx="90" cy="85" rx="8" ry="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          <ellipse cx="112" cy="88" rx="7" ry="5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          {/* Fried Shallots garnish */}
          <circle cx="98" cy="80" r="1.5" fill="#78350F" />
          <circle cx="103" cy="83" r="1.5" fill="#78350F" />
          <circle cx="108" cy="79" r="1.5" fill="#78350F" />
          {/* Chopsticks */}
          <line x1="130" y1="50" x2="80" y2="95" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <line x1="140" y1="48" x2="88" y2="92" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'meat':
      // Rendang Sapi Padang
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Plate */}
          <ellipse cx="100" cy="105" rx="84" ry="40" fill="#E2E8F0" />
          <ellipse cx="100" cy="100" rx="78" ry="36" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="100" cy="98" rx="66" ry="28" fill="#1C1917" opacity="0.08" />
          {/* Rendang Dark Spiced Gravy Base */}
          <ellipse cx="100" cy="96" rx="55" ry="22" fill="#451A03" />
          <ellipse cx="100" cy="94" rx="50" ry="19" fill="#78350F" />
          {/* Big Beef Chunks */}
          <path d="M68 94 C65 80 82 72 95 78 C102 82 100 95 90 98 C80 100 70 98 68 94 Z" fill="#291307" />
          <path d="M72 92 C70 82 82 76 92 80 C98 84 96 94 88 96 C80 97 74 96 72 92 Z" fill="#451A03" />
          <path d="M98 90 C96 75 118 72 130 80 C136 86 134 98 122 100 C110 102 100 98 98 90 Z" fill="#291307" />
          <path d="M102 88 C100 78 116 75 125 82 C130 87 128 95 118 97 C110 99 104 95 102 88 Z" fill="#451A03" />
          {/* Toasted Grated Coconut / Serundeng Rempah */}
          <circle cx="82" cy="85" r="1.5" fill="#D97706" />
          <circle cx="90" cy="88" r="1.5" fill="#B45309" />
          <circle cx="110" cy="84" r="1.5" fill="#F59E0B" />
          <circle cx="118" cy="90" r="1.5" fill="#D97706" />
          <circle cx="125" cy="86" r="1.5" fill="#B45309" />
          {/* Bay / Lime Leaf */}
          <path d="M88 72 C98 66 106 72 102 80 C94 82 88 78 88 72 Z" fill="#15803D" />
          {/* Red Chili Slices */}
          <line x1="95" y1="88" x2="105" y2="92" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'soup':
      // Soto Ayam Ambengan
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bowl */}
          <ellipse cx="100" cy="115" rx="55" ry="18" fill="#CBD5E1" />
          <path d="M45 75 Q40 120 100 120 Q160 120 155 75 Z" fill="#0284C7" />
          <ellipse cx="100" cy="75" rx="55" ry="22" fill="#0369A1" />
          {/* Golden Yellow Broth */}
          <ellipse cx="100" cy="74" rx="50" ry="18" fill="#FACC15" />
          <ellipse cx="100" cy="73" rx="46" ry="15" fill="#EAB308" />
          {/* Soun & Chicken Shreds */}
          <path d="M80 72 Q95 65 115 74" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M75 75 Q90 68 120 73" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M88 76 Q105 70 122 78" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Boiled Egg Half */}
          <ellipse cx="72" cy="70" rx="9" ry="7" fill="#FFFFFF" />
          <circle cx="72" cy="70" r="4.5" fill="#F59E0B" />
          {/* Lime Wedge */}
          <path d="M125 65 C132 60 140 68 135 75 Z" fill="#84CC16" />
          {/* Koya Powder */}
          <circle cx="100" cy="70" r="1.5" fill="#FEF08A" />
          <circle cx="104" cy="72" r="1.5" fill="#FEF08A" />
          <circle cx="98" cy="74" r="1.5" fill="#FEF08A" />
          {/* Steam */}
          <path d="M92 55 Q96 45 92 35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M106 58 Q110 48 106 38" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );

    case 'coffee':
      // Es Kopi Susu Gula Aren
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coaster Shadow */}
          <ellipse cx="100" cy="140" rx="42" ry="14" fill="#000000" opacity="0.12" />
          {/* Tall Glass Body */}
          <path d="M72 40 L78 132 Q100 140 122 132 L128 40 Z" fill="#E2E8F0" opacity="0.4" />
          <path d="M74 42 L80 130 Q100 137 120 130 L126 42 Z" fill="#F8FAFC" opacity="0.2" />
          {/* Gula Aren bottom layer */}
          <path d="M79 116 L80 130 Q100 137 120 130 L121 116 Q100 122 79 116 Z" fill="#451A03" />
          {/* Fresh Milk middle layer */}
          <path d="M76 80 L79 116 Q100 122 121 116 L124 80 Q100 86 76 80 Z" fill="#FEF3C7" />
          {/* Espresso top layer */}
          <path d="M74 46 L76 80 Q100 86 124 80 L126 46 Q100 52 74 46 Z" fill="#78350F" />
          {/* Rim ellipse */}
          <ellipse cx="100" cy="42" rx="27" ry="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="100" cy="42" rx="24" ry="6" fill="#B45309" />
          {/* Ice Cubes */}
          <rect x="88" y="52" width="16" height="16" rx="3" fill="#FFFFFF" opacity="0.75" transform="rotate(15 88 52)" />
          <rect x="96" y="70" width="15" height="15" rx="3" fill="#FFFFFF" opacity="0.65" transform="rotate(-10 96 70)" />
          <rect x="84" y="85" width="14" height="14" rx="3" fill="#FFFFFF" opacity="0.6" transform="rotate(22 84 85)" />
          {/* Straw */}
          <line x1="115" y1="20" x2="95" y2="125" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
          <line x1="115" y1="20" x2="95" y2="125" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
          {/* Condensation droplets */}
          <circle cx="75" cy="75" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="76" cy="98" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="125" cy="88" r="1.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'cendol':
      // Es Cendol Nangka Legit
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="100" cy="140" rx="40" ry="12" fill="#000000" opacity="0.1" />
          {/* Glass */}
          <path d="M72 45 L80 132 Q100 138 120 132 L128 45 Z" fill="#F1F5F9" opacity="0.3" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Gula Merah Liquid at Bottom */}
          <path d="M79 110 L80 132 Q100 138 120 132 L121 110 Q100 115 79 110 Z" fill="#78350F" />
          {/* Coconut Milk Liquid */}
          <path d="M74 52 L79 110 Q100 115 121 110 L126 52 Q100 58 74 52 Z" fill="#FEF9C3" opacity="0.9" />
          {/* Green Cendol droplets */}
          <ellipse cx="86" cy="95" rx="5" ry="8" fill="#16A34A" transform="rotate(-20 86 95)" />
          <ellipse cx="105" cy="102" rx="4" ry="7" fill="#15803D" transform="rotate(15 105 102)" />
          <ellipse cx="112" cy="85" rx="5" ry="8" fill="#22C55E" transform="rotate(-10 112 85)" />
          <ellipse cx="94" cy="82" rx="4" ry="7" fill="#16A34A" transform="rotate(25 94 82)" />
          <ellipse cx="88" cy="70" rx="4.5" ry="7.5" fill="#15803D" transform="rotate(-15 88 70)" />
          {/* Nangka Chunks (Yellow Jackfruit) */}
          <rect x="96" y="65" width="12" height="10" rx="2" fill="#FACC15" transform="rotate(18 96 65)" />
          <rect x="108" y="74" width="10" height="9" rx="2" fill="#EAB308" transform="rotate(-25 108 74)" />
          {/* Shaved Ice Dome */}
          <path d="M74 52 Q100 30 126 52 Z" fill="#FFFFFF" opacity="0.9" />
          {/* Palm Sugar Drizzle on Ice */}
          <path d="M85 45 Q100 38 115 48" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Spoon */}
          <line x1="82" y1="25" x2="105" y2="120" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'tea':
      // Es Teh Solo Manis Melati
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="138" rx="38" ry="12" fill="#000000" opacity="0.1" />
          {/* Glass */}
          <path d="M74 42 L80 130 Q100 136 120 130 L126 42 Z" fill="#F1F5F9" opacity="0.3" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Deep Amber Tea liquid */}
          <path d="M75 48 L80 128 Q100 134 120 128 L125 48 Q100 54 75 48 Z" fill="#B45309" opacity="0.85" />
          <ellipse cx="100" cy="48" rx="25" ry="6" fill="#D97706" />
          {/* Ice Cubes */}
          <rect x="86" y="55" width="16" height="16" rx="3" fill="#FFFFFF" opacity="0.75" transform="rotate(12 86 55)" />
          <rect x="102" y="70" width="15" height="15" rx="3" fill="#FFFFFF" opacity="0.7" transform="rotate(-18 102 70)" />
          <rect x="88" y="88" width="16" height="16" rx="3" fill="#FFFFFF" opacity="0.65" transform="rotate(20 88 88)" />
          {/* Straw */}
          <line x1="120" y1="20" x2="98" y2="120" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="120" y1="20" x2="98" y2="120" stroke="#FEE2E2" strokeWidth="1" strokeLinecap="round" />
          {/* Mint / Jasmine leaf */}
          <path d="M92 46 C85 40 90 35 98 42 Z" fill="#22C55E" />
        </svg>
      );

    case 'avocado':
      // Jus Alpukat Kocok Cokelat
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="138" rx="36" ry="12" fill="#000000" opacity="0.1" />
          {/* Glass */}
          <path d="M72 45 L80 130 Q100 136 120 130 L128 45 Z" fill="#F1F5F9" opacity="0.3" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Avocado Smoothie Thick Cream */}
          <path d="M73 48 L80 128 Q100 134 120 128 L127 48 Q100 54 73 48 Z" fill="#65A30D" />
          <ellipse cx="100" cy="48" rx="27" ry="6" fill="#84CC16" />
          {/* Chocolate Syrup Swirls */}
          <path d="M78 60 Q95 75 82 95 Q100 115 118 120" stroke="#3E1F11" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M122 55 Q105 78 118 95" stroke="#3E1F11" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Straw */}
          <line x1="118" y1="22" x2="96" y2="120" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'orange':
      // Es Jeruk Peras Murni
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="138" rx="38" ry="12" fill="#000000" opacity="0.1" />
          {/* Glass */}
          <path d="M74 46 L80 130 Q100 136 120 130 L126 46 Z" fill="#F1F5F9" opacity="0.3" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Orange Juice */}
          <path d="M75 50 L80 128 Q100 134 120 128 L125 50 Q100 56 75 50 Z" fill="#F97316" />
          <ellipse cx="100" cy="50" rx="25" ry="6" fill="#FB923C" />
          {/* Ice Cubes */}
          <rect x="88" y="60" width="15" height="15" rx="3" fill="#FFFFFF" opacity="0.75" transform="rotate(15 88 60)" />
          <rect x="98" y="80" width="15" height="15" rx="3" fill="#FFFFFF" opacity="0.7" transform="rotate(-15 98 80)" />
          {/* Orange Slice on rim */}
          <path d="M68 35 A15 15 0 0 1 88 52 L68 52 Z" fill="#EA580C" />
          <path d="M70 38 A12 12 0 0 1 85 50 L70 50 Z" fill="#FED7AA" />
          {/* Straw */}
          <line x1="120" y1="20" x2="100" y2="118" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'ginger':
      // Wedang Jahe Rempah Hangat
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clay Mug */}
          <ellipse cx="100" cy="130" rx="42" ry="12" fill="#000000" opacity="0.1" />
          <path d="M68 60 L74 122 Q100 130 126 122 L132 60 Z" fill="#9A3412" />
          {/* Mug Handle */}
          <path d="M128 72 C145 75 145 105 125 110" stroke="#7C2D12" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Ginger Liquid */}
          <ellipse cx="100" cy="62" rx="30" ry="9" fill="#B45309" />
          {/* Cinnamon Stick */}
          <line x1="85" y1="40" x2="110" y2="90" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
          {/* Steam */}
          <path d="M92 45 Q97 32 92 20" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M106 48 Q111 35 106 22" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      );

    case 'banana':
      // Pisang Bakar Keju Cokelat
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Plate */}
          <ellipse cx="100" cy="105" rx="82" ry="38" fill="#E2E8F0" />
          <ellipse cx="100" cy="100" rx="76" ry="34" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Grilled Bananas */}
          <ellipse cx="90" cy="92" rx="40" ry="14" fill="#FACC15" transform="rotate(-8 90 92)" />
          <ellipse cx="110" cy="100" rx="40" ry="14" fill="#EAB308" transform="rotate(6 110 100)" />
          {/* Char marks */}
          <line x1="75" y1="88" x2="85" y2="86" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="90" x2="105" y2="88" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="98" y1="99" x2="108" y2="101" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          {/* Shredded Cheese */}
          <path d="M80 82 L95 86 M90 80 L105 84 M100 88 L115 92 M85 92 L102 96" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Chocolate Sprinkles */}
          <circle cx="88" cy="85" r="1.5" fill="#38190B" />
          <circle cx="95" cy="82" r="1.5" fill="#38190B" />
          <circle cx="106" cy="86" r="1.5" fill="#38190B" />
          <circle cx="114" cy="94" r="1.5" fill="#38190B" />
        </svg>
      );

    case 'tofu':
      // Tahu Walik Crispy
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="105" rx="82" ry="38" fill="#E2E8F0" />
          <ellipse cx="100" cy="100" rx="76" ry="34" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Triangular Crispy Tofu Pieces */}
          <polygon points="65,95 85,75 100,98" fill="#D97706" />
          <polygon points="70,93 85,78 96,96" fill="#F59E0B" />
          <polygon points="95,95 115,72 130,95" fill="#B45309" />
          <polygon points="98,92 115,76 126,93" fill="#D97706" />
          <polygon points="80,105 100,88 115,108" fill="#D97706" />
          {/* Sambal Petis sauce bowl */}
          <ellipse cx="140" cy="95" rx="14" ry="9" fill="#1E293B" />
          <ellipse cx="140" cy="93" rx="11" ry="6" fill="#0F172A" />
          {/* Rawit green chili */}
          <path d="M125 102 Q130 98 135 100" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'tempeh':
    default:
      // Tempe Mendoan
      return (
        <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="105" rx="84" ry="40" fill="#E2E8F0" />
          <ellipse cx="100" cy="100" rx="78" ry="36" fill="#15803D" />
          {/* Mendoan Slices */}
          <rect x="62" y="78" width="45" height="30" rx="4" fill="#FCD34D" stroke="#D97706" strokeWidth="2" transform="rotate(-12 62 78)" />
          <rect x="92" y="82" width="48" height="30" rx="4" fill="#FDE047" stroke="#D97706" strokeWidth="2" transform="rotate(10 92 82)" />
          {/* Green Onions bits on batter */}
          <circle cx="75" cy="86" r="1.5" fill="#166534" />
          <circle cx="85" cy="92" r="1.5" fill="#166534" />
          <circle cx="108" cy="90" r="1.5" fill="#166534" />
          <circle cx="118" cy="96" r="1.5" fill="#166534" />
          {/* Sambal Kecap Dip */}
          <ellipse cx="138" cy="95" rx="15" ry="9" fill="#1C1917" />
          <circle cx="136" cy="94" r="1.5" fill="#DC2626" />
          <circle cx="142" cy="95" r="1.5" fill="#22C55E" />
        </svg>
      );
  }
};
