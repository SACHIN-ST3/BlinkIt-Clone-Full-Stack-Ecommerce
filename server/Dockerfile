# ============================
# Stage 1 - Build
# ============================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# ============================
# Stage 2 - Production
# ============================
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy application
COPY --from=builder /app .

# Expose backend port
EXPOSE 8080

# Start server
CMD ["npm", "start"]
