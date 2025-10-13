#!/bin/bash

# Helper script to obtain SHA256 checksums for MongoDB tools (Grove)
# This script downloads the tools and computes their checksums

set -euo pipefail

echo "🔐 Grove - MongoDB Tools Checksum Generator"
echo "========================================"
echo

# Atlas CLI
echo "Atlas CLI"
ATLAS_CLI_URL="https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.42.2_linux_x86_64.deb"
echo "URL: $ATLAS_CLI_URL"
printf "Computing checksum... "
ATLAS_CLI_SHA256=$(curl -sL "$ATLAS_CLI_URL" | sha256sum | awk '{print $1}')
echo "✓"
echo "SHA256: $ATLAS_CLI_SHA256"
echo

# MongoDB Database Tools
echo "MongoDB Database Tools"
DB_TOOLS_URL="https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.13.0.deb"
echo "URL: $DB_TOOLS_URL"
printf "Computing checksum... "
DB_TOOLS_SHA256=$(curl -sL "$DB_TOOLS_URL" | sha256sum | awk '{print $1}')
echo "✓"
echo "SHA256: $DB_TOOLS_SHA256"
echo

# Sample Data (optional)
echo "Sample Data (Optional)"
SAMPLE_DATA_URL="https://atlas-education.s3.amazonaws.com/sampledata.archive"
echo "URL: $SAMPLE_DATA_URL"
printf "Computing checksum... "
SAMPLE_DATA_SHA256=$(curl -sL "$SAMPLE_DATA_URL" | sha256sum | awk '{print $1}')
echo "✓"
echo "SHA256: $SAMPLE_DATA_SHA256"
echo

# Summary
echo "========================================"
echo "Checksums Generated Successfully"
echo "========================================"
echo

# Instructions
echo "Next Steps:"
echo
echo "1. Update .github/actions/grove-setup-mongodb/action.yml:"
echo
echo "   Line ~58 - Replace ATLAS_CLI_SHA256:"
echo "   ATLAS_CLI_SHA256=\"$ATLAS_CLI_SHA256\""
echo
echo "   Line ~100 - Replace DB_TOOLS_SHA256:"
echo "   DB_TOOLS_SHA256=\"$DB_TOOLS_SHA256\""
echo
echo "2. (Optional) Create sample data checksum file:"
echo "   echo \"$SAMPLE_DATA_SHA256  sampledata.archive\" > .github/actions/grove-setup-mongodb/sampledata.sha256"
echo
echo "3. Commit the changes:"
echo "   git add .github/actions/grove-setup-mongodb/action.yml"
echo "   git add .github/actions/grove-setup-mongodb/sampledata.sha256  # if created"
echo "   git commit -m \"Update MongoDB tools checksums for security verification\""
echo

# Offer to create sample data checksum file
printf "Would you like to create the sample data checksum file now? (y/n) "
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    CHECKSUM_FILE=".github/actions/grove-setup-mongodb/sampledata.sha256"
    echo "$SAMPLE_DATA_SHA256  sampledata.archive" > "$CHECKSUM_FILE"
    echo "✓ Created $CHECKSUM_FILE"
    echo
fi

echo "Done!"
