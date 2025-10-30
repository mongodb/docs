import * as fs from 'node:fs';
import * as path from 'node:path';
import type { TocItem } from '../../types';

export const generateJSON = (toc: TocItem[]) => {
  const filePath = path.join('output');

  console.log(`File will be written to ./${filePath}`);

  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(
    path.join(filePath, 'toc.json'),
    JSON.stringify(toc, null, 2),
  );

  console.log(`The toc.json was written to ./${filePath}`);
};
