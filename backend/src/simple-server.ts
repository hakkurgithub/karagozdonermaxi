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
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Karagöz Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Simple auth endpoint (for testing)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'karagoz2024') {
    res.json({
      token: 'demo-token',
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
        name: 'Demo Kebap',
        price: 4500,
        description: 'Demo menü öğesi',
        category: 'Kebapok és Grillek',
        image: 'https://via.placeholder.com/300',
        rating: 5
      }
    ],
    pagination: {
      current: 1,
      total: 1,
      count: 1
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

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Karagöz Restaurant Backend Started!
📍 Server: http://localhost:${PORT}
🔍 Health: http://localhost:${PORT}/api/health
🌍 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});