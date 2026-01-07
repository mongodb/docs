import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { ALL_FILE_EXTENSIONS } from '../src/mdx-utils/get-blob-key';
import { BLOB_STORE_NAME } from '../src/mdx-utils/blob-store';
import { CONTENT_MDX_DIR, uploadFile } from '../src/mdx-utils/blob-upload';

const BATCH_SIZE = 10; // how many files to upload at once
const DELAY_BETWEEN_BATCHES = 1000; // 1 second
const MAX_RETRIES = 6; // Maximum number of retries per batch
const RETRY_DELAY = 10000; // 10 seconds

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const collectFilePaths = async (currentDir: string): Promise<string[]> => {
  const files = await fs.readdir(currentDir, { withFileTypes: true });
  const filePaths: string[] = [];

  for (const file of files) {
    const fullPath = path.join(currentDir, file.name);

    if (file.isDirectory()) {
      const subDirFiles = await collectFilePaths(fullPath);
      filePaths.push(...subDirFiles);
    } else if (ALL_FILE_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
};

const uploadBatchWithRetry = async (
  batch: string[],
  retryCount = 0,
): Promise<Array<{ fullPath: string; error?: string }>> => {
  try {
    const results = await Promise.all(
      batch.map(async (fullPath) => {
        const result = await uploadFile(fullPath);
        return { fullPath, ...result };
      }),
    );

    const hasError = results.some((r) => r.error);

    if (hasError && retryCount < MAX_RETRIES) {
      console.log(
        chalk.yellow(
          `⚠ Rate limit detected. Waiting ${RETRY_DELAY / 1000} seconds before retrying batch (attempt ${
            retryCount + 1
          }/${MAX_RETRIES})...`,
        ),
      );
      await wait(RETRY_DELAY);

      // Retry only the failed files
      const failedFiles = results.filter((r) => r.error).map((r) => r.fullPath);

      const successfulResults = results.filter((r) => !r.error);
      const retryResults = await uploadBatchWithRetry(failedFiles, retryCount + 1);

      return [...successfulResults, ...retryResults];
    }

    return results;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(
        chalk.yellow(
          `⚠ Batch failed. Waiting ${RETRY_DELAY / 1000} seconds before retrying (attempt ${
            retryCount + 1
          }/${MAX_RETRIES})...`,
        ),
      );
      await wait(RETRY_DELAY);
      return uploadBatchWithRetry(batch, retryCount + 1);
    }
    // Return all as failed if max retries exceeded
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return batch.map((fullPath) => ({ fullPath, error: errorMessage }));
  }
};

const uploadInBatches = async (filePaths: string[]) => {
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < filePaths.length; i += BATCH_SIZE) {
    const batch = filePaths.slice(i, Math.min(i + BATCH_SIZE, filePaths.length));

    const results = await uploadBatchWithRetry(batch);

    results.forEach(({ fullPath, error }) => {
      if (error) {
        console.error(chalk.red(`✗ Failed to upload ${fullPath}:`), error);
        failureCount++;
      } else {
        // console.log(chalk.green(`✓ Uploaded ${fullPath}`));
        successCount++;
      }
    });

    const filesProcessed = Math.min(i + BATCH_SIZE, filePaths.length);
    console.log(chalk.yellow(`${filesProcessed}/${filePaths.length}`), chalk.cyan('files processed...'));

    // Add delay between batches
    if (i + BATCH_SIZE < filePaths.length) {
      await wait(DELAY_BETWEEN_BATCHES);
    }
  }

  return { successCount, failureCount };
};

const main = async () => {
  console.log(chalk.magenta('Starting local blob store seeding...'));
  console.log(chalk.gray('Content directory:'), chalk.cyan(CONTENT_MDX_DIR));
  console.log(chalk.gray('Blob store:'), chalk.cyan(BLOB_STORE_NAME));
  console.log(chalk.gray('Batch size:'), chalk.cyan(BATCH_SIZE));
  console.log(chalk.gray('Delay between batches:'), chalk.cyan(DELAY_BETWEEN_BATCHES / 1000 + 's'));
  console.log(chalk.gray('Max retries:'), chalk.cyan(MAX_RETRIES));
  console.log(chalk.gray('Retry delay:'), chalk.cyan(RETRY_DELAY / 1000 + 's'));

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.error(chalk.red('Error: Content directory not found:'), chalk.cyan(CONTENT_MDX_DIR));
    return;
  }

  try {
    const startTime = Date.now();
    console.log(chalk.magenta('\nScanning for files...'));
    const filePaths = await collectFilePaths(CONTENT_MDX_DIR);
    console.log(chalk.green(`Found ${filePaths.length} files to upload\n`));

    const { successCount, failureCount } = await uploadInBatches(filePaths);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(chalk.cyan(`\n✓ Local blob store seeded in ${chalk.yellow(duration + 's')}`));
    console.log(chalk.green(`  Uploaded: ${successCount} files`));
    if (failureCount > 0) {
      console.log(chalk.red(`  Failed: ${failureCount} files`));
    }
  } catch (error) {
    console.error(chalk.red('\n✗ Local blob store seeding failed:'), error);
    throw error;
  }
};

main();
