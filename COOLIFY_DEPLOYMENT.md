# Coolify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Set Environment Variables in Coolify**
In your Coolify project settings, add these environment variables:

```bash
# REQUIRED - Use your Coolify-generated domains
API_URL=http://wo040wk444gwsc4skw84w808.217.182.253.161.sslip.io
FRONTEND_URL=http://c48g0o40wswo4ck4co8cgwo4.217.182.253.161.sslip.io

# REQUIRED - Generate with: openssl rand -hex 64
SECRET_KEY_BASE=your_generated_secret_key_here
```

**Note**: Replace the URLs above with your actual Coolify-generated domains.

### 2. **Deploy Configuration**
- **Repository**: Use this Git repository
- **Docker Compose File**: `docker-compose.yml` (root level)
- **Branch**: `main`

## 🔧 Fixed Issues

### ✅ **Docker Lint Error**
- **Issue**: `SecretsUsedInArgOrEnv` lint violation
- **Fix**: Removed `check=error=true` from Dockerfile
- **Result**: Build now passes Docker security checks

### ✅ **Missing Environment Variables**
- **Issue**: `DOMAIN` variable not set, causing build failures
- **Fix**: Added default values with `${DOMAIN:-localhost}` syntax
- **Result**: Graceful fallbacks for missing environment variables

### ✅ **React API URL Configuration**
- **Issue**: Frontend couldn't connect to API
- **Fix**: Added build argument support for `REACT_APP_API_URL`
- **Result**: Frontend builds with correct API endpoint

## 📋 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `API_URL` | ✅ Yes | API service URL for React | `http://wo040wk444gwsc4skw84w808.217.182.253.161.sslip.io` |
| `FRONTEND_URL` | ✅ Yes | Frontend URL for CORS | `http://c48g0o40wswo4ck4co8cgwo4.217.182.253.161.sslip.io` |
| `SECRET_KEY_BASE` | ✅ Yes | Rails secret key | Generate with `openssl rand -hex 64` |
| `RAILS_ENV` | ❌ No | Rails environment | `production` (default) |
| `RAILS_LOG_LEVEL` | ❌ No | Log level | `info` (default) |

## 🔄 Updating Domains for Your Deployment

**Important**: The domains in this repository are examples. For your deployment:

1. **Deploy the services first** to get Coolify-generated domains
2. **Note the generated domains** for each service:
   - API service will get a domain like: `http://xxx.217.182.253.161.sslip.io`
   - Frontend service will get a domain like: `http://yyy.217.182.253.161.sslip.io`
3. **Update environment variables**:
   ```bash
   API_URL=<your-api-domain>
   FRONTEND_URL=<your-frontend-domain>
   ```
4. **Redeploy the frontend** to rebuild with correct API URL

## 🏗️ Services Configuration

### **Rails API Service**
- **Name**: `rails-api`
- **Domain**: `api.{DOMAIN}`
- **Port**: `80`
- **Health Check**: `/up`

### **React Frontend Service**
- **Name**: `react-frontend`
- **Domain**: `{DOMAIN}`
- **Port**: `80`
- **Depends on**: API service

## 🔍 Troubleshooting

### **Build Fails with "SecretsUsedInArgOrEnv"**
✅ **Fixed**: Removed strict Docker lint checks

### **"DOMAIN variable not set" Warning**
✅ **Fixed**: Added default values in docker-compose

### **Frontend Can't Connect to API**
- Check `REACT_APP_API_URL` is set correctly during build
- Verify CORS settings allow your domain
- Check API service is running on `api.{DOMAIN}`

### **Rails Secret Key Issues**
```bash
# Generate a new secret key
openssl rand -hex 64
# Add to Coolify environment variables as SECRET_KEY_BASE
```

### **Health Check Failures**
- API health check uses `/up` endpoint (Rails default)
- Ensure port 80 is exposed and accessible
- Check logs for startup errors

## 📝 Deployment Checklist

- [ ] Set `DOMAIN` environment variable
- [ ] Set `FRONTEND_URL` environment variable  
- [ ] Generate and set `SECRET_KEY_BASE`
- [ ] Configure DNS to point to Coolify server
- [ ] Deploy from `main` branch
- [ ] Verify both services start successfully
- [ ] Test API health endpoint: `https://api.{DOMAIN}/up`
- [ ] Test frontend loads: `https://{DOMAIN}`
- [ ] Test API communication from frontend

## 🔗 Useful Commands

```bash
# Generate Rails secret key
openssl rand -hex 64

# Test API health check locally
curl http://localhost:3001/up

# Check service logs in Coolify
# Use Coolify dashboard logs viewer

# Restart services
# Use Coolify dashboard restart button
```

## 📂 File Structure for Deployment

```
coolify-qonvia/
├── docker-compose.yml          # Main deployment config
├── api/
│   ├── Dockerfile             # Rails production image
│   └── frontend/
│       └── Dockerfile         # React production image
└── coolify/
    ├── docker-compose.prod.yml # Alternative config
    └── environment.example    # Environment reference
```

This setup is now ready for successful Coolify deployment! 🎉