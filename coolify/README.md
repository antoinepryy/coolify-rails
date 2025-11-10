# Coolify Deployment Configuration

This directory contains configuration files for deploying the Rails + React application on Coolify.

## Setup Instructions

1. **Copy environment file:**
   ```bash
   cp coolify/environment.example coolify/.env
   ```

2. **Configure environment variables:**
   Edit `coolify/.env` and set:
   - `DOMAIN`: Your domain (e.g., `myapp.com`)
   - `SECRET_KEY_BASE`: Generate with `rails secret` in the API directory
   - Other environment variables as needed

3. **Deploy to Coolify:**
   - Create a new project in Coolify
   - Connect your Git repository
   - Set the docker-compose file path to `coolify/docker-compose.prod.yml`
   - Configure environment variables in Coolify dashboard

## Services

### API Service
- **Name**: rails-api
- **Domain**: api.${DOMAIN}
- **Port**: 80
- **Health Check**: /api/health

### Frontend Service
- **Name**: react-frontend
- **Domain**: ${DOMAIN}
- **Port**: 80
- **Depends on**: API service

## Environment Variables

### Required
- `DOMAIN`: Your main domain
- `SECRET_KEY_BASE`: Rails secret key
- `FRONTEND_URL`: Frontend URL for CORS

### Optional
- `RAILS_LOG_LEVEL`: Log level (default: info)
- `RAILS_MAX_THREADS`: Puma threads (default: 5)

## Scaling

Both services can be scaled independently:
- Frontend: Pure static files served by nginx
- API: Stateless Rails application

## Monitoring

- Health checks are configured for both services
- API health endpoint: `/api/health`
- Frontend serves static files, nginx handles health

## SSL/TLS

Coolify handles SSL certificates automatically when domains are configured.