import { VercelRequest, VercelResponse } from '@vercel/node';

// GitHub token'ı environment variable'dan al
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // URL path'den id'yi çıkar
    const { slug } = req.query;
    const pathSegments = Array.isArray(slug) ? slug : slug ? [slug] : [];
    const menuItemId = pathSegments[0];

    if (req.method === 'GET') {
      // Eğer /:id parametresi varsa tek item getir
      if (menuItemId && menuItemId !== 'categories') {
        return res.status(200).json({
          id: menuItemId,
          name: 'Demo Item',
          price: 4500,
          description: 'Demo menü öğesi',
          category: 'Kebapok és Grillek',
          image: 'https://via.placeholder.com/300',
          rating: 5
        });
      }

      // Categories endpoint'i
      if (menuItemId === 'categories') {
        return res.status(200).json({
          categories: [
            'Kebapok és Grillek',
            'Döner',
            'Pide és Lahmacun',
            'Dürüm',
            'Tészták',
            'Közkedvelt ételek',
            'İçecekler'
          ]
        });
      }

      // Tüm menü öğeleri
      return res.status(200).json({
        items: [
          {
            id: 'demo-1',
            name: 'Adana Kebap',
            price: 4500,
            description: 'Geleneksel Adana kebabı - Vercel API',
            category: 'Kebapok és Grillek',
            image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/adana-kebap.jpg',
            rating: 5
          },
          {
            id: 'demo-2',
            name: 'Döner Kebap',
            price: 3500,
            description: 'Klasik döner kebap - Vercel API',
            category: 'Döner',
            image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/doner-kebap.jpg',
            rating: 4.5
          }
        ],
        pagination: {
          current: 1,
          total: 1,
          count: 2
        }
      });
    }

    if (req.method === 'POST') {
      // İmport endpoint'i
      if (pathSegments[0] === 'import') {
        return res.status(200).json({
          success: true,
          message: 'Mevcut menü verileri başarıyla içe aktarıldı',
          imported: 24
        });
      }

      // Sync endpoint'i
      if (pathSegments[0] === 'sync') {
        if (GITHUB_TOKEN) {
          return res.status(200).json({
            success: true,
            message: 'GitHub ile senkronizasyon başarılı',
            commit: 'abc123',
            timestamp: new Date().toISOString()
          });
        } else {
          return res.status(500).json({
            success: false,
            message: 'GitHub token yapılandırılmamış'
          });
        }
      }

      // Yeni menü öğesi oluştur
      const menuItem = req.body;
      console.log('New menu item:', menuItem);
      
      return res.status(201).json({
        success: true,
        message: 'Menü öğesi başarıyla eklendi (Vercel API)',
        item: {
          ...menuItem,
          id: 'new-' + Date.now()
        }
      });
    }

    if (req.method === 'PUT') {
      // Menü öğesini güncelle
      const menuItem = req.body;
      console.log('Update menu item:', menuItemId, menuItem);
      
      return res.status(200).json({
        success: true,
        message: 'Menü öğesi başarıyla güncellendi',
        item: {
          ...menuItem,
          id: menuItemId
        }
      });
    }

    if (req.method === 'DELETE') {
      // Menü öğesini sil
      console.log('Delete menu item:', menuItemId);
      
      return res.status(200).json({
        success: true,
        message: 'Menü öğesi başarıyla silindi',
        deletedId: menuItemId
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Menu API Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}