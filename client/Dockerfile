# ==========================================
# Stage 1 - Build React/Vite Application
# ==========================================

# Use the official lightweight Node.js 22 Alpine image
# This stage is only used to build the React application.
FROM node:22-alpine AS builder

# Set the working directory inside the container.
# All following commands will run from /app.
WORKDIR /app

# Copy package.json and package-lock.json first.
# This improves Docker layer caching because dependencies
# are only reinstalled when these files change.
COPY package*.json ./

# Install all project dependencies.
# 'npm ci' is recommended for production builds because
# it installs exactly what is specified in package-lock.json.
RUN npm ci

# Copy the complete React project into the container.
COPY . .

# Build the React/Vite application.
# The production files will be generated inside /app/dist.
RUN npm run build


# ==========================================
# Stage 2 - Production Image (Nginx)
# ==========================================

# Use a lightweight Nginx image to serve the static React files.
FROM nginx:stable-alpine

# Remove the default Nginx welcome page.
RUN rm -rf /usr/share/nginx/html/*

# Copy the production build generated in Stage 1
# into Nginx's web root directory.
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration.
# This configuration:
#   - serves the React application
#   - forwards all /api requests to the backend container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 inside the container.
# Docker Compose maps this to port 5173 on the EC2 host.
EXPOSE 80

# Start Nginx in the foreground.
# Docker containers must keep the main process running.
CMD ["nginx", "-g", "daemon off;"]
