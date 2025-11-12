# 🍽️ Karagöz Étterem - Modern React Menü Sistemi

Modern React/TypeScript tabanlı restoran menü sistemi. Karagöz Étterem için özel olarak tasarlanmış, responsive ve kullanıcı dostu web uygulaması.

## ✨ Özellikler

### 🎨 Modern UI/UX
- **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlarda mükemmel görünüm
- **Gradient Renkler**: Kategori bazlı renk şemaları
- **Smooth Animations**: Hover efektleri ve geçiş animasyonları
- **Glass Morphism**: Modern görsel efektler

### 🛒 E-ticaret Özellikleri
- **Gelişmiş Sepet Sistemi**: Miktar güncelleme, ürün kaldırma
- **Gerçek Zamanlı Hesaplama**: Otomatik fiyat hesaplama
- **Sepet Badge**: Anlık ürün sayısı gösterimi
- **Sipariş Yönetimi**: Kolay sipariş süreci

### 🔍 Filtreleme ve Arama
- **Kategori Filtreleme**: 14 farklı kategori
- **Anlık Arama**: Ürün adı ve açıklama bazlı
- **Akıllı Sıralama**: İsim, fiyat, değerlendirme
- **Hızlı Temizleme**: Tek tıkla filtre sıfırlama

### 🇭🇺 Macarca Yerelleştirme
- **Tam Çeviri**: Tüm metinler Macarca
- **Yerel Para Birimi**: Ft formatında fiyatlandırma
- **Kültürel Uyum**: Macarca menü terimleri
- **Doğru Sıralama**: Macarca alfabetik sıralama

### 🚀 Teknik Özellikler
- **TypeScript**: Type-safe geliştirme
- **React 18**: Modern hooks ve functional components
- **Vite**: Hızlı geliştirme ortamı
- **Tailwind CSS**: Utility-first styling
- **Custom Hooks**: Modüler state yönetimi

## 📂 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── MenuItemCard.tsx    # Ürün kartı bileşeni
│   ├── CategoryFilter.tsx  # Kategori filtreleme
│   ├── Cart.tsx           # Sepet bileşeni
│   └── SearchAndSort.tsx  # Arama ve sıralama
├── hooks/              # Custom React hooks
│   ├── useMenu.ts         # Menü state yönetimi
│   └── useCart.ts         # Sepet state yönetimi
├── types/              # TypeScript type tanımları
│   └── menu.ts           # Menü interface'leri
├── data/               # Statik veri dosyaları
│   └── categoryConfig.ts  # Kategori konfigürasyonu
├── lib/                # Veri katmanı
│   └── menuData.ts       # Ana menü verileri
├── pages/              # Sayfa bileşenleri
│   └── MenuPage.tsx      # Ana menü sayfası
├── App.tsx             # Ana uygulama bileşeni
├── App.css             # Global stiller
└── main.tsx            # Uygulama giriş noktası
```

## 🍕 Menü Kategorileri

1. **⭐ Közkedvelt ételek** - Popüler seçimler
2. **🍖 Kebapok és Grillek** - Adana, Urfa, İskender
3. **🍞 Pide és Lahmacun** - Türk pizza ve lahmacun
4. **🥙 Döner** - Klasik döner çeşitleri
5. **🌯 Dürüm** - Lavaş sarma
6. **🍽️ Gyros tálak** - Yunan tarzı tabaklar
7. **🥙 Gyros piták** - Pita ekmeği
8. **🍔 Hamburgerek** - Burger çeşitleri
9. **🥬 Saláták** - Taze salatalar
10. **🍲 Levesek** - Çorba çeşitleri
11. **🥗 Köretek** - Yan ürünler
12. **🍝 Tészták** - Makarna yemekleri
13. **🍰 Desszertek** - Tatlılar
14. **🥤 Italok** - İçecekler

## 🚀 Kurulum ve Çalıştırma

### Önkoşullar
- Node.js 16+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükle**:
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlat**:
   ```bash
   npm run dev
   ```

3. **Tarayıcıda görüntüle**:
   ```
   http://localhost:3000
   ```

### Üretim için build alma:
```bash
npm run build
```

### Build önizleme:
```bash
npm run preview
```

## 🚀 Vercel'e Deploy

### Otomatik Deploy:
1. **Vercel hesabı açın**: [vercel.com](https://vercel.com)
2. **GitHub ile bağlayın**: Repository'yi import edin
3. **Otomatik deploy**: Her push otomatik olarak deploy edilir

### Manuel Deploy:
```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel --prod
```

### Environment Variables:
Vercel dashboard'da şu değişkenleri ekleyin:
```
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
```

### Deploy URL:
🌐 **Live Demo**: [https://karagozdonermaxi.vercel.app](https://karagozdonermaxi.vercel.app)

## 💻 Kullanılan Teknolojiler

- **React 18**: Modern React özellikleri
- **TypeScript**: Type safety
- **Vite**: Build tool ve dev server
- **Tailwind CSS**: Utility-first CSS
- **PostCSS**: CSS işleme
- **ESLint**: Code linting

## 📱 Responsive Tasarım

- **Mobile First**: Mobil öncelikli tasarım yaklaşımı
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Dokunmatik cihazlar için optimize

## 🎯 Performans Özellikleri

- **Lazy Loading**: İhtiyaç halinde yükleme
- **Image Optimization**: Resim optimizasyonu
- **Code Splitting**: Kod parçalama
- **Bundle Size**: Optimize edilmiş paket boyutu

## 🔧 Özelleştirme

### Yeni Kategori Ekleme:
1. `src/types/menu.ts` dosyasında `MenuCategory` type'ına ekle
2. `src/data/categoryConfig.ts` dosyasında yapılandır
3. `src/lib/menuData.ts` dosyasında ürün ekle

### Tema Değiştirme:
`tailwind.config.js` dosyasındaki renk paletini düzenle

### Yeni Bileşen Ekleme:
`src/components/` klasöründe yeni bileşen oluştur

## 📈 Geliştirme Notları

- **State Yönetimi**: React hooks tabanlı
- **Type Safety**: Strict TypeScript konfigürasyonu
- **Code Quality**: ESLint ve Prettier
- **Modüler Yapı**: Component-based architecture

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyın (`git commit -m 'Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

**Karagöz Étterem**
- 📍 Magyarország
- 📞 +36 30 123 4567
- ⏰ Minden nap 10:00 - 24:00

---

*Made with ❤️ for Karagöz Étterem*