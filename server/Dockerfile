# ==========================================
# Stage 1 - Install Dependencies
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# ==========================================
# Stage 2 - Production Image
# ==========================================
FROM node:22-alpine

WORKDIR /app

# Environment
ENV NODE_ENV=production

# Copy application from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose backend port
EXPOSE 8080

# Start the backend
CMD ["npm", "start"]
