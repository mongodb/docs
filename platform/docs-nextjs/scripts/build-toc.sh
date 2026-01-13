#!/bin/bash

TOC_DIR="../../content/table-of-contents";
OUTPUT_PATH_RELATIVE_TO_TOC_DIR="../../platform/docs-nextjs/src/context/toc-data/data.copied.ts";

echo "Building table of contents...";

echo "Navigating to: $TOC_DIR";
cd $TOC_DIR;

echo "Installing dependencies...";
pnpm i;

echo "Running toc:build...";
pnpm build;

echo -e "\nCopying content/table-of-contents/output/toc.json to platform/docs-nextjs/src/context/toc-data/data.copied.ts\n";
# Create data.copied.ts with proper TypeScript format
echo "// Auto-generated from toc.json" > $OUTPUT_PATH_RELATIVE_TO_TOC_DIR
echo -n "export const tocData = " >> $OUTPUT_PATH_RELATIVE_TO_TOC_DIR
cat ./output/toc.json >> $OUTPUT_PATH_RELATIVE_TO_TOC_DIR
echo " as const;" >> $OUTPUT_PATH_RELATIVE_TO_TOC_DIR

echo "Table of contents build completed successfully!";
