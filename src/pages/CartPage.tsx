// pages/CartPage.tsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

type FormData = { 
  address: string; 
  phone: string; 
  payment: 'Bankkártya' | 'Készpénz' 
};

const CartPage: React.FC = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const [form, setForm] = useState<FormData>({ 
    address: '', 
    phone: '', 
    payment: 'Készpénz' 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // WhatsApp sipariş gönderme fonksiyonu
  const sendOrderToWhatsApp = (address?: string, phone?: string) => {
    const orderItemsText = cartItems
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)} Ft`
      )
      .join('\n');

    const totalPriceText = `\n\nVégösszeg: ${getTotalPrice().toFixed(0)} Ft`;
    
    let message = `Helló! A Karagöz Döner Maxi-tól szeretnék rendelni:\n\n${orderItemsText}${totalPriceText}`;

    if (address) message += `\n\nCím: ${address}`;
    if (phone) message += `\nTelefonszám: ${phone}`;
    message += `\n\nFizetési mód: ${form.payment}`;

    const phoneNumber = '36209341537';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (!form.address || !form.phone) {
      alert('Kérjük töltse ki az összes kötelező mezőt!');
      return;
    }
    sendOrderToWhatsApp(form.address, form.phone);
    clearCart();
    alert('Rendelését elküldtük WhatsApp-on! Köszönjük!');
  };

  const goToMenu = () => {
    (window as any).navigateTo('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/logo.svg" 
              alt="Karagöz Döner Maxi Logo" 
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Kosaram
              </h1>
              <p className="text-xl opacity-90">
                Karagöz Döner Maxi
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back to Menu Button */}
        <div className="mb-6">
          <button
            onClick={goToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg transform hover:scale-105"
          >
            ← Vissza a menübe
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="mb-6">
              <img 
                src="/logo.svg" 
                alt="Karagöz Logo" 
                className="w-20 h-20 mx-auto opacity-50"
              />
            </div>
            <p className="text-xl text-gray-700 mb-6">A kosár üres.</p>
            <button
              onClick={goToMenu}
              className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-red-700 transition-colors shadow-lg transform hover:scale-105"
            >
              Vissza a Menübe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sepet Öğeleri */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                  <img 
                    src="/logo.svg" 
                    alt="Karagöz Logo" 
                    className="w-8 h-8"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">Kosár Tartalma</h2>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {getTotalItems()} tétel
                  </span>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b hover:bg-gray-50 rounded-lg px-4 transition-colors">
                    <div className="flex items-center">
                      <span className="text-xl font-medium text-red-600 w-8 text-center bg-red-50 rounded-full">{item.quantity}x</span>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.price} Ft/db</p>
                        <p className="text-red-600 font-semibold">{(item.price * item.quantity).toFixed(0)} Ft</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-100 text-red-600 w-8 h-8 rounded-full hover:bg-red-200 transition-colors ml-2 flex items-center justify-center"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-6 mt-6 border-t bg-gray-50 rounded-lg px-4 py-4">
                  <span className="text-2xl font-bold text-gray-800">Végösszeg:</span>
                  <span className="text-3xl font-bold text-red-600">{getTotalPrice().toFixed(0)} Ft</span>
                </div>
              </div>
            </div>

            {/* Sipariş Formu */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <img 
                  src="/logo.svg" 
                  alt="Karagöz Logo" 
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-semibold text-gray-800">Rendelés Adatai</h2>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Szállítási cím *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="Utca, házszám, város"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    📞 Telefonszám *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="+36 20 123 4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2">
                    💳 Fizetési mód
                  </label>
                  <select
                    id="payment"
                    name="payment"
                    value={form.payment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  >
                    <option value="Készpénz">💰 Készpénz</option>
                    <option value="Bankkártya">💳 Bankkártya</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>📱 WhatsApp rendelés:</strong> A rendelését WhatsApp-on küldjük el az étteremnek. 
                    Megerősítést és szállítási időt WhatsApp-on fog kapni.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!form.address || !form.phone || cartItems.length === 0}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  📱 Rendelés leadása WhatsApp-on
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors mt-2"
                >
                  🗑️ Kosár ürítése
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;