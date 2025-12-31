# 🚀 BeyondChats – AI Article Scraper & Rephraser (Assignment)

Assignment project created to demonstrate web scraping, search-based content retrieval, and AI-powered text rephrasing.
The project consists of a **Node.js backend** and a **React frontend**.

---

## Backend Deployed on render : https://beyondchats-fsyp.onrender.com
## Frontend deployed on netlify : https://animated-beignet-44cf89.netlify.app/



## 📦 Project Local Setup Guide

###  Clone the Repository

```bash
git clone https://github.com/itsnikhil24/BeyondChats.git
```

### 🔧 Backend Setup
### 1. Open Terminal & Navigate to Backend
```bash
cd backend
```
### 2. Install Backend Dependencies
```bash
npm install
```
### 3. Create .env File
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
SERP_API_KEY=your_key
GEMINI_API_KEY=Your_key

```
### 4. Start Backend Server
```bash
node server.js
```

### Backend will start running on: http://localhost:3000

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| GET    | `/api/articles`             | Get the 5 stored articles          |
| POST   | `/api/articles/scrape/beyondchats`      | Scrape 5 old articles       |
| POST   | `/api/articles/rewrite/:id` | Search on Google and Rephrase article using AI |


## Frontend Setup
 ### 1. Open a New Terminal


### 2. Navigate to the frontend directory:

```bash
cd frontend
```
### 3. Install Frontend Dependencies
```bash
npm install
```
### 4. Add environment variable for backend 

#### Set the backend URL:
```bash
const VITE_API_BASE_URL = "http://localhost:3000/api/articles/";
```

### Start Frontend
```bash
npm run dev
```

### Frontend will run on: http://localhost:5173





