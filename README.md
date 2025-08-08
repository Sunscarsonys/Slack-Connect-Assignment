# Slack Connect

Slack Connect is a full-stack web application that allows users to:
- Connect their Slack workspace using **OAuth 2.0**
- Send messages instantly to Slack channels
- Schedule messages for future delivery
- Manage workspace tokens securely

---

## 🚀 Features
- **OAuth 2.0 Slack Login** – Secure authentication and permission handling.
- **Token Management** – Store and reuse Slack access tokens securely.
- **Send Messages** – Send messages to selected Slack channels instantly.
- **Schedule Messages** – Schedule messages to be sent at a future date/time.
- **Full-Stack Architecture** – Backend in Express.js (TypeScript), Frontend in React/Vite.js.

---

## 📂 Project Structure
```
/frontend      # React/Vite.js frontend
/backend       # Express.js + TypeScript backend
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sunscarsonys/Slack-Connect-Assignment.git
cd Slack-Connect-Assignment
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

#### Create `.env` in the `/backend` directory:
```env
# Slack App Credentials
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
SLACK_SIGNING_SECRET=your_slack-signing_secret

# Where to send browser after OAuth success
FRONTEND_BASE_URL=your_frontend_base_url
SLACK_REDIRECT_URI=http://localhost:5000/api/slack/callback
BASE_URL=your_base_url

# App Settings
PORT=3000
SESSION_SECRET=your_session_secret

```

#### Start Backend (Development Mode)
```bash
npm run dev
```
Backend will run at:  
```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

#### Create `.env.local` in `/frontend`:
```env
VITE_API_BASE_URL=http://localhost:5173
```

#### Start Frontend
```bash
npm run dev
```
Frontend will run at:  
```
http://localhost:5173
```

---

## 🧠 Architectural Overview

### OAuth 2.0 Flow
```plaintext
[Frontend] → "Connect to Slack" button click
     ↓
Redirects user to Slack OAuth consent screen
     ↓
[Slack] User grants permission → Sends "authorization code" to backend
     ↓
[Backend] Exchanges code for "access token" using Slack API
     ↓
Token stored securely in DB for future use
     ↓
Frontend can now send/schedule messages via backend
```

---

### Architecture Diagram
```plaintext
          ┌──────────────────── ┐
          │  Frontend (Vite.js) │
          │   React Components  │
          └───────┬─────────────┘
                  │
      "Connect to Slack" (OAuth 2.0)
                  │
                  ▼
          ┌──────────────────── ┐
          │ Slack Authorization │
          │   (OAuth Consent)   │
          └─────────┬───────────┘
                    │ Auth Code
                    ▼
          ┌──────────────────── ┐
          │ Backend (Express)   │
          │  Token Exchange     │
          │  Message Handling   │
          └─────────┬───────────┘
                    │ Access Token
                    ▼
          ┌────────────────────┐
          │ LowDB Database     │
          │ Secure Token Store │
          └────────────────────┘
```

---

## 🧩 Tech Stack
**Frontend:** Vite.js, React, CSS  
**Backend:** Express.js (TypeScript), Node.js  
**Database:** LowDB 
**OAuth & Messaging:** Slack API  

---

## ⚠️ Challenges & Learnings
**Challenges:**
- Handling **HTTPS requirement** for Slack OAuth in production.
- Ensuring secure token storage without exposing secrets.
- Managing scheduled tasks in a stateless environment.

**Learnings:**
- Deep understanding of Slack OAuth 2.0.
- Importance of separating frontend and backend environment variables.
- Building a reliable background scheduler for message delivery.

---

## 📜 License
MIT License – feel free to use and modify.
