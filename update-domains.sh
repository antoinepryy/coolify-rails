#!/bin/bash

# Script to update Coolify domains in the configuration files
# Usage: ./update-domains.sh <api-domain> <frontend-domain>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <api-domain> <frontend-domain>"
    echo "Example: $0 http://abc123.217.182.253.161.sslip.io http://def456.217.182.253.161.sslip.io"
    exit 1
fi

API_DOMAIN=$1
FRONTEND_DOMAIN=$2

echo "🔄 Updating domains in configuration files..."

# Update docker-compose.yml
echo "📝 Updating docker-compose.yml..."
sed -i.bak "s|API_URL:-http://[^}]*|API_URL:-$API_DOMAIN|g" docker-compose.yml

# Update CORS configuration
echo "📝 Updating CORS configuration..."
sed -i.bak "s|http://[^,]*\.sslip\.io|$FRONTEND_DOMAIN|g" api/config/initializers/cors.rb
sed -i.bak "s|https://[^,]*\.sslip\.io|${FRONTEND_DOMAIN/http:/https:}|g" api/config/initializers/cors.rb

# Update deployment guide
echo "📝 Updating deployment guide..."
sed -i.bak "s|API_URL=http://[^[:space:]]*|API_URL=$API_DOMAIN|g" COOLIFY_DEPLOYMENT.md
sed -i.bak "s|FRONTEND_URL=http://[^[:space:]]*|FRONTEND_URL=$FRONTEND_DOMAIN|g" COOLIFY_DEPLOYMENT.md

echo "✅ Domain update complete!"
echo ""
echo "📋 Updated configuration:"
echo "   API Domain: $API_DOMAIN"
echo "   Frontend Domain: $FRONTEND_DOMAIN"
echo ""
echo "🚀 Next steps:"
echo "   1. Commit the changes: git add . && git commit -m 'Update domains for deployment'"
echo "   2. Push to repository: git push"
echo "   3. Redeploy in Coolify"
echo ""
echo "🔧 Set these environment variables in Coolify:"
echo "   API_URL=$API_DOMAIN"
echo "   FRONTEND_URL=$FRONTEND_DOMAIN"