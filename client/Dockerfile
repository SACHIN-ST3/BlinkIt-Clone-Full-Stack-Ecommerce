# ==========================================
# Stage 1 - Build React Application
# ==========================================
FROM node:22-alpine AS builder

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production React app
RUN npm run build

# ==========================================
# Stage 2 - Serve with Nginx
# ==========================================
FROM nginx:stable-alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
