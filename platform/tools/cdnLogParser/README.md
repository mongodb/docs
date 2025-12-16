# CDN Log Parser

This script reads and processes CDN log files from the `dop-cdn-logs` S3 bucket in the `us-east-1` region.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure AWS credentials (choose one method):

### Method 1: Environment Variables with .env file (Recommended)
```bash
# Copy the example file
cp env.example .env

# Edit .env with your actual credentials
nano .env
```

Your `.env` file should look like:
```
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_REGION=us-east-1
```

### Method 2: Environment Variables (direct export)
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
```

### Method 3: AWS CLI
```bash
aws configure
```
Enter your AWS Access Key ID, Secret Access Key, and set region to `us-east-1`

### Method 4: IAM Roles (if running on EC2/ECS)
The script will automatically use IAM roles if available.

### Method 5: Explicit Credentials in Code
Uncomment and modify the credentials section in `parseLogs.ts`:
```typescript
const parser = new LogParser({
  accessKeyId: 'your_access_key',
  secretAccessKey: 'your_secret_key',
  region: 'us-east-1'
});
```

**Note**: Ensure your credentials have read access to the `dop-cdn-logs` bucket.

## Usage

### Basic usage
```bash
pnpm start
```

### Development mode (with file watching)
```bash
pnpm dev
```

### Build for production
```bash
pnpm build
```

## Features

- **List log files**: Lists all .gz files in the `www.mongodb.com/` folder
- **Download and decompress**: Downloads .gz files and decompresses them
- **Filter by time**: Get recent log files (last N hours)
- **Process content**: Extract log content as string for further processing

## Next Steps

The script is set up to:
1. ✅ List and download .gz files from S3
2. ✅ Decompress the files
3. 🔄 Parse log content (to be implemented)
4. 🔄 Filter out AI-related user agents (to be implemented)
5. 🔄 Count requests (to be implemented)

## File Structure

- `parseLogs.ts` - Main script with LogParser class
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `env.example` - Template for environment variables
- `README.md` - This file

## AWS Permissions Required

The script requires the following AWS permissions:
- `s3:ListBucket` on `dop-cdn-logs`
- `s3:GetObject` on `dop-cdn-logs/www.mongodb.com/*`

## Troubleshooting

If you get credential errors:
1. Verify your AWS credentials are properly configured
2. Check that your credentials have the required S3 permissions
3. Ensure you're in the correct AWS region (`us-east-1`)
4. Try running `aws sts get-caller-identity` to verify your credentials work
5. Make sure your `.env` file is in the same directory as `parseLogs.ts` 

## Cron Job

View runs at https://grafana.corp.mongodb.com/d/SIhkCBlmz/cronjobs-new?orgId=1&var-datasource=RKBfgIOSz&var-namespace=docs&var-cronjob=All