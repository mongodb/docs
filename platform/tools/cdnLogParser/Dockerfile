FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
# Note: build context is platform/tools/cdnLogParser; pnpm-lock.yaml lives at platform/ so we only copy package.json
COPY package.json ./

RUN pnpm install

# Copy the rest of the application files
COPY . .
