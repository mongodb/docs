FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy configuration files
COPY babel.config.cjs jest.config.cjs ./

# Copy test files
COPY tests/ ./tests/

# Create a non-root user for security best practices
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Set NODE_ENV to production
ENV NODE_ENV=production

# Command to run the tests
# This will be executed by the Kubernetes CronJob
CMD ["npm", "test"]
