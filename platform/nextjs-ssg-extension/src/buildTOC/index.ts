import type { NetlifyPluginUtils } from '@netlify/build';
import path from 'node:path';
import fs from 'node:fs/promises';

import type { AllContentData } from '../contentMetadata/processContentMetadata';
import { buildUnifiedTOC } from '../util/buildTOC/generateJSON';
import { getRepoPaths } from '../paths';

export const buildToc = async ({
  allContentData: _allContentData,
  utils,
}: {
  allContentData: AllContentData;
  utils: {
    run: NetlifyPluginUtils['run'];
  };
}) => {
  const { absoluteContentPath, tocDataDir } = getRepoPaths();
  const tableOfContentsCWD = absoluteContentPath('table-of-contents');
  await buildUnifiedTOC({
    run: utils.run,
    tableOfContentsCWD,
  });

  // Copy toc.json and export as tocData in data.copied.ts
  try {
    const tocJsonPath = path.join(tableOfContentsCWD, 'output', 'toc.json');

    // Create toc-data directory if it doesn't exist and read the JSON content
    await fs.mkdir(tocDataDir, { recursive: true });
    const tocJsonContent = await fs.readFile(tocJsonPath, 'utf-8');

    const tsContent = `// Auto-generated from toc.json
  export const tocData = ${tocJsonContent} as const;
  `;

    const outputPath = path.join(tocDataDir, 'data.copied.ts');
    await fs.writeFile(outputPath, tsContent, 'utf-8');

    console.log(`Successfully created ${outputPath} with tocData export`);
  } catch (error) {
    console.error('Error creating tocData export:', error);
  }
};
