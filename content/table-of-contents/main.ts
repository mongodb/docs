import { generateJSON } from './src/utils/create-json-file';
import { toc } from './toc';

export const main = () => {
  generateJSON(toc);
};

main();
