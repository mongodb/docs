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

    // Generate table with timestamp
    let table = `.. Last updated: ${timestamp}\n\n`;
    table += ".. list-table::\n   :header-rows: 1\n   :widths: 20 10 35 10 10 15\n\n";
    table += "   * - Endpoint Set\n     - Scope\n     - Endpoints\n     - Max Capacity\n     - Refill Rate\n     - Refill Interval (seconds)\n\n";

    // Sort by endpointSetName for consistency
    responseData.results.sort((a, b) => {
      const nameA = a.endpointSetName || '';
      const nameB = b.endpointSetName || '';
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    // Generate table rows
    responseData.results.forEach((limit) => {
      const name = limit.endpointSetName || 'N/A';
      const scope = limit.scope || 'N/A';
      const capacity = limit.capacity?.value || 'N/A';
      const refillRate = limit.refillRate?.value || 'N/A';
      const refillDuration = limit.refillDurationSeconds?.value || 'N/A';

      // Format endpoints list
      let endpointsList = '';
      if (limit.endpoints && limit.endpoints.length > 0) {
        endpointsList = limit.endpoints.map(ep => {
          return `**${ep.method}** \`\`${ep.path}\`\``;
        }).join('\n       | ');
        endpointsList = '| ' + endpointsList;
      } else {
        endpointsList = 'N/A';
      }

      table += `   * - ${name}\n     - ${scope}\n     - ${endpointsList}\n     - ${capacity}\n     - ${refillRate}\n     - ${refillDuration}\n\n`;
    });

    // Determine output path
    const outputPath = process.env.OUTPUT_FILE || path.join(__dirname, '..', '..', 'atlas', 'source', 'includes', 'api-rate-limits.rst');
    
    // Write to file
    fs.writeFileSync(outputPath, table, 'utf8');
    console.error(`Successfully wrote rate limits table to: ${outputPath}`);
    
    // Also output to stdout for debugging/piping if needed
    console.log(table);
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
