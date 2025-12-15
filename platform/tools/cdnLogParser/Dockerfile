FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .
