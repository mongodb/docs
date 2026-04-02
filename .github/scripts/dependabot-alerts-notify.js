/**
 * Dependabot Alerts Notification Script
 * 
 * This script fetches Dependabot alerts from GitHub, maps them to team ownership
 * using a Google Sheet, and sends Slack notifications to the responsible team leads.
 * 
 * Environment Variables Required:
 * - GITHUB_TOKEN: GitHub PAT with dependabot alerts read access
 * - SLACK_WEBHOOK_URL: Slack webhook URL for notifications
 * - SLACK_BOT_TOKEN: Slack bot token for user ID lookups
 * - HOURS_LOOKBACK: Number of hours to look back for new alerts (default: 1)
 * - REPO_OWNER: Repository owner (e.g., '10gen')
 * - REPO_NAME: Repository name (e.g., 'docs-mongodb-internal')
 * - FALLBACK_EMAIL: Email for edge case escalation
 */

const https = require('https');

// Configuration from environment
const CONFIG = {
  githubToken: process.env.GITHUB_TOKEN,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  hoursLookback: parseInt(process.env.HOURS_LOOKBACK || '1', 10),
  repoOwner: process.env.REPO_OWNER || '10gen',
  repoName: process.env.REPO_NAME || 'docs-mongodb-internal',
  fallbackEmail: process.env.FALLBACK_EMAIL || 'antonio.morello@mongodb.com',
};

// Cache for Slack ID lookups to avoid duplicate requests
const slackIdCache = {};



/**
 * Make an HTTPS request and return parsed JSON
 */
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

/**
 * Look up Slack user ID by email using the Slack API
 */
async function lookupSlackId(email) {
  // Check cache first
  if (slackIdCache[email]) {
    return slackIdCache[email];
  }

  if (!CONFIG.slackBotToken) {
    console.log(`⚠️ SLACK_BOT_TOKEN not configured, using name for: ${email}`);
    return null;
  }

  try {
    const options = {
      hostname: 'slack.com',
      path: `/api/users.lookupByEmail?email=${encodeURIComponent(email)}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CONFIG.slackBotToken}`,
        'Accept': 'application/json'
      }
    };

    const response = await httpsRequest(options);

    if (response.statusCode === 200 && response.data && response.data.ok) {
      const slackId = response.data.user?.id;
      if (slackId && typeof slackId === 'string' && slackId.startsWith('U')) {
        console.log(`✅ Found Slack ID for ${email}: ${slackId}`);
        slackIdCache[email] = slackId;
        return slackId;
      }
    }
  } catch (error) {
    console.log(`⚠️ Error looking up Slack ID for ${email}: ${error.message}`);
  }

  return null;
}

/**
 * Fetch Dependabot alerts from GitHub API
 */
async function fetchDependabotAlerts() {
  console.log('📡 Fetching Dependabot alerts from GitHub...');

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/dependabot/alerts?state=open&per_page=100`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CONFIG.githubToken}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'dependabot-alerts-notify',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  };

  const response = await httpsRequest(options);

  if (response.statusCode !== 200) {
    throw new Error(`GitHub API error: ${response.statusCode} - ${JSON.stringify(response.data)}`);
  }

  return response.data;
}

/**
 * Filter alerts created within the lookback period
 */
function filterRecentAlerts(alerts) {
  const cutoffTime = new Date(Date.now() - CONFIG.hoursLookback * 60 * 60 * 1000);
  console.log(`⏰ Filtering alerts created after: ${cutoffTime.toISOString()}`);

  const recentAlerts = alerts.filter(alert => {
    const createdAt = new Date(alert.created_at);
    return createdAt >= cutoffTime;
  });

  return recentAlerts;
}

// Cache for PRs to avoid hitting API rate limits
let graphqlPRCache = null;

/**
 * Fetch the exact Pull Request associated with an alert using GitHub's GraphQL API.
 * 
 * Unlike the REST API, GraphQL directly exposes the 'dependabotUpdate' relationship
 * which accurately links an alert to its respective PR, preventing false matches.
 */
async function fetchDependabotPR(alert) {
  // Initialize and populate the GraphQL cache on the first call
  if (graphqlPRCache === null) {
    graphqlPRCache = {};
    console.log(`📡 Fetching PR mappings via GitHub GraphQL API...`);
    
    const query = `
      query { 
        repository(owner: "${CONFIG.repoOwner}", name: "${CONFIG.repoName}") { 
          vulnerabilityAlerts(last: 100) { 
            nodes { 
              number 
              dependabotUpdate { pullRequest { url } } 
            } 
          } 
        } 
      }
    `;

    const graphqlOptions = {
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.githubToken}`,
        'User-Agent': 'dependabot-alerts-notify',
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await httpsRequest(graphqlOptions, JSON.stringify({ query }));
      if (response.statusCode === 200 && response.data?.data) {
        const nodes = response.data.data.repository.vulnerabilityAlerts.nodes || [];
        for (const node of nodes) {
          if (node.dependabotUpdate?.pullRequest?.url) {
            graphqlPRCache[node.number] = node.dependabotUpdate.pullRequest.url;
          }
        }
        console.log(`✅ Loaded ${Object.keys(graphqlPRCache).length} explicit PR mappings from GraphQL`);
      } else {
        console.log(`⚠️ GraphQL PR mapping failed: ${response.statusCode} - ${JSON.stringify(response.data)}`);
      }
    } catch (e) {
      console.log(`⚠️ Error fetching GraphQL PR mappings: ${e.message}`);
    }
  }

  // Lookup the alert in the cache
  const prUrl = graphqlPRCache[alert.number];
  if (prUrl) {
    console.log(`✅ Found exact PR match for Alert #${alert.number}: ${prUrl}`);
    return prUrl;
  }
  
  console.log(`ℹ️ No PR found for Alert #${alert.number}`);
  return null;
}

/**
 * Extract the manifest path from the alert for directory matching
 */
function extractManifestPath(alert) {
  const manifest = alert.dependency?.manifest_path || '';
  if (!manifest) return 'unknown';

  // Remove leading slash
  return manifest.replace(/^\//, '');
}

/**
 * Fetch team mapping from Google Sheets (published as CSV)
 * Based on the published spreadsheet:
 * https://docs.google.com/spreadsheets/d/1WfXs7uvRo8rArBAiEB3kpt3EM5OV_8vITJYLYpQMegw
 */
async function fetchTeamMapping() {
  console.log('📊 Loading team mapping from configuration...');

  // Directory Mapping - maps path prefixes to teams
  // Source: Directory Mapping tab of the ownership spreadsheet
  const directoryMapping = {
    // Server Docs
    'content/manual': 'Server Docs',
    'content/database-tools': 'Server Docs',
    'content/mongosync': 'Server Docs',
    'content/relational-migrator': 'Server Docs',
    'content/mongodb-shell': 'Server Docs',
    'content/mongodb-intellij': 'Server Docs',
    'content/mcp-server': 'Server Docs',

    // Cloud Docs
    'content/atlas': 'Cloud Docs',
    'content/atlas-architecture': 'Cloud Docs',
    'content/atlas-cli': 'Cloud Docs',
    'content/atlas-government': 'Cloud Docs',
    'content/atlas-operator': 'Cloud Docs',
    'content/bi-connector': 'Cloud Docs',
    'content/charts': 'Cloud Docs',
    'content/cloud-manager': 'Cloud Docs',
    'content/datalake': 'Cloud Docs',
    'content/kafka-connector': 'Cloud Docs',
    'content/kubernetes': 'Cloud Docs',
    'content/kubernetes-operator': 'Cloud Docs',
    'content/mongocli': 'Cloud Docs',
    'content/ops-manager': 'Cloud Docs',
    'content/sql-interface': 'Cloud Docs',
    'content/voyageai': 'Cloud Docs',

    // DevDocs
    'code-example-tests': 'DevDocs',

    // Driver Docs
    'content/c-driver': 'Driver Docs',
    'content/pymongo-driver': 'Driver Docs',
    'content/node': 'Driver Docs',
    'content/java': 'Driver Docs',

    // DoP (Docs Platform)
    'platform': 'DoP (Docs Platform)',
    'content/table-of-contents': 'DoP (Docs Platform)',
    '.github': 'DoP (Docs Platform)'
  };

  // Team Mapping - maps teams to their leads
  // Source: Team Mapping tab of the ownership spreadsheet
  const teamMapping = {
    'Cloud Docs': [
      { name: 'John Williams', email: 'john.williams@mongodb.com' },
      { name: 'Kevin Meyer', email: 'kevin.meyer@mongodb.com' },
    ],
    'Server Docs': [
      { name: 'Ashley Brown', email: 'ashley.brown@mongodb.com' },
      { name: 'Sarah Olson', email: 'sarah.olson@mongodb.com' }
    ],
    'Driver Docs': [
      { name: 'Caitlin Davey', email: 'caitlin.davey@mongodb.com' },
      { name: 'Rachel Mackintosh', email: 'rachel.mackintosh@mongodb.com' }
    ],
    'DoP (Docs Platform)': [
      { name: 'Zach Winters', email: 'zach.winters@mongodb.com' }
    ],
    'DevDocs': [
      { name: 'Kyle Rollins', email: 'kyle.rollins@mongodb.com' }
    ]
  };

  return { directoryMapping, teamMapping };
}

/**
 * Map an alert to its responsible team and leads using path prefix matching
 */
function mapAlertToTeam(alert, directoryMapping, teamMapping) {
  const manifestPath = extractManifestPath(alert);

  // Find the best matching directory prefix (longest match wins)
  let matchedPrefix = null;
  let matchedTeam = null;

  for (const [prefix, team] of Object.entries(directoryMapping)) {
    if (manifestPath.startsWith(prefix) || manifestPath.startsWith(prefix + '/')) {
      // Use the longest matching prefix
      if (!matchedPrefix || prefix.length > matchedPrefix.length) {
        matchedPrefix = prefix;
        matchedTeam = team;
      }
    }
  }

  if (!matchedTeam) {
    return {
      manifestPath,
      team: null,
      leads: [],
      edgeCase: `Path '${manifestPath}' not found in Directory Mapping`
    };
  }

  const leads = teamMapping[matchedTeam];
  if (!leads || leads.length === 0) {
    return {
      manifestPath,
      team: matchedTeam,
      leads: [],
      edgeCase: `Team '${matchedTeam}' has no leads in Team Mapping`
    };
  }

  return { manifestPath, team: matchedTeam, leads, edgeCase: null };
}

/**
 * Compose a single alert message and get Slack IDs for tagging
 */
async function composeSingleAlertMessage(alert, mapping, prUrl) {
  const alertNumber = alert.number;
  const severity = alert.security_advisory?.severity || 'unknown';
  const alertName = alert.security_advisory?.summary || alert.dependency?.package?.name || 'Unknown Alert';
  const alertUrl = alert.html_url;

  // Get Slack IDs for leads (for tagging via payload)
  const slackIds = [];
  const leadNames = [];
  for (const lead of mapping.leads) {
    const slackId = await lookupSlackId(lead.email);
    if (slackId) {
      slackIds.push(slackId);
    }
    leadNames.push(lead.name);
  }
  const leadsTag = leadNames.join(', ');

  let message = `🚨 *Dependabot Security Alert* 🚨\n\n`;
  message += `⚠️ *Alert #${alertNumber}: ${alertName}*\n`;
  message += `• *Severity*: ${severity}\n`;
  message += `• *Alert Link*: ${alertUrl}\n`;
  if (prUrl) {
    message += `• *Pull Request*: ${prUrl}\n`;
  }
  message += `• *Responsible Team*: ${mapping.team}\n\n`;
  message += `${leadsTag} - Please review and work with your team to resolve this vulnerability.`;

  return { message, slackIds };
}

/**
 * Compose an edge case alert message (no team assigned)
 */
function composeEdgeCaseMessage(alert, mapping, prUrl) {
  const alertNumber = alert.number;
  const alertName = alert.security_advisory?.summary || alert.dependency?.package?.name || 'Unknown Alert';
  const alertUrl = alert.html_url;

  let message = `🚨 *Dependabot Security Alert - Manual Assignment Required* 🚨\n\n`;
  message += `⚠️ *Alert #${alertNumber}: ${alertName}*\n`;
  message += `• *Alert Link*: ${alertUrl}\n`;
  if (prUrl) {
    message += `• *Pull Request*: ${prUrl}\n`;
  }
  message += `• *Issue*: ${mapping.edgeCase}\n`;
  message += `• *Escalation Contact*: ${CONFIG.fallbackEmail}\n\n`;
  message += 'Please update the ownership mapping spreadsheet accordingly.';

  return { message, slackIds: [] };
}

/**
 * Send message to Slack via workflow webhook
 */
async function sendSlackNotification(message, slackIds) {
  console.log('📤 Sending Slack notification via workflow webhook...');
  console.log(`👥 Tagging ${slackIds.length} user(s): ${slackIds.join(', ')}`);

  const url = new URL(CONFIG.slackWebhookUrl);

  // Send message and user IDs to workflow webhook
  // If only one lead, duplicate their ID for both user1 and user2
  const payload = {
    text: message,
    user1: slackIds[0] || '',
    user2: slackIds[1] || slackIds[0] || ''
  };

  const postData = JSON.stringify(payload);

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const response = await httpsRequest(options, postData);

  if (response.statusCode !== 200) {
    throw new Error(`Slack webhook error: ${response.statusCode} - ${JSON.stringify(response.data)}`);
  }

  console.log('✅ Slack notification sent successfully!');
  return { success: true };
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Dependabot Alerts Notification Script');
  console.log(`📅 Looking back ${CONFIG.hoursLookback} hour(s) for new alerts`);

  try {
    // Validate required environment variables
    if (!CONFIG.githubToken) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }
    if (!CONFIG.slackWebhookUrl) {
      throw new Error('SLACK_WEBHOOK_URL environment variable is required');
    }
    if (!CONFIG.slackBotToken) {
      throw new Error('SLACK_BOT_TOKEN environment variable is required for Slack ID lookups');
    }

    // Phase 1: Fetch alerts
    const allAlerts = await fetchDependabotAlerts();
    console.log(`📋 Found ${allAlerts.length} total open Dependabot alerts`);

    // Filter for recent alerts
    const recentAlerts = filterRecentAlerts(allAlerts);
    console.log(`🆕 Found ${recentAlerts.length} alerts created in the last ${CONFIG.hoursLookback} hour(s)`);

    if (recentAlerts.length === 0) {
      console.log('✅ No new Dependabot alerts found. Exiting.');
      return;
    }

    // Phase 2: Fetch team mapping
    const { directoryMapping, teamMapping } = await fetchTeamMapping();

    // Map alerts to teams
    const alertsWithMapping = [];
    const edgeCaseAlerts = [];

    for (const alert of recentAlerts) {
      const mapping = mapAlertToTeam(alert, directoryMapping, teamMapping);

      if (mapping.edgeCase) {
        edgeCaseAlerts.push({ alert, mapping });
      } else {
        alertsWithMapping.push({ alert, mapping });
      }
    }

    console.log(`✅ Mapped ${alertsWithMapping.length} alerts to teams`);
    console.log(`⚠️  ${edgeCaseAlerts.length} alerts require manual assignment`);

    // Phase 3: Send individual Slack messages for each alert
    let messagesSent = 0;

    // Send messages for alerts with team mapping
    for (const { alert, mapping } of alertsWithMapping) {
      console.log(`\n📨 Processing Alert #${alert.number}...`);
      const prUrl = await fetchDependabotPR(alert);
      const { message, slackIds } = await composeSingleAlertMessage(alert, mapping, prUrl);
      await sendSlackNotification(message, slackIds);
      messagesSent++;

      // Small delay between messages to avoid rate limiting
      if (alertsWithMapping.length > 1 || edgeCaseAlerts.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Send messages for edge case alerts
    for (const { alert, mapping } of edgeCaseAlerts) {
      console.log(`\n📨 Processing Edge Case Alert #${alert.number}...`);
      const prUrl = await fetchDependabotPR(alert);
      const { message, slackIds } = composeEdgeCaseMessage(alert, mapping, prUrl);
      await sendSlackNotification(message, slackIds);
      messagesSent++;

      // Small delay between messages to avoid rate limiting
      if (edgeCaseAlerts.indexOf({ alert, mapping }) < edgeCaseAlerts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Phase 4: Summary
    console.log('\n📊 Execution Summary:');
    console.log(`- Alerts Found: ${recentAlerts.length}`);
    console.log(`- Alerts Successfully Mapped: ${alertsWithMapping.length}`);
    console.log(`- Alerts Requiring Manual Assignment: ${edgeCaseAlerts.length}`);
    console.log(`- Slack Messages Sent: ${messagesSent}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
