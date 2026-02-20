/**
 * Jest Global Setup
 *
 * Runs once before all test files to check available databases.
 * Stores results in process.env so all test processes can access them.
 *
 * Supports both local MongoDB (mongodb://) and Atlas (mongodb+srv://) connections.
 */

const { execSync } = require('child_process');

module.exports = async () => {
  console.log('\n🔍 Checking available databases...');

  try {
    const mongoUri = process.env.CONNECTION_STRING;
    if (!mongoUri) {
      console.warn('⚠️  CONNECTION_STRING not set - sample data checks will be skipped');
      process.env.AVAILABLE_DATABASES = JSON.stringify([]);
      return;
    }

    // Detect Atlas SRV connections for informational logging
    const isSrvConnection = mongoUri.startsWith('mongodb+srv://');
    if (isSrvConnection) {
      console.log('   Using Atlas (SRV) connection...');
    }

    // Query MongoDB for available databases
    // Use --nodb and connect() inside the eval to avoid shell escaping issues with special
    // characters in connection strings. This matches the approach used in Expect.js.
    const evalScript = `
      const conn = connect('${mongoUri.replace(/'/g, "\\'")}');
      const dbs = conn.getMongo().getDBs().databases.map(d => d.name);
      JSON.stringify(dbs);
    `.trim().replace(/\n\s*/g, ' ');

    const command = `mongosh --nodb --quiet --eval "${evalScript}"`;

    // Use longer timeout for Atlas connections (DNS SRV lookup + TLS handshake)
    const timeout = isSrvConnection ? 30000 : 10000;
    const output = execSync(command, { encoding: 'utf8', timeout });

    // Parse and store the results in process.env
    const databases = JSON.parse(output.trim());
    process.env.AVAILABLE_DATABASES = JSON.stringify(databases);

    // Show summary of sample databases found
    const sampleDatabases = [
      'sample_mflix',
      'sample_restaurants',
      'sample_training',
      'sample_analytics',
      'sample_airbnb',
      'sample_geospatial',
      'sample_guides',
      'sample_stores',
      'sample_supplies',
      'sample_weatherdata',
    ];

    const availableSampleDbs = sampleDatabases.filter(db => databases.includes(db));

    if (availableSampleDbs.length === 0) {
      console.log('📊 No MongoDB sample databases found');
      console.log('   Tests requiring sample data will be skipped');
      console.log('   To load sample data: https://www.mongodb.com/docs/atlas/sample-data/\n');
    } else {
      console.log(`📊 Found ${availableSampleDbs.length} sample database(s): ${availableSampleDbs.join(', ')}\n`);
    }
  } catch (error) {
    console.warn('⚠️  Failed to check databases:', error.message);
    console.warn('   Sample data checks will be skipped\n');
    process.env.AVAILABLE_DATABASES = JSON.stringify([]);
  }
};

