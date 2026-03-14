# AI Platform Demo - Full Stack Sample Tasks

A comprehensive full-stack demo with Next.js 14, React Native (Expo), Express, PostgreSQL, Docker, i18n with RTL, and Stripe integration.

## 5 Sample Tasks

- **TASK 1**: Live dashboard with real-time counters (Next.js + API polling)
- **TASK 2**: Mobile app with approve/reject flow (React Native Expo)
- **TASK 3**: Docker Compose multi-service stack
- **TASK 4**: Multi-language support with RTL (English, Arabic, Spanish)
- **TASK 5**: Stripe metered billing flow

## Tech Stack

**Web**: Next.js 14, TypeScript, Tailwind CSS
**Mobile**: React Native, Expo, TypeScript
**Backend**: Node.js, Express, TypeScript, PostgreSQL
**DevOps**: Docker, Docker Compose
**Payments**: Stripe API

## Quick Start

### 1. Install Dependencies

```bash
cd web && npm install && cd ..
cd backend && npm install && cd ..
cd mobile && npm install && cd ..
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Add your Stripe test key to .env
# Get from: https://dashboard.stripe.com/test/apikeys
```

### 3A. Run with Docker (Recommended)

```bash
docker compose up

# Access:
# - Web: http://localhost:3000
# - API: http://localhost:4000
```

### 3B. Run Locally

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Web
cd web && npm run dev

# Terminal 3 - Mobile
cd mobile && npm start
```

## Task URLs

- **Home**: http://localhost:3000
- **TASK 1 - Dashboard**: http://localhost:3000/dashboard
- **TASK 4 - i18n**: http://localhost:3000/dashboard (use language switcher)
- **TASK 5 - Billing**: http://localhost:3000/billing
- **TASK 2 - Mobile**: `cd mobile && npm start`
- **TASK 3 - Docker**: `docker compose up`

## Project Structure

```
Task/
├── web/                    # Next.js 14 app
│   ├── app/
│   │   ├── page.tsx        # Home page
│   │   ├── dashboard/      # TASK 1 & 4
│   │   └── billing/        # TASK 5
│   ├── components/         # LanguageSwitcher
│   └── messages/           # i18n (en, ar, es)
├── backend/                # Express API
│   └── src/index.ts        # All endpoints
├── mobile/                 # React Native Expo
│   └── App.tsx             # TASK 2
├── docker-compose.yml      # TASK 3
└── .env.example            # Config template
```

## API Endpoints

```bash
GET  /health                    # Health check
GET  /api/stats                 # Live counters (TASK 1)
GET  /api/messages              # Messages list (TASK 2)
POST /api/create-payment-intent # Stripe billing (TASK 5)
GET  /api/db-test               # Database check
```

## Task Details

### TASK 1 - Live Dashboard
- 3 real-time counters updating every 10 seconds
- No page refresh, automatic polling
- URL: `/dashboard`

### TASK 2 - Mobile App
- 5 messages with AI summaries
- Approve → moves to "Handled" section
- Reject → removes from list
- Works on iOS, Android, web

### TASK 3 - Docker Compose
- PostgreSQL + Backend + Web
- Single command: `docker compose up`
- All services networked

### TASK 4 - Multi-language + RTL
- English, Arabic (RTL), Spanish
- Language switcher component
- LocalStorage persistence
- RTL layout flip for Arabic

### TASK 5 - Stripe Metered Billing
- Real-time cost: $0.02/second
- Start/End session buttons
- Creates Stripe Payment Intent
- Displays Payment Intent ID

## Testing

```bash
# Health check
curl http://localhost:4000/health

# Get stats
curl http://localhost:4000/api/stats

# Get messages
curl http://localhost:4000/api/messages

# Create payment intent
curl -X POST http://localhost:4000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 1.50}'
```

## Commands

```bash
# Backend
npm run dev          # Start development
npm run build        # Build TypeScript
npm start            # Run production

# Web
npm run dev          # Start development
npm run build        # Build Next.js
npm start            # Run production

# Mobile
npm start            # Start Expo
npm run android      # Android emulator
npm run ios          # iOS simulator

# Docker
docker compose up              # Start services
docker compose up --build      # Rebuild & start
docker compose down            # Stop services
docker compose logs -f         # View logs
```

## Environment Variables

**Required:**
- `STRIPE_SECRET_KEY` - Get from Stripe Dashboard (test mode)

**Optional:**
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - PostgreSQL config
- `PORT` - Backend port (default: 4000)
- `NEXT_PUBLIC_API_URL` - API URL for web (default: http://localhost:4000)

## Troubleshooting

**Port already in use:**
```bash
# Check ports
lsof -i :3000
lsof -i :4000

# Or change ports in .env
```

**Docker issues:**
```bash
# Rebuild containers
docker compose build --no-cache

# Remove volumes
docker compose down -v
```

**Mobile app can't connect:**
```bash
# Use your computer's IP instead of localhost
# In mobile .env:
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:4000
```

## Built With

- Next.js 14 (App Router, Server Components)
- React Native + Expo
- TypeScript (strict mode)
- Tailwind CSS
- Express + PostgreSQL
- Docker + Docker Compose
- Stripe API
- next-intl (i18n)

## License

Demo project for technical assessment.
