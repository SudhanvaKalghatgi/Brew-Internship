# 🎬 Brew — Movie Analysis Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)

<br/>

> A full-stack AI-powered movie analysis platform. Enter any IMDb ID and receive structured AI-generated insights, sentiment analysis, cast details, and ratings — all wrapped in a cinematic, animated UI.

<br/>

**[🌐 Live Demo](https://brew-internship.vercel.app)** · **[⚙️ Backend API](https://brew-internship.onrender.com/health)** · **[📂 Repository](https://github.com/SudhanvaKalghatgi/Brew-Internship)**

</div>

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🚀 Project Overview

**Brew** is a production-grade full-stack web application built as part of the Brew Internship program. It lets authenticated users analyze any movie by entering its IMDb ID and instantly receive:

- AI-generated summaries and sentiment classification (Positive / Negative / Neutral)
- Real movie metadata from TMDB — poster, cast, rating, release year
- A curated featured movies dashboard
- Secure JWT-based authentication with HTTP-only cookies

This is not a CRUD demo. It integrates external APIs (TMDB), Google Gemini AI, secure backend architecture, and a cinematic frontend — built with production standards in mind.

---

## 🌍 Live Demo

| Service | URL |
|--------|-----|
| 🖥 Frontend | [https://brew-internship.vercel.app](https://brew-internship.vercel.app) |
| ⚙️ Backend API | [https://brew-internship.onrender.com](https://brew-internship.onrender.com) |
| ❤️ Health Check | [https://brew-internship.onrender.com/health](https://brew-internship.onrender.com/health) |

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT authentication stored in HTTP-only cookies (XSS-safe)
- Protected routes — Dashboard and Analyze page require login
- Secure password hashing with bcrypt
- Forgot password and reset password via secure email token

### 🎬 Movie Analysis
- Enter any valid IMDb ID (e.g. `tt0133093`)
- Fetch full movie metadata from TMDB
- Display poster, cast, rating, and release year
- AI-generated insights powered by Google Gemini
- Sentiment classification: Positive / Negative / Neutral

### 🎥 Dashboard
- Featured movies section with quick-access analysis
- Clicking a featured movie auto-fills the IMDb ID on the Analyze page
- Smooth animated transitions

### 🎨 UI/UX
- Cinematic design with liquid glass background effects
- Framer Motion page and element animations
- Dark / Light theme toggle
- Fully responsive across all screen sizes

### 🛡️ Security
- Helmet security headers
- CORS restricted to frontend origin
- Rate limiting on auth and AI endpoints
- Secure cookie configuration (httpOnly, sameSite)

---

## 🛠️ Tech Stack

### 🖥 Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | HTTP client |
| shadcn/ui | UI components |
| Vercel | Deployment |

### ⚙️ Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express.js | Server framework |
| MongoDB + Mongoose | Database |
| JWT (HTTP-only cookies) | Authentication |
| bcrypt | Password hashing |
| TMDB API | Movie metadata |
| Google Gemini AI | Insight generation |
| Nodemailer (Gmail SMTP) | Password reset emails |
| express-rate-limit | Rate limiting |
| Helmet | Security headers |
| Render | Deployment |

---

## 📂 Project Structure

```
brew-internship/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js               # Home page
│   │   │   ├── login/page.js         # Login page
│   │   │   ├── register/page.js      # Register page
│   │   │   ├── dashboard/page.js     # Protected dashboard
│   │   │   └── analyze/page.js       # Protected analyze page
│   │   ├── components/
│   │   │   ├── navbar.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── featured-movies.jsx
│   │   │   ├── cinematic-experience.jsx
│   │   │   ├── liquid-background.jsx
│   │   │   ├── protected-route.jsx
│   │   │   ├── theme-provider.jsx
│   │   │   ├── theme-toggle.jsx
│   │   │   └── ui/
│   │   ├── context/
│   │   │   └── auth-context.jsx      # Auth state management
│   │   └── lib/
│   │       ├── api.js                # Axios instance
│   │       └── utils.js
│   ├── public/
│   ├── .env.local
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js
│   │   ├── middlewares/
│   │   │   ├── error.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   └── auth.model.js
│   │   │   └── movie/
│   │   │       ├── movie.controller.js
│   │   │       └── movie.routes.js
│   │   ├── services/
│   │   ├── utils/
│   │   └── routes/
│   │       └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🧪 Getting Started

### 📌 Prerequisites

- Node.js v18+
- MongoDB Atlas account
- TMDB API Key — [Get it here](https://www.themoviedb.org/settings/api)
- Google Gemini API Key — [Get it here](https://makersuite.google.com/app/apikey)
- Gmail App Password — [Generate here](https://myaccount.google.com/apppasswords)

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000

TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)

| Variable | Description | Required |
|---------|-------------|----------|
| `PORT` | Server port (default: 5000) | ✅ |
| `MONGO_URI` | MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | Secret key for signing JWT tokens | ✅ |
| `FRONTEND_URL` | Allowed CORS origin (no trailing slash) | ✅ |
| `TMDB_API_KEY` | TMDB API key for movie metadata | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key for AI insights | ✅ |
| `EMAIL_USER` | Gmail address for sending emails | ✅ |
| `EMAIL_PASS` | Gmail App Password (not your Gmail password) | ✅ |

### Frontend (`/frontend/.env.local`)

| Variable | Description | Required |
|---------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend base API URL | ✅ |

---

## 📡 API Endpoints

Base URL: `https://brew-internship.onrender.com/api/v1`

### 🔐 Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT cookie | ❌ |
| `POST` | `/auth/logout` | Logout and clear cookie | ✅ |
| `POST` | `/auth/forgot-password` | Send password reset email | ❌ |
| `POST` | `/auth/reset-password/:token` | Reset password with token | ❌ |

### 🎬 Movie Routes

| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|---------------|
| `POST` | `/movie/analyze` | Analyze movie by IMDb ID | ✅ |

### Request Body — `/movie/analyze`

```json
{
  "imdbId": "tt0133093"
}
```

### Response — `/movie/analyze`

```json
{
  "success": true,
  "data": {
    "movie": {
      "title": "The Matrix",
      "releaseYear": "1999",
      "rating": 8.7,
      "poster": "https://image.tmdb.org/...",
      "overview": "...",
      "cast": ["Keanu Reeves", "Laurence Fishburne"]
    },
    "insights": {
      "summary": "A groundbreaking sci-fi film...",
      "sentiment": "positive"
    }
  }
}
```

---

## 🚀 Deployment

### Frontend — Vercel

1. Connect GitHub repo to Vercel
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://brew-internship.onrender.com/api/v1`
4. Deploy — Vercel auto-detects Next.js and handles the build

### Backend — Render

1. Connect GitHub repo to Render
2. Set **Root Directory** to `backend`
3. Set **Build Command** to `npm install`
4. Set **Start Command** to `npm start`
5. Add all environment variables listed above
6. Deploy as a Web Service

> ⚠️ Make sure `FRONTEND_URL` on Render matches your exact Vercel domain with **no trailing slash**.

---

## 👨‍💻 Author

**Sudhanva Kalghatgi**
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-SudhanvaKalghatgi-181717?style=for-the-badge&logo=github)](https://github.com/SudhanvaKalghatgi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-linkedin-here)

---

## 🏁 Final Note

This project demonstrates:

- ✅ Secure full-stack authentication (JWT + HTTP-only cookies)
- ✅ AI integration (Google Gemini)
- ✅ External API orchestration (TMDB)
- ✅ Production-grade backend architecture
- ✅ Cloud deployment (Vercel + Render)
- ✅ Modern cinematic frontend UI
- ✅ Industry-standard security practices

> Built with professional standards for the Brew Internship program evaluation.
