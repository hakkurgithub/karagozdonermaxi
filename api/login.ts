import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'karagoz2024';

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
  
  // Environment variables'dan admin credentials'ları kontrol et
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // JWT token oluştur
    const payload = {
      id: '1',
      username: ADMIN_USERNAME,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 saat
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h'
    });

    console.log('✅ Admin login successful:', username);
    
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: '1',
        username: ADMIN_USERNAME,
        role: 'admin'
      },
      expiresIn: '24h'
    });
  } else {
    console.log('❌ Invalid login attempt:', username);
    return res.status(401).json({ 
      success: false,
      error: 'Invalid credentials',
      message: 'Kullanıcı adı veya şifre yanlış'
    });
  }
}