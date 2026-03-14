import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

// Initialize PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'taskdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory counters for demo (Task 1)
let counters = {
  requestsMade: 0,
  tokensUsed: 0,
  activeConnections: 0,
};

// Mock messages for Task 2
const mockMessages = [
  {
    id: 1,
    text: 'User wants to cancel subscription',
    aiSummary: 'Customer requesting subscription cancellation. Sentiment: Negative. Priority: High.',
    status: 'pending',
  },
  {
    id: 2,
    text: 'How do I reset my password?',
    aiSummary: 'Password reset inquiry. Sentiment: Neutral. Priority: Medium.',
    status: 'pending',
  },
  {
    id: 3,
    text: 'Great product! Very satisfied.',
    aiSummary: 'Positive feedback about product quality. Sentiment: Positive. Priority: Low.',
    status: 'pending',
  },
  {
    id: 4,
    text: 'The app keeps crashing on startup',
    aiSummary: 'Technical issue - app crash on startup. Sentiment: Negative. Priority: High.',
    status: 'pending',
  },
  {
    id: 5,
    text: 'When will the new features be released?',
    aiSummary: 'Inquiry about upcoming feature release timeline. Sentiment: Neutral. Priority: Medium.',
    status: 'pending',
  },
];

// TASK 1: Dashboard stats endpoint
app.get('/api/stats', (req: Request, res: Response) => {
  // Simulate changing data
  counters.requestsMade += Math.floor(Math.random() * 10);
  counters.tokensUsed += Math.floor(Math.random() * 100);
  counters.activeConnections = Math.floor(Math.random() * 50);

  res.json(counters);
});

// TASK 2: Messages endpoints
app.get('/api/messages', (req: Request, res: Response) => {
  res.json(mockMessages);
});

// TASK 5: Stripe payment intent creation
app.post('/api/create-payment-intent', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Test database connection
app.get('/api/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, timestamp: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
