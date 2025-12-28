# StudySphere - Project Structure Overview

## 📂 Directory Structure

```
studysphere/
│
├── backend/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   ├── database.js           # MongoDB connection setup
│   │   │   ├── passport.js           # Passport.js strategies (Google OAuth, JWT)
│   │   │   └── stripe.js             # Stripe configuration and plans
│   │   │
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.js     # Auth: register, login, profile, OAuth
│   │   │   └── subscriptionController.js  # Subscription & payment management
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   ├── auth.js               # JWT verification, role checks
│   │   │   ├── errorHandler.js       # Global error handling
│   │   │   └── validation.js         # Request validation (express-validator)
│   │   │
│   │   ├── models/                   # Mongoose schemas
│   │   │   ├── User.js               # User account, auth, subscription status
│   │   │   ├── Subscription.js       # Subscription details, Stripe IDs
│   │   │   ├── Payment.js            # Payment transaction history
│   │   │   ├── Subject.js            # Top-level learning categories
│   │   │   ├── Chapter.js            # Subject subdivisions
│   │   │   ├── Module.js             # Chapter components
│   │   │   └── Content.js            # Individual learning materials
│   │   │
│   │   ├── routes/                   # API route definitions
│   │   │   ├── authRoutes.js         # /api/v1/auth/* endpoints
│   │   │   ├── subscriptionRoutes.js # /api/v1/subscription/* endpoints
│   │   │   └── contentRoutes.js      # /api/v1/content/* endpoints
│   │   │
│   │   ├── utils/                    # Helper utilities
│   │   │   └── emailService.js       # Email sending (nodemailer)
│   │   │
│   │   └── server.js                 # Express app entry point
│   │
│   ├── .env.example                  # Environment variables template
│   ├── .eslintrc.json                # ESLint configuration
│   ├── .gitignore                    # Git ignore rules
│   ├── Dockerfile                    # Docker container config
│   └── package.json                  # Dependencies and scripts
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Layout.jsx            # App layout wrapper
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── ProtectedRoute.jsx    # Route protection HOC
│   │   │   └── Scene3D.jsx           # Three.js 3D scene component
│   │   │
│   │   ├── pages/                    # Page components (routes)
│   │   │   ├── HomePage.jsx          # Landing page with 3D hero
│   │   │   ├── LoginPage.jsx         # Login form
│   │   │   ├── RegisterPage.jsx      # Registration form
│   │   │   ├── DashboardPage.jsx     # User dashboard
│   │   │   ├── SubjectsPage.jsx      # Browse subjects/courses
│   │   │   ├── SubscriptionPage.jsx  # Pricing and subscription management
│   │   │   └── ProfilePage.jsx       # User profile settings
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   └── useAuth.js            # Zustand auth store & actions
│   │   │
│   │   ├── services/                 # API service layer
│   │   │   └── api.js                # Axios instance with interceptors
│   │   │
│   │   ├── styles/                   # Global styles
│   │   │   └── index.css             # Tailwind + custom sketch theme
│   │   │
│   │   ├── assets/                   # Static assets (empty initially)
│   │   ├── utils/                    # Utility functions (empty initially)
│   │   │
│   │   ├── App.jsx                   # Root app component with routing
│   │   └── main.jsx                  # React entry point
│   │
│   ├── .env.example                  # Frontend env template
│   ├── .eslintrc.cjs                 # ESLint config
│   ├── .gitignore                    # Git ignore
│   ├── Dockerfile                    # Frontend container
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Dependencies
│   ├── postcss.config.js             # PostCSS config for Tailwind
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── vite.config.js                # Vite build configuration
│
├── config/                           # Shared configuration (empty)
│
├── .gitignore                        # Root git ignore
├── .prettierrc                       # Prettier code formatting
├── docker-compose.yml                # Docker orchestration
├── API.md                            # API documentation
├── QUICKSTART.md                     # Quick setup guide
├── PROJECT_STRUCTURE.md              # This file
└── README.md                         # Main documentation

```

## 🗂️ File Purpose Reference

### Backend Core Files

| File | Purpose |
|------|---------|
| `server.js` | Express app initialization, middleware setup, route mounting |
| `config/database.js` | MongoDB connection with Mongoose |
| `config/passport.js` | Google OAuth & JWT strategies |
| `config/stripe.js` | Stripe client initialization & plan definitions |

### Backend Models (MongoDB)

| Model | Collections | Key Fields |
|-------|-------------|------------|
| `User.js` | users | email, password, subscriptionStatus, trialEndDate, googleId |
| `Subscription.js` | subscriptions | userId, planType, stripeSubscriptionId, expiryDate |
| `Payment.js` | payments | userId, amount, status, stripePaymentIntentId |
| `Subject.js` | subjects | title, description, accessLevel, isPublished |
| `Chapter.js` | chapters | subjectId, title, order |
| `Module.js` | modules | chapterId, title, order, estimatedDuration |
| `Content.js` | contents | moduleId, type, content, videoUrl, accessLevel |

### Backend Controllers

| Controller | Handles |
|------------|---------|
| `authController.js` | Registration, login, OAuth, profile, password change |
| `subscriptionController.js` | Stripe checkout, subscription CRUD, webhooks |

### Backend Middleware

| Middleware | Function |
|------------|----------|
| `auth.js` | JWT verification, user authentication, role authorization |
| `validation.js` | Request validation with express-validator |
| `errorHandler.js` | Global error catching and formatting |

### Frontend Components

| Component | Purpose |
|-----------|---------|
| `Layout.jsx` | Common layout wrapper (navbar + outlet) |
| `Navbar.jsx` | Navigation with auth-aware links |
| `ProtectedRoute.jsx` | Redirect to login if not authenticated |
| `Scene3D.jsx` | Three.js animated 3D sphere |

### Frontend Pages

| Page | Route | Purpose |
|------|-------|---------|
| `HomePage.jsx` | `/` | Landing page with features & 3D hero |
| `LoginPage.jsx` | `/login` | User login form |
| `RegisterPage.jsx` | `/register` | User registration |
| `DashboardPage.jsx` | `/dashboard` | User dashboard (protected) |
| `SubjectsPage.jsx` | `/subjects` | Browse available courses |
| `SubscriptionPage.jsx` | `/subscription` | View plans, manage subscription |
| `ProfilePage.jsx` | `/profile` | User settings & account info |

### Frontend Services

| Service | Purpose |
|---------|---------|
| `api.js` | Axios client with interceptors for auth & token refresh |
| `useAuth.js` | Zustand store for auth state management |

## 📦 Key Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT auth
- **passport** - OAuth strategies
- **stripe** - Payment processing
- **bcryptjs** - Password hashing
- **helmet** - Security headers
- **cors** - CORS handling
- **express-validator** - Input validation
- **nodemailer** - Email sending

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **vite** - Build tool
- **three** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **axios** - HTTP client
- **zustand** - State management
- **tailwindcss** - Utility CSS
- **framer-motion** - Animations
- **react-hot-toast** - Toast notifications
- **@stripe/stripe-js** - Stripe checkout

## 🔄 Data Flow

### Authentication Flow
```
User → Frontend Form → POST /api/v1/auth/register
                     → authController.register()
                     → User.create()
                     → user.startTrial()
                     → generateAuthToken()
                     → Response with JWT
Frontend → Store token in localStorage
         → Set auth state in Zustand
         → Redirect to dashboard
```

### Subscription Flow
```
User → Click Subscribe → POST /api/v1/subscription/create-checkout-session
                       → stripe.checkout.sessions.create()
                       → Redirect to Stripe Checkout
User completes payment → Stripe webhook → POST /api/v1/subscription/webhook
                                        → handleCheckoutCompleted()
                                        → Update user.subscriptionStatus
                                        → Create Subscription record
                                        → Create Payment record
```

### Content Access Flow
```
User → Request content → GET /api/v1/content/contents/:id
                       → protect middleware (verify JWT)
                       → Content.findById()
                       → Check accessLevel vs user.subscriptionStatus
                       → Return content OR 403 Forbidden
```

## 🛠️ Development Workflow

### Starting Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and configure
4. `npm run dev` (uses nodemon for auto-reload)

### Starting Frontend
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env`
4. `npm run dev` (Vite dev server on port 5173)

### Using Docker
1. Configure `.env` files
2. `docker-compose up -d`
3. View logs: `docker-compose logs -f`

## 🔐 Environment Variables

### Required Backend Vars
- `MONGODB_URI` - Database connection string
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `FRONTEND_URL` - CORS allowed origin

### Required Frontend Vars
- `VITE_API_URL` - Backend API base URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe public key

## 📝 Code Conventions

- **Backend**: CommonJS modules, async/await pattern
- **Frontend**: ES6 modules, functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components/models
- **API**: RESTful conventions, `/api/v1` prefix
- **Responses**: Consistent format with `{ success, data/message }`

## 🚀 Deployment Considerations

1. Set `NODE_ENV=production` in backend
2. Use production MongoDB URI (MongoDB Atlas)
3. Set secure JWT secrets (long random strings)
4. Configure production Stripe keys
5. Build frontend: `npm run build`
6. Serve frontend static files or use CDN
7. Set up reverse proxy (nginx) for backend
8. Enable HTTPS with SSL certificates
9. Configure proper CORS origins
10. Set up logging and monitoring

---

For detailed API documentation, see [API.md](./API.md)
For quick setup instructions, see [QUICKSTART.md](./QUICKSTART.md)
