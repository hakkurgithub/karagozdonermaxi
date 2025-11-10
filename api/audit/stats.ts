import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    totalOrders: 156,
    todayOrders: 12,
    totalProducts: 24,
    totalRevenue: 89450,
    monthlyRevenue: [
      { month: 'Ocak', revenue: 45000 },
      { month: 'Şubat', revenue: 52000 },
      { month: 'Mart', revenue: 48000 }
    ]
  });
}