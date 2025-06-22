# Quick deployment script for local development (Windows)

Write-Host "🚀 Starting local deployment..." -ForegroundColor Green

# Check if Docker is running
try {
  docker info | Out-Null
}
catch {
  Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
  exit 1
}

# Build and start the container
Write-Host "📦 Building Docker image..." -ForegroundColor Blue
docker-compose -f docker-compose.dev.yml build

Write-Host "🔄 Starting container..." -ForegroundColor Blue
docker-compose -f docker-compose.dev.yml up -d

Write-Host "⏳ Waiting for application to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Health check
try {
  Invoke-WebRequest -Uri "http://localhost:3000/api/hello" -Method GET | Out-Null
  Write-Host "✅ Application is running at http://localhost:3000" -ForegroundColor Green
}
catch {
  Write-Host "⚠️  Application might still be starting. Check logs with:" -ForegroundColor Yellow
  Write-Host "   docker-compose -f docker-compose.dev.yml logs -f" -ForegroundColor Cyan
}

Write-Host "📊 To view logs: docker-compose -f docker-compose.dev.yml logs -f" -ForegroundColor Cyan
Write-Host "🛑 To stop: docker-compose -f docker-compose.dev.yml down" -ForegroundColor Cyan
