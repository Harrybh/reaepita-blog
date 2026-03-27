#!/bin/bash
set -e

echo "Starting deployment..."

# Install dependencies
npm install

# Build the application
npm run build

# Start/restart with PM2
if pm2 describe reaepita-blog > /dev/null 2>&1; then
  echo "Restarting existing PM2 process..."
  pm2 restart ecosystem.config.js
else
  echo "Starting new PM2 process..."
  pm2 start ecosystem.config.js
fi

# Save PM2 process list
pm2 save

echo "Deployment complete!"
echo "Run 'pm2 startup' to enable auto-start on boot."
