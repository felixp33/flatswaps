# FlatSwaps

A multi-user property exchange platform that uses intelligent matching algorithms to create swap cycles between apartment owners.

## Features

-  **Intelligent Matching**: Detects swap cycles between 2-4 users using graph theory
-  **Real-time Search**: Instant property filtering and discovery
-  **Smart Rejection Handling**: 14-day blacklist system to prevent spam
-  **Responsive Web Interface**: Built with Next.js and React
-  **RESTful API**: Clean backend architecture with Go

## Tech Stack

**Frontend:**

-  Next.js with React and TypeScript
-  Deployed on Vercel

**Backend:**

-  Go HTTP service with matching algorithms
-  Supabase for database and authentication

**Architecture:**

```
Frontend (Next.js) ←→ Backend (Go) ←→ Database (Supabase)
```

## Quick Start

### Prerequisites

-  Node.js 18+
-  Go 1.19+

### Frontend

```bash
npm install
npm run dev
```

Access at http://localhost:3000

### Backend

```bash
# Start matching service on port 8080
go run ./matching-service/cmd

# Or with Docker
docker compose up --build
```

### API Endpoints

-  `POST /search` - Submit property search criteria
-  `GET /property` - Retrieve property information
-  `POST /match` - Generate and retrieve matches

### Demo Mode

```bash
# Run interactive demo with sample data
go run ./matching-service/demo
```

## Project Structure

```
FlatSwaps/
├── src/                    # Next.js frontend
│   ├── components/         # UI components
│   ├── pages/             # Application routes
│   └── styles/            # CSS styling
└── matching-service/      # Go backend
    ├── cmd/               # HTTP server
    ├── demo/              # Console demo
    └── service/           # Matching algorithm
```

## Authentication Setup

The app uses `AuthProvider` for authentication. Key files:

-  `src/components/auth/SocialLogin` - Google OAuth
-  `src/app/auth/signin/page.tsx` - Sign-in page
-  `src/lib/auth/validation` - Form validation

## Matching Algorithm

Solves the multi-party exchange problem by:

1. Modeling users/properties as graph nodes
2. Detecting beneficial cycles of length 2-4
3. Ensuring all participant requirements are met
4. Managing rejections with time-based blacklisting

**Complexity:** O(n³) for cycle detection in sparse graphs

## Testing

```bash
cd matching-service
go test ./...
```
