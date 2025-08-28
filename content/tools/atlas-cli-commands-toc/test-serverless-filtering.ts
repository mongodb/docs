#!/usr/bin/env node

/**
 * Test script for serverless filtering functionality
 * 
 * Usage:
 *   npx tsx test-serverless-filtering.ts
 */

// Standalone implementation of cleanServerlessReferences for testing
function cleanServerlessReferences(content: string, fileName?: string): string {
  let cleaned = content;
  let hasChanges = false;
  
  // Remove serverless toctree entries
  // This pattern matches lines in toctree that contain serverless commands
  const serverlessToctreePatterns = [
    /^\s+\w*[Ss]erverless\w*\s+<\/command\/.*>\s*$/gm,
    /^\s+.*[Ss]erverless.*\s+<\/command\/.*>\s*$/gm
  ];
  
  serverlessToctreePatterns.forEach(pattern => {
    const matches = cleaned.match(pattern);
    if (matches) {
      console.log(`  🧹 Removing ${matches.length} serverless toctree entries from ${fileName || 'file'}`);
      cleaned = cleaned.replace(pattern, '');
      hasChanges = true;
    }
  });
  
  // Remove serverless reference links 
  // Pattern: * :ref:`atlas-api-*-*Serverless*` - description
  const serverlessRefPatterns = [
    /^\s*\*\s+:ref:`[^`]*[Ss]erverless[^`]*`[^\n]*$/gm,
    /^\s*\*\s+:ref:`[^`]*[Ss]erverless[^`]*`[^\n]*\n/gm
  ];
  
  serverlessRefPatterns.forEach(pattern => {
    const matches = cleaned.match(pattern);
    if (matches) {
      console.log(`  🧹 Removing ${matches.length} serverless reference links from ${fileName || 'file'}`);
      cleaned = cleaned.replace(pattern, '');
      hasChanges = true;
    }
  });
  
  // Clean up any double empty lines left by removals
  if (hasChanges) {
    cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');
  }
  
  return cleaned;
}

// Test content with serverless references
const testContent = `
atlas api cloudBackups
======================

Description
-----------

Cloud backup operations.

Commands
--------

.. toctree::
   :titlesonly:

   createBackupExportJob </command/atlas-api-cloudBackups-createBackupExportJob>
   createServerlessBackupRestoreJob </command/atlas-api-cloudBackups-createServerlessBackupRestoreJob>
   getServerlessBackup </command/atlas-api-cloudBackups-getServerlessBackup>
   listServerlessBackups </command/atlas-api-cloudBackups-listServerlessBackups>
   takeSnapshot </command/atlas-api-cloudBackups-takeSnapshot>

Related commands
----------------

* :ref:\`atlas-api-cloudBackups-createServerlessBackupRestoreJob\` - Restores one snapshot of one serverless instance.
* :ref:\`atlas-api-cloudBackups-getServerlessBackup\` - Returns one snapshot of one serverless instance.
* :ref:\`atlas-api-cloudBackups-listServerlessBackups\` - Returns all snapshots of one serverless instance.
* :ref:\`atlas-api-cloudBackups-takeSnapshot\` - Takes one snapshot of one cluster.

Options
-------
`;

function runTests() {
  console.log('🧪 Testing serverless filtering functionality...\n');
  
  console.log('📄 Original content:');
  console.log('---');
  console.log(testContent);
  console.log('---\n');
  
  console.log('🧹 Cleaning serverless references...\n');
  
  const cleaned = cleanServerlessReferences(testContent, 'test-file.txt');
  
  console.log('\n📄 Cleaned content:');
  console.log('---');
  console.log(cleaned);
  console.log('---\n');
  
  // Verify the cleaning worked
  const hasServerlessToctree = /^\s+\w*[Ss]erverless\w*\s+<\/command\/.*>\s*$/m.test(cleaned);
  const hasServerlessRef = /^\s*\*\s+:ref:`[^`]*[Ss]erverless[^`]*`/m.test(cleaned);
  
  console.log('✅ Test Results:');
  console.log(`   Serverless toctree entries removed: ${!hasServerlessToctree ? '✅' : '❌'}`);
  console.log(`   Serverless reference links removed: ${!hasServerlessRef ? '✅' : '❌'}`);
  console.log(`   Non-serverless content preserved: ${cleaned.includes('takeSnapshot') ? '✅' : '❌'}`);
  
  if (!hasServerlessToctree && !hasServerlessRef && cleaned.includes('takeSnapshot')) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n❌ Some tests failed!');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests };
