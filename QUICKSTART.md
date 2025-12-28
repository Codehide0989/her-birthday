# StudySphere - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Docker (Recommended)

1. **Prerequisites**: Install Docker and Docker Compose

2. **Setup Environment Files**:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start Everything**:
   ```bash
   docker-compose up -d
   ```

4. **Access the App**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - MongoDB: localhost:27017

### Option 2: Manual Setup

#### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

#### Step 2: Configure Environment

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studysphere
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=30d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
FRONTEND_URL=http://localhost:5173
TRIAL_PERIOD_DAYS=14
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

#### Step 3: Start MongoDB

```bash
# Install MongoDB locally or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

#### Step 4: Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Step 5: Visit the App

Open http://localhost:5173 in your browser

## 🔑 Getting API Keys

### Stripe Setup (Required for Payments)

1. Go to https://stripe.com and create an account
2. Get your API keys from Dashboard → Developers → API keys
3. Copy both Test keys (Publishable and Secret)
4. For webhooks (optional for development):
   - Install Stripe CLI: https://stripe.com/docs/stripe-cli
   - Run: `stripe listen --forward-to localhost:5000/api/v1/subscription/webhook`
   - Copy the webhook signing secret

### Google OAuth Setup (Optional)

1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:5000/api/v1/auth/google/callback`
6. Copy Client ID and Client Secret

## 📝 First Steps After Setup

1. **Register a New Account**
   - Visit http://localhost:5173/register
   - Create an account (starts 14-day trial automatically)

2. **Explore the Dashboard**
   - View your trial status
   - Check out learning statistics

3. **Browse Subjects**
   - Go to Subjects page
   - Note: Initially empty - add content via API or admin panel

4. **Test Subscription Flow**
   - Go to Subscription page
   - View available plans
   - (Use Stripe test card: 4242 4242 4242 4242)

## 🛠️ Development Tips

### Adding Sample Content

Use the API to add subjects (requires admin role):

```bash
# First, manually set a user's role to 'admin' in MongoDB
# Then use this API call:

curl -X POST http://localhost:5000/api/v1/content/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Mathematics",
    "description": "Learn fundamental math concepts",
    "color": "#3B82F6",
    "icon": "📐",
    "isPublished": true,
    "accessLevel": "free"
  }'
```

### Testing Stripe Webhooks Locally

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:5000/api/v1/subscription/webhook

# In another terminal, trigger test events:
stripe trigger payment_intent.succeeded
```

### Checking MongoDB Data

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/studysphere

# View users
db.users.find()

# View subscriptions
db.subscriptions.find()
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongosh` or check Docker container
- Verify .env file exists and has correct values
- Check port 5000 isn't already in use

### Frontend won't connect to backend
- Verify VITE_API_URL in frontend/.env matches backend URL
- Check CORS settings in backend allow frontend URL
- Look at browser console for errors

### Google OAuth not working
- Verify redirect URI matches exactly in Google Console
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Ensure Google+ API is enabled

### Stripe payments failing
- Use test card: 4242 4242 4242 4242
- Verify Stripe keys are in test mode (start with sk_test_ and pk_test_)
- Check webhook secret is correctly set

## 📚 Next Steps

- Read the full [README.md](./README.md) for complete documentation
- Explore the [API endpoints](./README.md#api-endpoints)
- Check out the [database schema](./README.md#database-schema)
- Review [deployment guide](./README.md#deployment)

## 💡 Quick Commands

```bash
# Start everything with Docker
docker-compose up -d

# Stop Docker services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Backend development
cd backend && npm run dev

# Frontend development
cd frontend && npm run dev

# Run tests
cd backend && npm test
cd frontend && npm test
```

Happy coding! 🎉
