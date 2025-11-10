# Coolify Deployment Plan - Rails API + React Frontend

## Project Overview
Deploy a Rails API with basic routes and a React frontend that consumes this API on Coolify platform.

## Architecture
```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐
│  React Frontend │ ──────────────► │   Rails API     │
│    (Port 3000)  │                 │   (Port 3000)   │
└─────────────────┘                 └─────────────────┘
        │                                   │
        ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Nginx/Static  │                 │  Puma Server    │
│     Server      │                 │   (API only)    │
└─────────────────┘                 └─────────────────┘
```

## Implementation Steps

### Phase 1: Rails API Backend
- [ ] Create Rails API-only application (`rails new api --api`)
- [ ] Set up basic MVC structure
- [ ] Configure CORS for React communication
- [ ] Implement basic routes:
  - `GET /api/health` - Health check endpoint
  - `GET /api/users` - List users (mock data)
  - `POST /api/users` - Create user (mock data)
  - `GET /api/posts` - List posts (mock data) 
  - `POST /api/posts` - Create post (mock data)
- [ ] Add JSON serialization
- [ ] Create Dockerfile for Rails API

### Phase 2: React Frontend
- [ ] Create React application (`npx create-react-app frontend`)
- [ ] Set up API service layer with axios/fetch
- [ ] Create components:
  - Home page component
  - Users list component
  - Posts list component
  - Basic forms for creating users/posts
- [ ] Implement routing with React Router
- [ ] Create Dockerfile for React frontend
- [ ] Configure environment variables for API URL

### Phase 3: Local Development Setup
- [ ] Create docker-compose.yml for local development
- [ ] Configure networking between containers
- [ ] Set up environment variables
- [ ] Test full stack locally
- [ ] Verify API communication works

### Phase 4: Coolify Deployment Configuration
- [ ] Create coolify deployment files
- [ ] Configure reverse proxy settings
- [ ] Set up environment variables for production
- [ ] Configure domain routing
- [ ] Set up health checks

## File Structure
```
coolify-qonvia/
├── api/                    # Rails API backend
│   ├── Gemfile
│   ├── Dockerfile
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── serializers/
│   └── config/
├── frontend/               # React frontend  
│   ├── package.json
│   ├── Dockerfile
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── pages/
│   └── public/
├── docker-compose.yml      # Local development
├── coolify/                # Coolify deployment configs
│   ├── api.yml
│   └── frontend.yml
└── README.md
```

## API Endpoints Specification

### Health Check
- **GET** `/api/health`
- **Response**: `{ "status": "ok", "timestamp": "2024-01-01T00:00:00Z" }`

### Users API
- **GET** `/api/users` - List all users
- **POST** `/api/users` - Create new user
- **Body**: `{ "name": "John Doe", "email": "john@example.com" }`

### Posts API  
- **GET** `/api/posts` - List all posts
- **POST** `/api/posts` - Create new post
- **Body**: `{ "title": "Post Title", "content": "Post content", "user_id": 1 }`

## Deployment Strategy

### Rails API Service (Coolify)
- Build from Dockerfile
- Port: 3000
- Environment: `RAILS_ENV=production`
- Health check: `/api/health`

### React Frontend Service (Coolify)
- Build from Dockerfile (multi-stage build)
- Serve static files via nginx
- Port: 80
- Environment: `REACT_APP_API_URL=https://api.yourdomain.com`

### Reverse Proxy Configuration
- Frontend: `https://yourdomain.com` 
- API: `https://api.yourdomain.com`
- CORS configured to allow frontend domain

## Environment Variables

### Rails API
- `RAILS_ENV=production`
- `SECRET_KEY_BASE=<generated>`
- `CORS_ORIGINS=https://yourdomain.com`

### React Frontend  
- `REACT_APP_API_URL=https://api.yourdomain.com`
- `NODE_ENV=production`

## Next Steps
1. Start with Rails API creation
2. Implement basic routes with mock data
3. Create React frontend with API integration
4. Set up containerization
5. Test locally with docker-compose
6. Deploy to Coolify platform

## Notes
- No database required for initial implementation
- Using mock data stored in memory/constants
- Focus on API structure and frontend integration
- Scalable architecture for future database integration