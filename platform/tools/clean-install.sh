#!/bin/bash

echo "Cleaning out caches, builds, node_modules, etc..."
# Remove nested node_modules directories
find . -name "node_modules" -type d -prune -exec rm -rf {} \;
# Remove nested dist directories
find . -name "dist" -type d -prune -exec rm -rf {} \;
# Remove nested build directories
find . -name "build" -type d -prune -exec rm -rf {} \;
# Remove nested .next directories
find . -name ".next" -type d -prune -exec rm -rf {} \;
# Remove nested .netlify directories
find . -name ".netlify" -type d -prune -exec rm -rf {} \;
# Remove nested .turbo directories
find . -name ".turbo" -type d -prune -exec rm -rf {} \;
# Remove nested coverage directories
find . -name "coverage" -type d -prune -exec rm -rf {} \;

echo "Pruning pnpm store..."
pnpm store prune

pnpm install
