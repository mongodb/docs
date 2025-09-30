# Content Checker

Checks if pages in the table of contents have corresponding content files.

## Usage

1. Build the the toc.json file
    * `> cd content/table-of-contents`
    * `> npm run build`
2. Run the Script
   * `> cd incorrect-content-script`
   * `> npx tsx check-missing-content.ts`
   * NOTE: to install dependencies run `> npm ci`

## What it does

- Reads `../output/toc.json`
- Checks if content files exist for each URL
- Outputs `missing-content-pages.csv` with missing pages

## Output

CSV file with columns:
- URL
- Version 
- Content Site
- Expected Path
