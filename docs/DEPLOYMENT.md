# Deployment Setup Guide

## Overview
This project uses GitHub Actions for CI/CD with deployment to Yandex Cloud using Docker and Traefik reverse proxy.

## Required GitHub Secrets

### Yandex Cloud Configuration
- `YC_OAUTH_TOKEN` - Yandex Cloud OAuth token
- `YC_CLOUD_ID` - Yandex Cloud ID
- `YC_FOLDER_ID` - Yandex Cloud folder ID
- `YCR_REGISTRY_ID` - Yandex Container Registry ID
- `VM_ID` - Target VM ID for deployment

### Application Configuration
- `NEXT_PUBLIC_SITE_URL` - Public URL of the landing page
- `NEXT_PUBLIC_APP_URL` - URL of the main application
- `CONTACT_EMAIL_TO` - Email address to receive contact form submissions
- `CONTACT_EMAIL_FROM` - Email address for sending emails

### SMTP Configuration
- `SMTP_HOST` - SMTP server host (e.g., smtp.yandex.ru)
- `SMTP_PORT` - SMTP server port (465 for SSL)
- `SMTP_SECURE` - Use SSL/TLS (true for port 465)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password or app password

### Yandex Tracker Integration
- `TRACKER_PRIVATE_KEY` - Yandex Tracker private key for service account
- `TRACKER_KEY_ID` - Yandex Tracker key ID
- `TRACKER_SERVICE_ACCOUNT_ID` - Yandex Tracker service account ID
- `TRACKER_ORG_ID` - Yandex Tracker organization ID
- `TRACKER_QUEUE_KEY` - Yandex Tracker queue key for creating issues

### Domain Configuration
- `PROD_DOMAIN` - Production domain (e.g., bottlecode.app)
- `STAGING_DOMAIN` - Staging domain (e.g., staging.bottlecode.app)

## Server Setup

### 1. Install Docker and Docker Compose
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Setup Traefik (Reverse Proxy)
```bash
# Create traefik directory
sudo mkdir -p /opt/traefik

# Create traefik network
sudo docker network create proxy

# Create traefik configuration
sudo tee /opt/traefik/docker-compose.yml > /dev/null <<EOF
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./acme.json:/acme.json
    networks:
      - proxy

networks:
  proxy:
    external: true
EOF

# Create traefik configuration file
sudo tee /opt/traefik/traefik.yml > /dev/null <<EOF
api:
  dashboard: true
  insecure: false

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entrypoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
    network: proxy

certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@domain.com
      storage: acme.json
      httpChallenge:
        entryPoint: web
EOF

# Create acme.json for SSL certificates
sudo touch /opt/traefik/acme.json
sudo chmod 600 /opt/traefik/acme.json

# Start Traefik
cd /opt/traefik
sudo docker-compose up -d
```

### 3. Prepare Application Directory
```bash
# Create application directory
sudo mkdir -p /opt/bottle-code-landing
sudo chown $USER:$USER /opt/bottle-code-landing
```

## Deployment Workflow

### Branches and Environments
- `main` branch → Production deployment
- `develop` branch → Staging deployment

### Deployment Process
1. Push to `main` or `develop` branch
2. GitHub Actions builds and tests the application
3. Docker image is built and pushed to Yandex Container Registry
4. Application is deployed to the server using docker-compose
5. Health check ensures the deployment was successful

## Local Development

### Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=https://app.bottlecode.app
CONTACT_EMAIL_TO=contact@bottlecode.app
CONTACT_EMAIL_FROM=noreply@bottlecode.app
RESEND_API_KEY=your_resend_api_key
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build application
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Monitoring and Maintenance

### Check deployment status
```bash
# SSH to server
ssh user@your-server.com

# Check running containers
sudo docker ps

# Check application logs
sudo docker logs bottle-code-landing-prod
sudo docker logs bottle-code-landing-staging

# Check Traefik logs
sudo docker logs traefik
```

### Manual deployment
```bash
# On server
cd /opt/bottle-code-landing
sudo docker-compose pull
sudo docker-compose up -d
```

## Troubleshooting

### Common Issues
1. **SSL Certificate issues**: Check Traefik logs and ensure DNS is pointing to the server
2. **Application not starting**: Check application logs for errors
3. **Container Registry access**: Verify YC credentials and registry permissions

### Useful Commands
```bash
# Restart all services
sudo docker-compose restart

# View real-time logs
sudo docker-compose logs -f

# Remove old images
sudo docker image prune -a

# Check disk usage
sudo docker system df
```
