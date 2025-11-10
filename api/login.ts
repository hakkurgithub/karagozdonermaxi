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

  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'karagoz2024') {
    return res.status(200).json({
      token: 'demo-token-vercel',
      user: {
        id: '1',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
}