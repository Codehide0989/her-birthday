# StudySphere API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "subscriptionStatus": "trial",
      "trialEndDate": "2024-02-15T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

### Get Profile
**GET** `/auth/profile`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "subscriptionStatus": "trial",
      "avatar": null,
      "trialStartDate": "...",
      "trialEndDate": "...",
      "isEmailVerified": false,
      "createdAt": "..."
    }
  }
}
```

### Update Profile
**PUT** `/auth/profile`
*Requires Authentication*

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": { ... }
  }
}
```

### Change Password
**PUT** `/auth/change-password`
*Requires Authentication*

**Body:**
```json
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Refresh Token
**POST** `/auth/refresh-token`

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "...",
    "refreshToken": "..."
  }
}
```

### Google OAuth
**GET** `/auth/google`
Redirects to Google OAuth consent screen

**GET** `/auth/google/callback`
Google OAuth callback (redirects to frontend with tokens)

---

## Subscription Endpoints

### Create Checkout Session
**POST** `/subscription/create-checkout-session`
*Requires Authentication*

**Body:**
```json
{
  "planType": "monthly"
}
```
*planType: "monthly" or "yearly"*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_...",
    "url": "https://checkout.stripe.com/..."
  }
}
```

### Get Current Subscription
**GET** `/subscription/current`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "subscription": {
      "_id": "...",
      "userId": "...",
      "planType": "monthly",
      "status": "active",
      "stripeSubscriptionId": "sub_...",
      "startDate": "...",
      "expiryDate": "...",
      "autoRenew": true,
      "currentPeriodStart": "...",
      "currentPeriodEnd": "..."
    }
  }
}
```

### Cancel Subscription
**POST** `/subscription/cancel`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "message": "Subscription will be cancelled at the end of the billing period",
  "data": {
    "subscription": { ... }
  }
}
```

### Get Payment History
**GET** `/subscription/payments`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "_id": "...",
        "userId": "...",
        "amount": 999,
        "currency": "USD",
        "status": "succeeded",
        "receiptUrl": "...",
        "paidAt": "...",
        "createdAt": "..."
      }
    ]
  }
}
```

### Stripe Webhook
**POST** `/subscription/webhook`
*Stripe webhooks only - requires webhook signature*

Handles Stripe events:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`
- `customer.subscription.updated`

---

## Content Endpoints

### Get All Subjects
**GET** `/content/subjects`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "subjects": [
      {
        "_id": "...",
        "title": "Mathematics",
        "slug": "mathematics",
        "description": "Learn math concepts",
        "icon": "📐",
        "color": "#3B82F6",
        "order": 0,
        "isPublished": true,
        "accessLevel": "free",
        "totalChapters": 5,
        "totalModules": 20
      }
    ]
  }
}
```

### Get Chapters by Subject
**GET** `/content/subjects/:subjectId/chapters`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "chapters": [
      {
        "_id": "...",
        "subjectId": "...",
        "title": "Algebra Basics",
        "slug": "algebra-basics",
        "description": "...",
        "order": 0,
        "isPublished": true,
        "accessLevel": "free",
        "totalModules": 4,
        "estimatedDuration": 120
      }
    ]
  }
}
```

### Get Modules by Chapter
**GET** `/content/chapters/:chapterId/modules`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "modules": [
      {
        "_id": "...",
        "chapterId": "...",
        "title": "Introduction to Equations",
        "slug": "introduction-to-equations",
        "description": "...",
        "order": 0,
        "isPublished": true,
        "accessLevel": "premium",
        "estimatedDuration": 30,
        "totalContent": 5
      }
    ]
  }
}
```

### Get Contents by Module
**GET** `/content/modules/:moduleId/contents`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contents": [
      {
        "_id": "...",
        "moduleId": "...",
        "title": "Video Lecture",
        "slug": "video-lecture",
        "type": "video",
        "videoUrl": "...",
        "videoDuration": 600,
        "order": 0,
        "isPublished": true,
        "accessLevel": "premium",
        "downloadable": false
      }
    ]
  }
}
```

### Get Content by ID
**GET** `/content/contents/:contentId`
*Requires Authentication*

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": {
      "_id": "...",
      "moduleId": "...",
      "title": "...",
      "type": "note",
      "content": "Full markdown content...",
      "attachments": [],
      "accessLevel": "premium"
    }
  }
}
```

### Create Subject (Admin Only)
**POST** `/content/subjects`
*Requires Authentication & Admin Role*

**Body:**
```json
{
  "title": "Physics",
  "description": "Learn physics concepts",
  "icon": "⚛️",
  "color": "#10B981",
  "order": 1,
  "isPublished": true,
  "accessLevel": "premium"
}
```

### Create Chapter (Admin Only)
**POST** `/content/chapters`
*Requires Authentication & Admin Role*

**Body:**
```json
{
  "subjectId": "...",
  "title": "Mechanics",
  "description": "Study of motion",
  "order": 0,
  "isPublished": true,
  "accessLevel": "premium"
}
```

### Create Module (Admin Only)
**POST** `/content/modules`
*Requires Authentication & Admin Role*

**Body:**
```json
{
  "chapterId": "...",
  "title": "Newton's Laws",
  "description": "...",
  "order": 0,
  "isPublished": true,
  "accessLevel": "premium",
  "estimatedDuration": 45
}
```

### Create Content (Admin Only)
**POST** `/content/contents`
*Requires Authentication & Admin Role*

**Body:**
```json
{
  "moduleId": "...",
  "title": "First Law Explanation",
  "type": "note",
  "content": "Markdown content here...",
  "order": 0,
  "isPublished": true,
  "accessLevel": "premium",
  "downloadable": true,
  "tags": ["physics", "mechanics"]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role user is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window
- **Applies to**: All `/api/*` endpoints

Exceeded rate limit response:
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Content Types

### Content Type Enum
- `note` - Text/Markdown content
- `video` - Video content
- `quiz` - Interactive quiz
- `assignment` - Homework assignment
- `attachment` - Downloadable file

### Video Provider Enum
- `youtube`
- `vimeo`
- `self-hosted`

### Access Level Enum
- `free` - Available to all users
- `premium` - Requires active subscription or trial

### Subscription Status Enum
- `free` - No subscription
- `trial` - In trial period
- `active` - Active paid subscription
- `expired` - Subscription expired
- `cancelled` - Subscription cancelled

---

## Pagination (Not yet implemented)

Future endpoints will support pagination with query parameters:
- `?page=1`
- `?limit=20`
- `?sort=-createdAt`

---

## Testing with cURL

### Register and Login
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Use Token
```bash
# Get profile with token
curl -X GET http://localhost:5000/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
