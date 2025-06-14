# Color Perception App

A full-stack application for collecting and analyzing color perception data between blue and gray shades.

## Project Structure

```
color-perception-app/
├── data/           # Backend (Express + MongoDB)
├── web/           # Frontend (React)
├── package.json   # Root package.json for managing both projects
└── README.md      # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd color-perception-app
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:

Create `.env` file in the `data` directory:
```
MONGODB_URL=your_mongodb_connection_string
PORT=5000
```

Create `.env` file in the `web` directory:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development servers:
```bash
npm start
```

This will start both the frontend (port 3000) and backend (port 5000) servers concurrently.

## Available Scripts

- `npm start` - Start both frontend and backend in development mode
- `npm run start:frontend` - Start only the frontend
- `npm run start:backend` - Start only the backend
- `npm run install:all` - Install dependencies for both projects

## API Endpoints

- GET `/api/colors/latest` - Get the most recent color data
- POST `/api/colors` - Add new color data

## Deployment

The project is set up for deployment on:
- Frontend: Vercel/Netlify
- Backend: Render/Railway
- Database: MongoDB Atlas 