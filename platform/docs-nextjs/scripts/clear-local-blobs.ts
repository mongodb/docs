import 'dotenv/config';
import chalk from 'chalk';
import { store, BLOB_STORE_NAME } from '../src/mdx-utils/blob-store';

const main = async () => {
  console.log(chalk.cyan('Clearing local blob store:'), chalk.yellow(BLOB_STORE_NAME));

  try {
    const { deletedBlobs } = await store.deleteAll();

    console.log(chalk.green(`\n✓ Local blob store cleared: ${chalk.yellow(deletedBlobs)} blobs deleted`));
  } catch (error) {
    console.error(chalk.red('\n✗ Failed to clear local blob store:'), error);
    throw error;
  }
};

main();
