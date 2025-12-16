FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (without frozen-lockfile since we're building standalone)
# If building from workspace root, copy pnpm-lock.yaml and use --frozen-lockfile
RUN pnpm install

# Copy the rest of the application files
COPY . .
