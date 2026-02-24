const { request } = require('urllib');
const fs = require('fs');
const path = require('path');

async function getAuthHeaders() {
  // Use resource version from env var or default to preview for rate limits
  const resourceVersion = process.env.ATLAS_API_VERSION || 'preview';
  const acceptHeader = `application/vnd.atlas.${resourceVersion}+json`;
  
  // Service Account OAuth flow
  if (process.env.ATLAS_CLIENT_ID && process.env.ATLAS_CLIENT_SECRET) {
    const tokenUrl = 'https://cloud.mongodb.com/api/oauth/token';
    const credentials = Buffer.from(`${process.env.ATLAS_CLIENT_ID}:${process.env.ATLAS_CLIENT_SECRET}`).toString('base64');
    
    const tokenResponse = await request(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials'
    });
    
    const tokenData = JSON.parse(tokenResponse.data.toString());
    return {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': acceptHeader,
        'Content-Type': 'application/json'
      }
    };
  }
  
  // API Key digest auth (legacy)
  if (process.env.ATLAS_PUBLIC_KEY && process.env.ATLAS_PRIVATE_KEY) {
    const apiKey = `${process.env.ATLAS_PUBLIC_KEY}:${process.env.ATLAS_PRIVATE_KEY}`;
    return {
      digestAuth: apiKey,
      headers: { 
        'Accept': acceptHeader,
        'Content-Type': 'application/json'
      }
    };
  }
  
  throw new Error('Authentication credentials not found. Set either ATLAS_CLIENT_ID/ATLAS_CLIENT_SECRET (service account) or ATLAS_PUBLIC_KEY/ATLAS_PRIVATE_KEY (API key)');
}

async function generateRateLimitsTable() {
  try {
    const authConfig = await getAuthHeaders();

    console.error('Fetching rate limits from Atlas API...');
    
    // Call the rate limits API
    const response = await request('https://cloud.mongodb.com/api/atlas/v2/rateLimits', authConfig);
    const responseData = JSON.parse(response.data.toString());

    console.error('Successfully fetched rate limits');
    console.errorimestamp
    const now = new Date();
    const options = { 
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };
    const timestamp = now.toLocaleString('en-US', options);

    // Generate sections with timestamp
    let output = `.. Last updated: ${timestamp}\n\n`;

    // Filter out serverless endpoints, data lake pipelines, legacy backups, and legacy dataLakes paths
    const groupedResults = {};
    responseData.results.forEach((limit) => {
      // Skip Data Lake Pipelines and Legacy Backups by endpoint set name
      const name = limit.endpointSetName || 'N/A';
      if (name === 'Data Lake Pipelines' || name === 'Legacy Backups') {
        return;
      }
      
      // Skip entire endpoint set if ALL endpoints contain serverless
      if (limit.endpoints && limit.endpoints.every(ep => ep.path.includes('/serverless'))) {
        return;
      }
      
      // Filter out serverless and legacy dataLakes endpoints from the endpoint list
      if (limit.endpoints) {
        limit.endpoints = limit.endpoints.filter(ep => 
          !ep.path.includes('/serverless') && !ep.path.includes('/dataLakes')
        );
      }
      
      // Skip if no endpoints remain after filtering
      if (!limit.endpoints || limit.endpoints.length === 0) {
        return;
      }
      
      if (!groupedResults[name]) {
        groupedResults[name] = [];
      }
      groupedResults[name].push(limit);
    });

    // Sort by endpoint set name for consistency
    const sortedNames = Object.keys(groupedResults).sort();

    // Generate sections for each endpoint set
    sortedNames.forEach((name) => {
      const limits = groupedResults[name];
      
      // Create anchor from name (lowercase, replace spaces with hyphens)
      const anchor = `api-rate-limits-${name.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Section header with anchor
      output += `.. _${anchor}:\n\n`;
      output += `${name}\n`;
      output += '~'.repeat(name.length) + '\n\n';
      
      // Show all scopes with consistent formatting
      limits.forEach((limit, index) => {
        const scope = limit.scope || 'N/A';
        const capacity = limit.capacity?.value || 'N/A';
        const refillRate = limit.refillRate?.value || 'N/A';
        const refillDuration = limit.refillDurationSeconds?.value || 'N/A';
        
        // Use consistent format with each item on separate line
        output += `**Scope:** ${scope}\n\n`;
        output += `**Capacity:** ${capacity}\n\n`;
        output += `**Refill:** ${refillRate}/${refillDuration}s\n\n`;
        
        // Endpoints list
        output += '**Endpoints:**\n\n';
        if (limit.endpoints && limit.endpoints.length > 0) {
          limit.endpoints.forEach(ep => {
            output += `* **${ep.method}** \`\`${ep.path}\`\`\n`;
          });
        } else {
          output += '* N/A\n';
        }
        
        // Add spacing between scopes if not the last one
        if (index < limits.length - 1) {
          output += '\n';
        }
      });
      
      output += '\n';
    });

    // Determine output path
    const outputPath = process.env.OUTPUT_FILE || path.join(__dirname, '..', '..', 'atlas', 'source', 'includes', 'api-rate-limits.rst');
    
    // Write to file
    fs.writeFileSync(outputPath, output, 'utf8');
    console.error(`Successfully wrote rate limits table to: ${outputPath}`);
    
    // Also output to stdout for debugging/piping if needed
    console.log(output);
  } catch (error) {
    if (error.status === 404) {
      console.error('\nERROR: Rate limits API endpoint not found (404).');
      console.error('This API may not be available in production yet.');
      console.error('You may need to use a different environment or wait for the API to be deployed.');
    } else if (error.status === 401 || error.status === 403) {
      console.error('\nERROR: Authentication failed.');
      console.error('Please check your credentials and permissions.');
    } else {
      console.error('\nERROR: Failed to fetch rate limits:');
      console.error(error.message);
      if (error.res) {
        console.error('Status:', error.status);
        console.error('Response:', error.data?.toString());
      }
    }
    process.exit(1);
  }
}

generateRateLimitsTable();
