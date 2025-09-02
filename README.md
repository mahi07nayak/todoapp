# Todo App (Node + MongoDB + React)

for jenkins

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB running locally or an Atlas connection string

## Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGODB_URI`.
3. `npm install`
4. `npm run dev` (uses nodemon) or `npm start`

## Frontend
1. `cd frontend`
2. `npm install`
3. Set `REACT_APP_API_URL` if your backend isn't `http://localhost:5000/api`
4. `npm start`

Open `http://localhost:3000`
