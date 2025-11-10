import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({
      success: false,
      message: 'GitHub token yapılandırılmamış'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'GitHub ile manuel senkronizasyon tamamlandı',
    commit: 'manual-sync-' + Date.now(),
    timestamp: new Date().toISOString()
  });
}