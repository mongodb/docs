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

// Private Preview OpenAPI specs. MongoDB publishes one spec per Private
// Preview program under openapi/v2/private/. Every operation in those specs
// carries "x-beta": true and "x-state": { "label": "PREVIEW" }. Presence in
// these specs is what identifies an endpoint set as Private Preview: the
// paths themselves may also appear in the generally available spec, as the
// Overload Protection Simulation endpoints do, so path absence is not a
// reliable signal.
const PRIVATE_PREVIEW_SPECS_API = 'https://api.github.com/repos/mongodb/openapi/contents/openapi/v2/private';

// Replaces path parameter names with a placeholder so that
// /groups/{groupId}/clusters/{clusterName} matches the same endpoint
// declared with different parameter names in the OpenAPI spec.
function normalizePath(apiPath) {
  return apiPath.replace(/\{[^}]*\}/g, '{}');
}

function endpointKey(method, apiPath) {
  return `${method.toUpperCase()} ${normalizePath(apiPath)}`;
}

async function fetchJson(url) {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'atlas-rate-limits-generator'
  };

  // Authenticate GitHub API requests when a token is available to avoid
  // unauthenticated rate limiting in CI.
  if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com/')) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await request(url, { headers, followRedirect: true });

  if (response.status !== 200) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  return JSON.parse(response.data.toString());
}

function isPrivatePreviewOperation(operation) {
  if (!operation || typeof operation !== 'object' || !operation.responses) {
    return false;
  }

  return operation['x-beta'] === true || operation['x-state']?.label === 'PREVIEW';
}

// Returns the set of endpoints that are in Private Preview, keyed by method
// and normalized path. Individual endpoints in this set are removed from
// their endpoint set, and a set is dropped entirely when no endpoints
// remain.
async function getPrivatePreviewEndpoints() {
  const contents = await fetchJson(PRIVATE_PREVIEW_SPECS_API);
  const specFiles = contents.filter(
    (entry) => entry.name.startsWith('openapi-private-preview-') && entry.name.endsWith('.json')
  );

  if (specFiles.length === 0) {
    throw new Error('No Private Preview OpenAPI specs found; cannot determine Private Preview status');
  }

  const endpoints = new Set();

  for (const specFile of specFiles) {
    const spec = await fetchJson(specFile.download_url);

    Object.entries(spec.paths || {}).forEach(([apiPath, operations]) => {
      Object.entries(operations).forEach(([method, operation]) => {
        if (!isPrivatePreviewOperation(operation)) {
          return;
        }

        endpoints.add(endpointKey(method, apiPath));
      });
    });
  }

  console.error(`Found ${endpoints.size} Private Preview endpoints across ${specFiles.length} specs`);

  return endpoints;
}

// Groups the rate limit results that belong in the published table, keyed by
// endpoint set name. Endpoint sets are excluded by name, and individual
// endpoints are excluded when they are serverless, legacy Data Lake, or
// Private Preview. An endpoint set that has no endpoints left after
// filtering is dropped, which covers the case where every endpoint in the
// set is in Private Preview.
function groupPublishableLimits(results, privatePreviewEndpoints) {
  const groupedResults = {};

  (results || []).forEach((limit) => {
    // Skip Data Lake Pipelines and Legacy Backups by endpoint set name
    const name = limit.endpointSetName || 'N/A';
    if (name === 'Data Lake Pipelines' || name === 'Legacy Backups') {
      return;
    }

    // Filter out serverless and legacy dataLakes endpoints from the
    // endpoint list
    let endpoints = (limit.endpoints || []).filter(
      (ep) => !ep.path.includes('/serverless') && !ep.path.includes('/dataLakes')
    );

    // Filter out individual Private Preview endpoints. An endpoint set can
    // mix Private Preview and generally available endpoints, so filter per
    // endpoint rather than skipping the whole set.
    const publicEndpoints = endpoints.filter(
      (ep) => !privatePreviewEndpoints.has(endpointKey(ep.method, ep.path))
    );

    const removedCount = endpoints.length - publicEndpoints.length;
    if (removedCount > 0) {
      console.error(
        `Removed ${removedCount} Private Preview endpoint(s) from endpoint set: ${name}`
      );
    }

    endpoints = publicEndpoints;

    // Skip if no endpoints remain after filtering
    if (endpoints.length === 0) {
      return;
    }

    if (!groupedResults[name]) {
      groupedResults[name] = [];
    }
    groupedResults[name].push({ ...limit, endpoints });
  });

  return groupedResults;
}

async function generateRateLimitsTable() {
  try {
    const authConfig = await getAuthHeaders();

    console.error('Fetching Private Preview OpenAPI specs...');
    const privatePreviewEndpoints = await getPrivatePreviewEndpoints();

    console.error('Fetching rate limits from Atlas API...');
    
    // Call the rate limits API
    const response = await request('https://cloud.mongodb.com/api/atlas/v2/rateLimits', authConfig);
    const responseData = JSON.parse(response.data.toString());

    console.error('Successfully fetched rate limits');

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

    const groupedResults = groupPublishableLimits(responseData.results, privatePreviewEndpoints);

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

// Only run when invoked directly so that the pure helpers can be required
// from tests.
if (require.main === module) {
  generateRateLimitsTable();
}

module.exports = {
  normalizePath,
  endpointKey,
  isPrivatePreviewOperation,
  groupPublishableLimits
};
