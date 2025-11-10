import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
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
    const menuItem = req.body;
    
    // GitHub token varsa GitHub'a kaydet (şimdilik sadece log)
    console.log('New menu item:', menuItem);
    
    return res.status(201).json({
      success: true,
      message: 'Menü öğesi başarıyla eklendi (Vercel API)',
      item: menuItem
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}