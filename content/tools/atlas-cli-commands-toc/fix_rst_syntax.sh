#!/bin/bash
#
# Quick reStructuredText Syntax Fixer for Atlas CLI Documentation
# 
# This script fixes common reStructuredText syntax issues using sed commands.
# Run this script from the docs-mongodb-internal directory.
#
# Usage: ./fix_rst_syntax.sh [directory]
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  reStructuredText Syntax Fixer for Atlas CLI Docs${NC}"
echo -e "${BLUE}======================================================${NC}"

# Function to fix files in a directory
fix_directory() {
    local dir="$1"
    local pattern="$2"
    local description="$3"
    
    if [[ ! -d "$dir" ]]; then
        echo -e "${RED}Directory not found: $dir${NC}"
        return
    fi
    
    echo -e "\n${YELLOW}$description${NC}"
    echo "Directory: $dir"
    
    # Count files before processing
    file_count=$(find "$dir" -name "$pattern" | wc -l)
    echo "Files to process: $file_count"
    
    if [[ $file_count -eq 0 ]]; then
        echo -e "${YELLOW}No files found matching pattern: $pattern${NC}"
        return
    fi
    
    # Fix backticks issues
    echo "  Fixing backticks..."
    find "$dir" -name "$pattern" -exec sed -i '' 's/`mongos`/``mongos``/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/(`&`)/(\`\`&\`\`)/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/`admin`/``admin``/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/(`%2F`)/(\`\`%2F\`\`)/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/"flattenTeams" : true/``"flattenTeams" : true``/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/"includeOrgUsers": true/``"includeOrgUsers": true``/g' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/repeat the `m` parameter/repeat the ``m`` parameter/g' {} \;
    
    # Fix URL markup (basic patterns)
    echo "  Fixing URL markup..."
    find "$dir" -name "$pattern" -exec sed -i '' 's|To learn about profiles for the Atlas CLI, see https://dochub\.mongodb\.org/core/atlas-cli-save-connection-settings\.|To learn about profiles for the Atlas CLI, see `https://dochub.mongodb.org/core/atlas-cli-save-connection-settings <https://dochub.mongodb.org/core/atlas-cli-save-connection-settings>`__.|g' {} \;
    
    # Fix indentation issues in example blocks
    echo "  Fixing example block indentation..."
    find "$dir" -name "$pattern" -exec sed -i '' '/^Create the file below and save it as ``.*``$/{N;N;s/\n\n   \.\. literalinclude::/\n\n.. literalinclude::/;}' {} \;
    find "$dir" -name "$pattern" -exec sed -i '' 's/^   After creating ``.*``, run the command below/\nAfter creating the payload file, run the command below/g' {} \;
    
    # Fix duplicate language directives
    echo "  Fixing duplicate directives..."
    find "$dir" -name "$pattern" -exec sed -i '' '/language: shell/{N;s/\(:language: shell\)\n\s*:language: shell/\1/;}' {} \;
    
    # Fix tab indentation in completion files
    echo "  Fixing completion file indentation..."
    find "$dir" -name "*completion*.$2" -exec sed -i '' 's/^	\(.*\)$/\n.. code-block::\n\n   \1\n/g' {} \;
    
    echo -e "${GREEN}  ✓ Completed processing $file_count files${NC}"
}

# Determine directories to process
if [[ $# -eq 1 ]]; then
    # Process specified directory
    target_dir="$1"
    if [[ "$target_dir" == *".txt" ]] || [[ "$target_dir" == *"atlas-cli"* ]]; then
        fix_directory "$target_dir" "atlas-*.txt" "Processing Atlas CLI files (.txt)"
    elif [[ "$target_dir" == *".rst" ]] || [[ "$target_dir" == *"atlas/source"* ]]; then
        fix_directory "$target_dir" "atlas-*.rst" "Processing Atlas includes files (.rst)"
    else
        # Try to detect file types in directory
        if find "$target_dir" -name "*.txt" -quit | grep -q .; then
            fix_directory "$target_dir" "atlas-*.txt" "Processing .txt files"
        fi
        if find "$target_dir" -name "*.rst" -quit | grep -q .; then
            fix_directory "$target_dir" "atlas-*.rst" "Processing .rst files"
        fi
    fi
else
    # Process both default directories
    atlas_cli_dir="content/atlas-cli/upcoming/source/command"
    atlas_includes_dir="content/atlas/source/includes/command"
    
    fix_directory "$atlas_cli_dir" "atlas-*.txt" "1. Processing Atlas CLI directory (.txt files)"
    fix_directory "$atlas_includes_dir" "atlas-*.rst" "2. Processing Atlas includes directory (.rst files)"
fi

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}🎉 reStructuredText syntax fixing complete!${NC}"
echo -e "${BLUE}======================================================${NC}"

echo -e "\n${YELLOW}Summary of fixes applied:${NC}"
echo "  • Single backticks → double backticks for monospace text"
echo "  • Fixed indentation in literalinclude blocks"
echo "  • Improved URL markup"
echo "  • Fixed tab indentation in completion files"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  • Review the changes with: git diff"
echo "  • Test the documentation build"
echo "  • Commit the fixes: git add . && git commit -m 'Fix reStructuredText syntax issues'"
