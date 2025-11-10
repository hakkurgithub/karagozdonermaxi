// pages/ContactPage.tsx
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<
    { type: 'success' | 'error'; text: string } | null
  >(null);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form gönderimini simüle et
    setTimeout(() => {
      setSubmitMessage({
        type: 'success',
        text: 'Üzenetét sikeresen elküldtük! Hamarosan válaszolunk.',
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderClick = () => {
    setShowOrderDropdown(!showOrderDropdown);
  };

  const handleChannelClick = (channel: any) => {
    if (channel.url) {
      window.open(channel.url, '_blank');
    }
    setShowOrderDropdown(false);
  };

  const orderChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '📱',
      color: 'text-green-600',
      url: 'https://wa.me/36209341537?text=Helló!%20Karagöz%20Döner-től%20szeretnék%20rendelni.',
    },
    {
      id: 'phone',
      name: 'Telefon: +36 20 934 1537',
      icon: '📞',
      color: 'text-blue-600',
      url: 'tel:+36209341537',
    },
    {
      id: 'foodora',
      name: 'Foodora',
      icon: '🍔',
      color: 'text-pink-600',
      url: '#',
    },
    {
      id: 'wolt',
      name: 'Wolt',
      icon: '🚚',
      color: 'text-blue-500',
      url: '#',
    },
  ];

  const goToMenu = () => {
    (window as any).navigateTo('menu');
  };

  const goToReservation = () => {
    // Google Maps linkini aç
    window.open('https://maps.app.goo.gl/Zd7qnD227CG5EWmZA', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-izgara.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src="/logo.svg" 
                alt="Karagöz Döner Maxi Logo" 
                className="w-20 h-20"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4">Elérhetőség</h1>
            <p className="text-xl max-w-2xl mx-auto">Lépjen kapcsolatba velünk</p>
            <button
              onClick={goToMenu}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ← Vissza a menühöz
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Üzenetküldés
              </h2>

              {submitMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {submitMessage.type === 'success' ? '✅' : '❌'}
                    </span>
                    {submitMessage.text}
                  </div>
                </div>
              )}

              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Név *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Az Ön neve"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+36 20 xxx xxxx"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tárgy *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    >
                      <option value="">Válasszon tárgyat</option>
                      <option value="reservation">Asztalfoglalás</option>
                      <option value="complaint">Panasz</option>
                      <option value="suggestion">Javaslat</option>
                      <option value="catering">Catering</option>
                      <option value="other">Egyéb</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    placeholder="Írja ide az üzenetét..."
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 karakter
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block mr-2">⏳</span>
                      Küldés...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📧</span>
                      Üzenet küldése
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Elérhetőségek
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <button
                    onClick={() => window.open('https://www.google.com/maps/place/Esztergom,+Kossuth+Lajos+u.+30,+2500+Hungary', '_blank')}
                    className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 hover:bg-red-200 transition-colors cursor-pointer"
                    title="Térképen megnyitás"
                  >
                    <span className="text-xl text-red-600">📍</span>
                  </button>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Cím</h4>
                    <p className="text-gray-600">
                      2500, Esztergom
                      <br />
                      Kossuth Lajos utca 30.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <button
                    onClick={() => window.open('tel:+36209341537', '_self')}
                    className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 hover:bg-red-200 transition-colors cursor-pointer"
                    title="Hívás indítása"
                  >
                    <span className="text-xl text-red-600">📞</span>
                  </button>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Telefonszám</h4>
                    <p className="text-gray-600">+36 20 934 1537</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <button
                    onClick={() => window.open('mailto:info@karagozdoner.com', '_blank')}
                    className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 hover:bg-red-200 transition-colors cursor-pointer"
                    title="E-mail küldése"
                  >
                    <span className="text-xl text-red-600">📧</span>
                  </button>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">E-mail</h4>
                    <p className="text-gray-600">info@karagozdoner.com</p>
                    <p className="text-gray-600">foglalas@karagozdoner.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl text-red-600">🕐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Nyitvatartás</h4>
                    <p className="text-gray-600">Hétfő - Vasárnap</p>
                    <p className="text-gray-600">11:00 - 23:00</p>
                    <p className="text-sm text-green-600 mt-1">
                      Folyamatos kiszolgálás
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Közösségi Média
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => window.open('https://www.facebook.com/profile.php?id=61560428630473', '_blank')}
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-2xl text-blue-600 mr-3">📘</span>
                  <span className="font-medium">Facebook</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-red-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Gyors Műveletek</h3>
              <div className="space-y-4">
                <button
                  onClick={goToReservation}
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <span className="mr-2">📅</span>
                  Asztalfoglalás
                </button>
                <div className="relative">
                  <button
                    onClick={handleOrderClick}
                    className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <span className="mr-2">🛒</span>
                    Online Rendelés
                    <span
                      className={`ml-2 transition-transform ${
                        showOrderDropdown ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {showOrderDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                      {orderChannels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => handleChannelClick(channel)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg cursor-pointer text-gray-800"
                        >
                          <span className={`${channel.color} text-lg w-5 h-5 flex items-center justify-center`}>
                            {channel.icon}
                          </span>
                          <span>{channel.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={goToMenu}
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <span className="mr-2">🍽️</span>
                  Menü Megtekintése
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Helyszín</h3>
            <p className="text-gray-600 mt-2">
              Találjon meg minket a térképen
            </p>
          </div>
          <div className="h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.786523173356!2d18.73977821563815!3d47.79152007919747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476a617631a29c1d%3A0xadeba8fea0603e1a!2sEsztergom%2C%20Kossuth%20Lajos%20u.%2030%2C%202500%20Hungary!5e0!3m2!1sen!2sus!4v1675865432109!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Karagöz Döner Helyszín"
            ></iframe>
            <div className="p-4 text-center">
              <a
                href="https://www.google.com/maps/place/Esztergom,+Kossuth+Lajos+u.+30,+2500+Hungary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                Megnyitás Google Térképen
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden Admin Access */}
      <div className="text-center py-4">
        <button
          onClick={() => (window as any).navigateTo('admin-login')}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          title="Admin Paneli"
        >
          🔐
        </button>
      </div>
    </div>
  );
}