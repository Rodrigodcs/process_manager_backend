# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for TypeORM migrations and seeds)
RUN npm install

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy source code (needed for seeds)
COPY --from=builder /app/src ./src

# Copy TypeScript config (needed for ts-node in seeds)
COPY --from=builder /app/tsconfig.json ./

# Copy entrypoint script
COPY scripts/docker-entrypoint.sh ./scripts/
RUN chmod +x ./scripts/docker-entrypoint.sh

# Expose port
EXPOSE 8082

# Use entrypoint script
CMD ["sh", "./scripts/docker-entrypoint.sh"]