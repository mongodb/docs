// Set up environment variables before any modules are imported
// This runs before setupFilesAfterEnv, so it executes before test-setup.ts

// Set all required environment variables to dummy values for tests
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
process.env.JIRA_USERNAME = process.env.JIRA_USERNAME || 'test-user';
process.env.JIRA_PASSWORD = process.env.JIRA_PASSWORD || 'test-password';
process.env.SLACK_QUOKKA_OAUTH_ACCESS_TOKEN = process.env.SLACK_QUOKKA_OAUTH_ACCESS_TOKEN || 'test-token';
process.env.CONTENTSTACK_API_KEY = process.env.CONTENTSTACK_API_KEY || 'test-api-key';
process.env.CONTENTSTACK_DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN || 'test-delivery-token';
process.env.CONTENTSTACK_ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT || 'test-env';

// Set DB_ENV to a valid value (defaults to 'dev' if not set)
process.env.DB_ENV = process.env.DB_ENV || 'dev';
