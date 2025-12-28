# StudySphere - Full-Stack SaaS Learning Platform

<div align="center">
  <h3>🎓 Interactive 3D Learning Experience with Modern Tech Stack</h3>
  <p>A comprehensive educational platform featuring subscription management, payment integration, and immersive 3D UI</p>
</div>

## 🚀 Features

### Core Functionality
- **🔐 Authentication System**
  - Email/Password registration and login
  - Google OAuth integration
  - JWT-based authentication with refresh tokens
  - Protected routes and role-based access control

- **💳 Subscription Management**
  - 14-day free trial for new users
  - Monthly and yearly subscription plans
  - Stripe payment integration
  - Automated webhook handling for payment events
  - Subscription cancellation and renewal management

- **📚 Content Management**
  - Hierarchical content structure (Subjects → Chapters → Modules → Content)
  - Free and premium content access levels
  - Support for multiple content types (notes, videos, quizzes, assignments)
  - Progress tracking and course completion

- **🎨 3D Interactive UI**
  - Three.js/React Three Fiber for 3D visualizations
  - Sketch-style design system with hand-drawn aesthetics
  - Smooth animations with Framer Motion
  - Responsive design with Tailwind CSS

### Technology Stack

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js (Google OAuth)
- **Payments**: Stripe API
- **Security**: Helmet, bcryptjs, rate limiting
- **Email**: Nodemailer

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS with custom sketch theme
- **State Management**: Zustand
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **UI Feedback**: React Hot Toast

## 📁 Project Structure

```
studysphere/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Passport, Stripe configs
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Express app entry point
│   ├── .env.example         # Environment variables template
│   ├── Dockerfile           # Backend container config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx          # App component
│   │   └── main.jsx         # React entry point
│   ├── .env.example         # Frontend env template
│   ├── Dockerfile           # Frontend container config
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── package.json
│
├── config/                  # Shared configuration files
├── docker-compose.yml       # Docker orchestration
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB 7+ (local or Atlas)
- Stripe account (for payments)
- Google OAuth credentials (for social login)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studysphere
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your credentials

   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Manual Setup (Without Docker)

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Set VITE_API_URL to your backend URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studysphere
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 📊 Database Schema

### User Model
- Authentication (email, password, googleId)
- Subscription status (free, trial, active, expired)
- Trial period tracking
- Role-based permissions

### Subscription Model
- User reference
- Plan type (monthly, yearly)
- Stripe subscription ID
- Status and renewal information

### Content Models
- **Subject**: Top-level learning categories
- **Chapter**: Subject subdivisions
- **Module**: Chapter components
- **Content**: Individual learning resources

### Payment Model
- Transaction history
- Stripe payment intent tracking
- Receipt and refund management

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/google` - Google OAuth
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update profile

### Subscriptions
- `POST /api/v1/subscription/create-checkout-session` - Create Stripe checkout
- `GET /api/v1/subscription/current` - Get active subscription
- `POST /api/v1/subscription/cancel` - Cancel subscription
- `GET /api/v1/subscription/payments` - Payment history

### Content
- `GET /api/v1/content/subjects` - List all subjects
- `GET /api/v1/content/subjects/:id/chapters` - Get chapters
- `GET /api/v1/content/chapters/:id/modules` - Get modules
- `GET /api/v1/content/modules/:id/contents` - Get content items

## 🎨 Design System

### Sketch Theme
The UI features a unique hand-drawn aesthetic with:
- Custom sketch borders using CSS transforms
- Hand-drawn shadows and hover effects
- Caveat font family for sketch-style text
- Smooth animations and transitions

### Color Palette
- Primary: Blue gradient (#3B82F6 to #8B5CF6)
- Sketch backgrounds: Light gray tones
- Status indicators: Contextual colors

## 🚢 Deployment

### Production Build

**Backend:**
```bash
cd backend
npm run start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Environment Checklist
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB URI
- [ ] Set secure JWT secrets
- [ ] Configure production Stripe keys
- [ ] Set correct FRONTEND_URL and CORS origins
- [ ] Enable HTTPS
- [ ] Set up proper logging

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**
