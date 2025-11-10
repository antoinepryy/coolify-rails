# Rails + React Full Stack Application

A full-stack application with Rails API backend and React frontend, ready for deployment on Coolify.

## Architecture

- **Backend**: Rails 8.0 API-only application
- **Frontend**: React 18 with React Router
- **Deployment**: Docker containers on Coolify
- **Development**: Docker Compose for local setup

## Features

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post

### Frontend Pages
- `/` - Home page with health status
- `/users` - Users management
- `/posts` - Posts management

## Quick Start

### Local Development

1. **Start with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

### Manual Development

1. **Start Rails API:**
   ```bash
   cd api
   bundle install
   rails server -p 3001
   ```

2. **Start React Frontend:**
   ```bash
   cd api/frontend
   npm install
   npm start
   ```

## Deployment on Coolify

1. **Prepare environment:**
   ```bash
   cp coolify/environment.example coolify/.env
   # Edit coolify/.env with your values
   ```

2. **Generate Rails secret:**
   ```bash
   cd api
   rails secret
   # Copy output to SECRET_KEY_BASE in coolify/.env
   ```

3. **Deploy to Coolify:**
   - Create new project in Coolify
   - Connect Git repository
   - Set docker-compose file: `coolify/docker-compose.prod.yml`
   - Configure environment variables from `coolify/.env`

## Project Structure

```
├── api/                     # Rails API backend
│   ├── app/
│   │   └── controllers/
│   │       └── api/         # API controllers
│   ├── config/
│   │   ├── routes.rb        # API routes
│   │   └── initializers/
│   │       └── cors.rb      # CORS configuration
│   ├── Dockerfile           # Production Dockerfile
│   └── Dockerfile.dev       # Development Dockerfile
├── api/frontend/            # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   └── App.js          # Main App component
│   ├── Dockerfile           # Production Dockerfile
│   └── Dockerfile.dev       # Development Dockerfile
├── coolify/                 # Coolify deployment configs
│   ├── docker-compose.prod.yml
│   ├── environment.example
│   └── README.md
├── docker-compose.yml       # Production compose
├── docker-compose.dev.yml   # Development compose
└── DEPLOYMENT_PLAN.md       # Detailed deployment plan
```

## Environment Variables

### Development
- `REACT_APP_API_URL`: API URL for React (default: http://localhost:3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

### Production
- `DOMAIN`: Your domain name
- `SECRET_KEY_BASE`: Rails secret key
- `RAILS_ENV`: production
- `REACT_APP_API_URL`: Production API URL

## Tech Stack

### Backend
- Ruby 3.4.2
- Rails 8.0 (API mode)
- Puma web server
- SQLite (development)
- rack-cors for CORS

### Frontend
- Node.js 18
- React 18
- React Router DOM
- Axios for API calls
- Modern CSS with Flexbox/Grid

### Deployment
- Docker & Docker Compose
- Nginx for static file serving
- Coolify for container orchestration

## Development Notes

- No database required initially (using in-memory storage)
- CORS configured for local development
- Hot reloading enabled in development mode
- Production builds optimized for Coolify deployment

## Next Steps

- Add PostgreSQL database
- Implement user authentication
- Add automated tests
- Set up CI/CD pipeline
- Add monitoring and logging