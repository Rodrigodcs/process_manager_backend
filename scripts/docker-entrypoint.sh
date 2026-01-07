#!/bin/sh
set -e

echo "🔌 Waiting for database to be ready..."

# Create .env file from environment variables
echo "📝 Creating .env file..."
echo "PORT=$PORT" > .env
echo "TYPEORM_CONNECTION=$TYPEORM_CONNECTION" >> .env
echo "TYPEORM_HOST=$TYPEORM_HOST" >> .env
echo "TYPEORM_USERNAME=$TYPEORM_USERNAME" >> .env
echo "TYPEORM_PASSWORD=$TYPEORM_PASSWORD" >> .env
echo "TYPEORM_DATABASE=$TYPEORM_DATABASE" >> .env
echo "TYPEORM_PORT=$TYPEORM_PORT" >> .env
echo "NODE_ENV=$NODE_ENV" >> .env

echo "📄 .env file contents:"
cat .env

echo ""
echo "🗃️  Running migrations..."
npm run migration:run:prod

echo "🌱 Running seeds..."
npm run seed:prod

echo "🚀 Starting application..."
node dist/main

