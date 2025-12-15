import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { createGunzip } from 'zlib';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface LogFile {
    key: string;
    size: number;
    lastModified: Date;
}

interface AWSCredentials {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
}

interface LogEntry {
    timestamp: string;
    userAgent: string;
    requestPath: string;
    statusCode: string;
    ipAddress: string;
    referer: string;
    isAI: boolean;
    aiType?: string;
}

interface AgentData {
    total_page_views: number;
    total_referrals: number;
    all_pages: Map<string, number>;
}

interface DailyReport {
    date: string;
    overview: {
        total_page_views: number;
        ai_page_views: number;
        human_page_views: number;
        ai_referrals: number;
        human_percentage: number;
    };
    [agentName: string]: any;  // Per-agent data like "open_ai", "anthropic", etc.
}

interface AgentPatternConfig {
    agent_id: string;
    agent_name: string;
    user_agent_patterns: string[];
    referrer_patterns: string[];
    enabled: boolean;
}

class LogParser {
    private s3Client: S3Client;
    private bucketName: string;
    private region: string;
    private mongoClient: MongoClient | null = null;

    // AI-related user agent patterns - loaded from MongoDB
    private aiUserAgentPatterns: RegExp[] = [];
    private aiReferrerPatterns: { pattern: RegExp; type: string }[] = [];

    constructor(credentials?: AWSCredentials) {
        this.bucketName = 'dop-cdn-logs';

        // Use provided credentials, then env vars, then default
        if (credentials) {
            this.region = credentials.region || 'us-east-1';
            this.s3Client = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: credentials.accessKeyId,
                    secretAccessKey: credentials.secretAccessKey,
                }
            });
        } else if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
            // Use environment variables
            this.region = process.env.AWS_REGION || 'us-east-1';
            this.s3Client = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                }
            });
            console.log('Using AWS credentials from environment variables');
        } else {
            // Use default credential chain (AWS CLI, IAM roles, etc.)
            this.region = process.env.AWS_REGION || 'us-east-1';
            this.s3Client = new S3Client({ region: this.region });
            console.log('Using default AWS credential chain');
        }
    }

    /**
     * Get or create MongoDB client (lazy initialization)
     */
    private async getMongoClient(): Promise<MongoClient> {
        if (!this.mongoClient) {
            const mongoUri = process.env.MONGODB_URI;
            if (!mongoUri) {
                throw new Error('MONGODB_URI not set. Please configure MongoDB connection.');
            }
            this.mongoClient = new MongoClient(mongoUri);
            await this.mongoClient.connect();
            console.log(`✅ Connected to MongoDB`);
        }
        return this.mongoClient;
    }

    /**
     * Close MongoDB client connection
     */
    async closeMongoClient(): Promise<void> {
        if (this.mongoClient) {
            await this.mongoClient.close();
            this.mongoClient = null;
        }
    }

    /**
     * Load AI agent patterns from MongoDB (required)
     */
    async loadAgentPatternsFromDB(): Promise<void> {
        const dbName = process.env.MONGODB_DATABASE || 'cdn_analytics';
        const collectionName = 'agent_patterns';

        const client = await this.getMongoClient();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const patterns = await collection.find<AgentPatternConfig>({ enabled: true }).toArray();

        if (patterns.length === 0) {
            throw new Error('No agent patterns found in database.');
        }

        // Build user agent patterns
        this.aiUserAgentPatterns = [];
        for (const config of patterns) {
            for (const patternStr of config.user_agent_patterns) {
                this.aiUserAgentPatterns.push(new RegExp(patternStr, 'i'));
            }
        }

        // Build referrer patterns
        this.aiReferrerPatterns = [];
        for (const config of patterns) {
            for (const patternStr of config.referrer_patterns) {
                this.aiReferrerPatterns.push({
                    pattern: new RegExp(patternStr, 'i'),
                    type: config.agent_id
                });
            }
        }

        console.log(`✅ Loaded ${patterns.length} AI agent patterns from database`);
        console.log(`   Total UA patterns: ${this.aiUserAgentPatterns.length}`);
        console.log(`   Total referrer patterns: ${this.aiReferrerPatterns.length}`);
    }

    /**
     * Check if a user agent is likely AI-related
     */
    private isAIUserAgent(userAgent: string): { isAI: boolean; aiType?: string } {
        if (!userAgent || userAgent === '-') {
            return { isAI: false }; // Empty user agents are not counted as AI
        }

        for (const pattern of this.aiUserAgentPatterns) {
            if (pattern.test(userAgent)) {
                let aiType = 'other_ai';

                // Categorize by specific AI companies/services
                if (/ChatGPT-User|GPTBot|openai\/chatgpt/i.test(userAgent)) {
                    aiType = 'chatgpt';
                }
                else if (/Google-Extended|GoogleOther/i.test(userAgent)) {
                    aiType = 'google_gemini';
                }
                else if (/BingBot|BingPreview|microsoft\/bing\s*ai|bingbot\/ai/i.test(userAgent)) {
                    aiType = 'microsoft_copilot';
                }
                else if (/PerplexityBot|Perplexity/i.test(userAgent)) {
                    aiType = 'perplexity';
                }
                else if (/meta-externalagent|FacebookBot|Meta-ExternalFetcher/i.test(userAgent)) {
                    aiType = 'meta_ai';
                }
                else if (/Grokbot|X-Grok/i.test(userAgent)) {
                    aiType = 'grok';
                }

                return { isAI: true, aiType };
            }
        }

        return { isAI: false };
    }

    /**
     * Check if a user agent is a regular browser (to be excluded)
     */
    private isRegularBrowser(userAgent: string): boolean {
        if (!userAgent || userAgent === '-') {
            return false; // Empty user agents are suspicious, not regular browsers
        }

        // If it matches any AI/bot/crawler pattern, do NOT treat as regular browser
        for (const pattern of this.aiUserAgentPatterns) {
            if (pattern.test(userAgent)) {
                return false;
            }
        }

        // Regular browser patterns to exclude
        const browserPatterns = [
            // Standard Mozilla browsers
            /^Mozilla\/5\.0.*AppleWebKit/i,
            /^Mozilla\/5\.0.*Gecko/i,
            /^Mozilla\/5\.0.*Trident/i,

            // Other common browsers
            /^Opera\//i,
            /^Edge\//i,
            /^Chrome\//i,
            /^Safari\//i,
            /^Firefox\//i,
        ];

        return browserPatterns.some(pattern => pattern.test(userAgent));
    }

    /**
     * Parse a single log line into a structured object
     */
    private parseLogLine(line: string): LogEntry | null {
        // Skip header lines and empty lines
        if (line.startsWith('#') || line.trim() === '') {
            return null;
        }

        // Split by tabs (CloudFront logs are tab-separated)
        const fields = line.split('\t');

        if (fields.length < 20) {
            return null; // Invalid log line
        }

        try {
            // CloudFront log format (tab-separated):
            // 0: date, 1: time, 2: x-edge-location, 3: sc-bytes, 4: c-ip, 5: cs-method,
            // 6: cs(Host), 7: cs-uri-stem, 8: sc-status, 9: cs(Referer), 10: cs(User-Agent), ...
            const date = fields[0];
            const time = fields[1];
            const ipAddress = fields[4];      // c-ip (client IP)
            const requestPath = fields[7];    // cs-uri-stem
            const statusCode = fields[8];     // sc-status
            const referer = fields[9];        // cs(Referer)
            const userAgent = fields[10];     // cs(User-Agent)

            const timestamp = `${date} ${time}`;
            const { isAI, aiType } = this.isAIUserAgent(userAgent);

            return {
                timestamp,
                userAgent: userAgent || '-',
                requestPath: requestPath || '-',
                statusCode: statusCode || '-',
                ipAddress: ipAddress || '-',
                referer: referer || '-',
                isAI,
                aiType
            };
        } catch (error) {
            console.warn('Error parsing log line:', error);
            return null;
        }
    }

    /**
     * Check if a referer is from an AI product
     */
    private isAIReferer(referer: string): { isAI: boolean; aiType?: string } {
        if (!referer || referer === '-') {
            return { isAI: false };
        }

        // Use loaded patterns from MongoDB
        for (const { pattern, type } of this.aiReferrerPatterns) {
            if (pattern.test(referer)) {
                return { isAI: true, aiType: type };
            }
        }

        return { isAI: false };
    }


    /**
     * Check if a request is likely a page view (HTML/document request)
     */
    private isPageView(requestPath: string, contentType?: string): boolean {
        // Check if it's a document/HTML request
        if (contentType && contentType.includes('text/html')) {
            return true;
        }

        // Check if it's a docs path that doesn't end with common asset extensions
        if (requestPath.startsWith('/docs')) {
            const assetExtensions = [
                '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot',
                '.pdf', '.zip', '.xml', '.json', '.txt', '.md', '.yml', '.yaml', '.map', '.min.js', '.min.css'
            ];
            const hasAssetExtension = assetExtensions.some(ext => requestPath.toLowerCase().endsWith(ext));

            // If it doesn't have an asset extension and doesn't look like an API call, it's likely a page view
            if (!hasAssetExtension &&
                !requestPath.includes('/api/') &&
                !requestPath.includes('.') &&
                !requestPath.includes('/_next/') &&
                !requestPath.includes('/static/') &&
                !requestPath.includes('/assets/')) {
                return true;
            }
        }

        return false;
    }

    /**
     * List all .gz files in the www.mongodb.com/ folder
     */
    async listLogFiles(prefix: string = 'www.mongodb.com/'): Promise<LogFile[]> {
        console.log(`Listing .gz files in s3://${this.bucketName}/${prefix}`);

        const files: LogFile[] = [];
        let continuationToken: string | undefined;

        try {
            do {
                const command = new ListObjectsV2Command({
                    Bucket: this.bucketName,
                    Prefix: prefix,
                    ContinuationToken: continuationToken,
                });

                const response = await this.s3Client.send(command);

                if (response.Contents) {
                    const gzFiles = response.Contents.filter(obj =>
                        obj.Key && obj.Key.endsWith('.gz')
                    );

                    files.push(...gzFiles.map(obj => ({
                        key: obj.Key!,
                        size: obj.Size || 0,
                        lastModified: obj.LastModified || new Date(),
                    })));
                }

                continuationToken = response.NextContinuationToken;
            } while (continuationToken);

            console.log(`Found ${files.length} .gz files`);
            return files;
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }


    /**
     * Get log files from a specific start date (24-hour period)
     */
    async getLogFilesFromDate(startDate: Date): Promise<LogFile[]> {
        const allFiles = await this.listLogFiles();
        const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

        return allFiles.filter(file =>
            file.lastModified >= startDate && file.lastModified < endDate
        );
    }


    /**
     * Process a single log file and return its content as string (streaming approach)
     */
    async processLogFileStreaming(fileKey: string): Promise<string> {
        console.log(`Processing: ${fileKey}`);

        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });

            const response = await this.s3Client.send(command);

            if (!response.Body) {
                throw new Error('No body in response');
            }

            // Convert to buffer and decompress
            const chunks: Buffer[] = [];
            const stream = response.Body as any;

            return new Promise((resolve, reject) => {
                const gunzip = createGunzip();

                stream.pipe(gunzip)
                    .on('data', (chunk: Buffer) => chunks.push(chunk))
                    .on('end', () => {
                        const content = Buffer.concat(chunks).toString('utf-8');
                        resolve(content);
                    })
                    .on('error', reject);
            });
        } catch (error) {
            console.error(`Error processing ${fileKey}:`, error);
            return '';
        }
    }



    /**
     * Parse log content and build per-agent data structure
     */
    async parsePageViews(content: string): Promise<{
        totalPageViews: number;
        aiPageViews: number;
        humanPageViews: number;
        aiReferrals: number;
        agentData: Map<string, AgentData>;
    }> {
        const summary = {
            totalPageViews: 0,
            aiPageViews: 0,
            humanPageViews: 0,
            aiReferrals: 0,
            agentData: new Map<string, AgentData>(),
        };

        // Process lines one at a time to reduce memory usage
        const lines = content.split('\n');

        for (const line of lines) {
            const entry = this.parseLogLine(line);
            if (!entry) continue;

            // Filter to only /docs paths
            if (!entry.requestPath.startsWith('/docs')) {
                continue;
            }

            // Only count page views (not assets)
            if (!this.isPageView(entry.requestPath)) {
                continue;
            }

            // Only count 200 responses (successful requests)
            if (entry.statusCode !== '200') {
                continue;
            }

            // Count all page views
            summary.totalPageViews++;

            // Check for AI referrals (regardless of user agent)
            const { isAI: isAIReferer, aiType: aiReferralType } = this.isAIReferer(entry.referer);
            if (isAIReferer && aiReferralType) {
                summary.aiReferrals++;

                // Track referral by agent
                if (!summary.agentData.has(aiReferralType)) {
                    summary.agentData.set(aiReferralType, {
                        total_page_views: 0,
                        total_referrals: 0,
                        all_pages: new Map<string, number>(),
                    });
                }
                const agentData = summary.agentData.get(aiReferralType)!;
                agentData.total_referrals++;
            }

            // Check for human users (regular browsers)
            if (this.isRegularBrowser(entry.userAgent)) {
                summary.humanPageViews++;
                continue;
            }

            // Process AI-related page views
            if (entry.isAI && entry.aiType) {
                summary.aiPageViews++;

                // Initialize agent data if not exists
                if (!summary.agentData.has(entry.aiType)) {
                    summary.agentData.set(entry.aiType, {
                        total_page_views: 0,
                        total_referrals: 0,
                        all_pages: new Map<string, number>(),
                    });
                }

                const agentData = summary.agentData.get(entry.aiType)!;
                agentData.total_page_views++;

                // Track page views by path
                const pathCount = agentData.all_pages.get(entry.requestPath) || 0;
                agentData.all_pages.set(entry.requestPath, pathCount + 1);
            }
        }

        return summary;
    }

    /**
     * Process files in smaller batches to reduce memory usage
     */
    async processFilesInBatches(files: LogFile[], batchSize: number = 3): Promise<{
        totalPageViews: number;
        aiPageViews: number;
        humanPageViews: number;
        aiReferrals: number;
        agentData: Map<string, AgentData>;
    }> {
        let totalPageViews = 0;
        let aiPageViews = 0;
        let humanPageViews = 0;
        let aiReferrals = 0;
        const agentData = new Map<string, AgentData>();

        // Process files in batches
        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)} (files ${i + 1}-${Math.min(i + batchSize, files.length)})`);

            // Process batch in parallel
            const batchPromises = batch.map((file, j) => {
                const fileIndex = i + j;
                return (async () => {
                    try {
                        console.log(`  Processing file ${fileIndex + 1}/${files.length}: ${file.key}`);

                        const content = await this.processLogFileStreaming(file.key);
                        if (content) {
                            return await this.parsePageViews(content);
                        }
                    } catch (error) {
                        console.error(`Error processing file ${file.key}:`, error);
                    }
                    return null;
                })();
            });

            // Wait for all files in batch to complete
            const batchResults = await Promise.all(batchPromises);

            // Aggregate results from this batch
            for (const pageViewData of batchResults) {
                if (!pageViewData) continue;

                // Aggregate overview data
                totalPageViews += pageViewData.totalPageViews;
                aiPageViews += pageViewData.aiPageViews;
                humanPageViews += pageViewData.humanPageViews;
                aiReferrals += pageViewData.aiReferrals;

                // Aggregate per-agent data
                for (const [agentType, data] of pageViewData.agentData) {
                    if (!agentData.has(agentType)) {
                        agentData.set(agentType, {
                            total_page_views: 0,
                            total_referrals: 0,
                            all_pages: new Map<string, number>(),
                        });
                    }

                    const aggregatedData = agentData.get(agentType)!;
                    aggregatedData.total_page_views += data.total_page_views;
                    aggregatedData.total_referrals += data.total_referrals;

                    // Aggregate page paths
                    for (const [path, count] of data.all_pages) {
                        const existingCount = aggregatedData.all_pages.get(path) || 0;
                        aggregatedData.all_pages.set(path, existingCount + count);
                    }
                }
            }

            // Force garbage collection after each batch
            if (global.gc) {
                global.gc();
                console.log(`  Memory cleanup after batch ${Math.floor(i / batchSize) + 1}`);
            }

            // Add a small delay between batches to allow memory cleanup
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return {
            totalPageViews,
            aiPageViews,
            humanPageViews,
            aiReferrals,
            agentData,
        };
    }

    /**
     * Save daily report to MongoDB
     */
    async saveToMongoDB(report: DailyReport): Promise<void> {
        const dbName = process.env.MONGODB_DATABASE || 'cdn_analytics';
        const collectionName = process.env.MONGODB_COLLECTION || 'daily_reports';

        try {
            const client = await this.getMongoClient();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            // Upsert by date (replace if exists, insert if not)
            const result = await collection.replaceOne(
                { date: report.date },
                report,
                { upsert: true }
            );

            if (result.upsertedCount > 0) {
                console.log(`✅ Inserted new report for ${report.date}`);
            } else {
                console.log(`✅ Updated existing report for ${report.date}`);
            }

        } catch (error) {
            console.error('❌ Error saving to MongoDB:', error);
            throw error;
        }
    }
}

// Example usage
async function main() {
    // Enable garbage collection if --expose-gc flag is used
    if (process.argv.includes('--expose-gc')) {
        console.log('✅ Garbage collection enabled');
    } else {
        console.warn('⚠️  For better memory management, run with: node --expose-gc parseLogs.ts  --start-date=2025-12-04');
    }

    // Parse command line arguments for start date
    const startDateArg = process.argv.find(arg => arg.startsWith('--start-date='));
    let startDate: Date;

    if (startDateArg) {
        const dateStr = startDateArg.split('=')[1];
        startDate = new Date(dateStr);
        console.log(`📅 Using start date: ${startDate.toISOString()}`);
    } else {
        // Default to today at midnight
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        console.log(`📅 Using default start date (today): ${startDate.toISOString()}`);
        console.log('💡 To specify a different start date, use: --start-date=2024-01-15');
    }

    const parser = new LogParser();

    // Load AI agent patterns from MongoDB
    await parser.loadAgentPatternsFromDB();

    try {
        // Get files from the specified start date (24-hour period)
        const files = await parser.getLogFilesFromDate(startDate);
        const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        console.log(`Files from ${startDate.toISOString()} to ${endDate.toISOString()} (24-hour period): ${files.length}`);

        if (files.length > 0) {
            console.log(`\nProcessing ${files.length} files from the requested 24-hour period...`);

            // Use batched processing to reduce memory usage
            const batchSize = 20; // Process 20 files at a time

            const results = await parser.processFilesInBatches(files, batchSize);

            // Build JSON report structure
            const report: DailyReport = {
                date: startDate.toISOString().split('T')[0],
                overview: {
                    total_page_views: results.totalPageViews,
                    ai_page_views: results.aiPageViews,
                    human_page_views: results.humanPageViews,
                    ai_referrals: results.aiReferrals,
                    human_percentage: results.totalPageViews > 0
                        ? parseFloat(((results.humanPageViews / results.totalPageViews) * 100).toFixed(2))
                        : 0,
                },
            };

            // Add per-agent data
            for (const [agentType, data] of results.agentData) {
                // Convert Map to plain object, sorted by page views descending
                const sortedPages = Array.from(data.all_pages.entries())
                    .sort((a, b) => b[1] - a[1]);

                const pagesObject: { [key: string]: number } = {};
                for (const [path, count] of sortedPages) {
                    pagesObject[path] = count;
                }

                report[agentType] = {
                    total_page_views: data.total_page_views,
                    total_referrals: data.total_referrals,
                    all_pages: pagesObject,
                };
            }

            // Save to MongoDB if configured
            await parser.saveToMongoDB(report);

            // Output JSON to stdout
            console.log(JSON.stringify(report, null, 2));

        } else {
            console.warn('No files found for the specified date range.');
        }

    } catch (error) {
        console.error('Error in main:', error);
        process.exit(1);
    } finally {
        // Close MongoDB connection
        await parser.closeMongoClient();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}

export { LogParser, LogEntry };