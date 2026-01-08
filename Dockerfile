# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src ./src

COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 8080

CMD sh -c "npm run migration:run && npm run seed && node dist/main.js"