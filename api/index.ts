// Simple backend server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://karagozdonermaxi-3fvu3ouwc-borcan-kebap.vercel.app',
    'https://karagozdonermaxi.vercel.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Karagöz Backend is running on Vercel!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Simple auth endpoint (for testing)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'karagoz2024') {
    res.json({
      token: 'demo-token-vercel',
      user: {
        id: '1',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// Simple menu endpoint (mock data)
app.get('/api/menu', (req, res) => {
  res.json({
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
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Vercel serverless için export
export default app;