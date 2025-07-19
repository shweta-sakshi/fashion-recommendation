# 👗 Fashion Recommendation System

A personalized fashion recommendation web application that suggests outfit combinations based on user preferences, body shape, face shape, and skin tone using advanced AI technology.

**Demo Credentials:**

- Email: `demo@gmail.com`
- Password: `123456`

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Usage](#usage)

## 🎯 About

The Fashion Recommendation System leverages Generative AI for both image and text processing to provide personalized fashion recommendations. The system analyzes user characteristics and preferences to suggest the most suitable outfit combinations, helping users make informed fashion choices that complement their unique features.

## ✨ Features

✅ **User-friendly web interface** to view and explore outfit suggestions

✅ **AI-powered recommendation engine** based on:

- Gender preferences
- Skin tone analysis
- Body shape compatibility
- Face shape considerations
- Regional fashion trends
- Current fashion trends

✅ **Personalized user profiles** with preference settings

✅ **Real-time outfit generation** using AI models

✅ **Responsive design** for mobile and desktop

✅ **Secure authentication** system

✅ **Background job processing** with Inngest for AI recommendations

✅ **Image storage and optimization** with ImageKit for fashion images

✅ **Image generation and management** for AI-created outfit visuals

## 🛠️ Tech Stack

| Layer              | Technology Used           |
| ------------------ | ------------------------- |
| **Frontend**       | Vite, HTML, CSS, Tailwind |
| **Backend**        | Express.js, Node.js       |
| **Job Processing** | Inngest                   |
| **AI/ML**          | Generative AI APIs        |
| **Image Storage**  | ImageKit                  |
| **Database**       | MongoDB                   |
| **Authentication** | JWT                       |

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## ⚙️ Installation

To set up this project locally:

### Step 1: Clone the repository

```bash
git clone https://github.com/shweta-sakshi/fashion-recommendation.git
cd fashion-recommendation
```

### Step 2: Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd fashion-assistance
npm install

# Install frontend dependencies
cd ../fashion-frontend
npm install
```

### Step 3: Environment Setup

Create `.env` files in both frontend and backend directories:

**Backend `.env`:**

```env
PORT=5000
DB=your_database_url
JWT_SECRET=your_jwt_secret

MAILTRAP_SMTP_HOST=mailtrap_host
MAILTRAP_SMTP_PORT=mailtrap_port
MAILTRAP_SMTP_USER=mailtrap_user
MAILTRAP_SMTP_PASS=mailtrap_password

GEMINI_API_KEY=gemini_api_key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

**Frontend `.env`:**

```env
VITE_SERVER_URL=http://localhost:8000
```

## 🚀 How to Run

You need to run three terminals for the complete application:

### Terminal 1: Backend Server

```bash
cd fashion-assistance
npm run dev
```

The backend server will start on `http://localhost:5000`

### Terminal 2: Frontend Development Server

```bash
cd fashion-frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Terminal 3: Inngest Development Server

```bash
cd backend
npm run inngest-dev
```

The Inngest dashboard will be available at `http://localhost:8288`

## 💡 Usage

1. **Sign Up/Login**: Create a new account or login with demo credentials
2. **Profile Setup**: Complete your profile with body measurements, preferences, and style choices
3. **Upload Images**: AI will generate outfit visuals
4. **Get Recommendations**: The AI will analyze your profile and generate personalized outfit suggestions
5. **Browse Suggestions**: Explore different outfit combinations with high-quality images stored via ImageKit
6. **Image Management**: View, transform, and manage your fashion images with ImageKit's optimization features

---

**Note**: Make sure to replace placeholder values in the `.env` files with your actual API keys and configuration values before running the application.
