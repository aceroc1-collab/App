'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import InstagramButton from '@/components/InstagramButton';
import InstallBanner from '@/components/InstallBanner';
import { Product, CartItem } from '@/components/types';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Tirzepatida', presentation: '10 mg', price: 130, category: 'GLP-1' },
  { id: 2, name: 'Tirzepatida', presentation: '20 mg', price: 240, category: 'GLP-1' },
  { id: 3, name: 'Retatrutida', presentation: '10 mg', price: 150, category: 'GLP-1' },
  { id: 4, name: 'Retatrutida', presentation: '20 mg', price: 200, category: 'GLP-1' },
  { id: 5, name: 'BPC-157', presentation: '5 mg', price: 70, category: 'Regenerativo' },
  { id: 6, name: 'BPC-157', presentation: '10 mg', price: 90, category: 'Regenerativo' },
  { id: 7, name: 'TB-500', presentation: '5 mg', price: 110, category: 'Regenerativo' },
  { id: 8, name: 'TB-500', presentation: '10 mg', price: 170, category: 'Regenerativo' },
  { id: 9, name: 'NAD+', presentation: '500 mg', price: 80, category: 'Longevidad' },
  { id: 10, name: 'GHK-CU', presentation: '50 mg', price: 40, category: 'Longevidad' },
  { id: 11, name: 'Tesamorelin', presentation: '20 mg', price: 250, category: 'GH Secretagogo' },
  { id: 12, name: 'KLOW Blend', presentation: '80 mg', price: 220, category: 'Blend' },
  { id: 13, name: 'Agua BAC', presentation: '10 ml', price: 20, category: 'Accesorio' },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.name} ${product.presentation} agregado`);
    setTimeout(() => setNotification(null), 2500);
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <main className="min-h-screen bg-obsidian-900 relative">
      <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Catalog products={PRODUCTS} onAddToCart={addToCart} />
      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      <InstagramButton />
      <InstallBanner />

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="bg-obsidian-600 border border-gold-500/40 text-gold-400 px-5 py-3 rounded-sm text-sm font-body tracking-wider shadow-2xl whitespace-nowrap">
            ✦ {notification}
          </div>
        </div>
      )}
    </main>
  );
}
