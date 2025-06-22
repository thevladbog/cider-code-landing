#!/bin/bash

# Quick deployment script for local development

set -e

echo "🚀 Starting local deployment..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start the container
echo "📦 Building Docker image..."
docker-compose -f docker-compose.dev.yml build

echo "🔄 Starting container..."
docker-compose -f docker-compose.dev.yml up -d

echo "⏳ Waiting for application to start..."
sleep 10

# Health check
if curl -f http://localhost:3000/api/hello >/dev/null 2>&1; then
    echo "✅ Application is running at http://localhost:3000"
else
    echo "⚠️  Application might still be starting. Check logs with:"
    echo "   docker-compose -f docker-compose.dev.yml logs -f"
fi

echo "📊 To view logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.dev.yml down"
