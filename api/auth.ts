// JWT Authentication middleware for Vercel API routes
import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface AuthenticatedRequest extends VercelRequest {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export function verifyToken(req: AuthenticatedRequest): boolean {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.substring(7); // "Bearer " kısmını çıkar
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    };

    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return false;
  }
}

export function requireAuth(req: AuthenticatedRequest, res: VercelResponse): boolean {
  if (!verifyToken(req)) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Geçerli bir authentication token gerekli'
    });
    return false;
  }
  
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Admin yetkisi gerekli'
    });
    return false;
  }

  return true;
}

// JWT token oluşturma utility
export function createToken(user: { id: string; username: string; role: string }): string {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 saat
  };

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
}