import 'dotenv/config';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { BLOB_STORE_NAME } from '../src/mdx-utils/blob-store';
import { IMAGE_EXTENSIONS, JSON_EXTENSION, MDX_EXTENSION } from '../src/mdx-utils/get-blob-key';
import { CONTENT_MDX_DIR, getRelativePath, deleteFile } from '../src/mdx-utils/blob-upload';

const DEV_SERVER_URL = 'http://localhost:8888';

const initializeWatcher = async () => {
  const patterns = [
    path.join(CONTENT_MDX_DIR, `**/*${MDX_EXTENSION}`),
    path.join(CONTENT_MDX_DIR, `**/*${JSON_EXTENSION}`),
    ...IMAGE_EXTENSIONS.map((ext) => path.join(CONTENT_MDX_DIR, '**/*' + ext)),
  ];

  const watcher = chokidar.watch(patterns, {
    persistent: true,
    ignoreInitial: true,
    ignored: ['**/node_modules/**', '**/.git/**', '**/.DS_Store'],
  });

  watcher
    .on('add', async (filePath) => {
      const relativePath = getRelativePath(filePath);
      const res = await fetch(`${DEV_SERVER_URL}/api/blobs/seed?path=${encodeURIComponent(relativePath)}`);
      const data = await res.json();
      if (data.error) {
        console.error(chalk.red(`✗ Failed to upload ${relativePath}:`), data.error);
      } else {
        console.log(chalk.green(`✓ Uploaded ${relativePath}`));
      }
    })
    .on('change', async (filePath) => {
      const relativePath = getRelativePath(filePath);
      const res = await fetch(`${DEV_SERVER_URL}/api/blobs/seed?path=${encodeURIComponent(relativePath)}`);
      const data = await res.json();
      if (data.error) {
        console.error(chalk.red(`✗ Failed to upload ${relativePath}:`), data.error);
      } else {
        console.log(chalk.green(`✓ Uploaded ${relativePath}`));
      }
    })
    .on('unlink', async (filePath) => {
      // TODO: Implement delete  with an API route
      // const { error } = await deleteFile(filePath);
      // const relativePath = getRelativePath(filePath);
      // if (error) {
      //   console.error(chalk.red(`✗ Failed to delete ${relativePath}:`), error);
      // } else {
      //   console.log(chalk.green(`✓ Deleted ${relativePath}`));
      // }
    })
    .on('error', (error) => {
      console.error(chalk.red('Watcher error:'), error);
    });

  return watcher;
};

const main = async () => {
  console.log(chalk.magenta('Watching for changes...'));
  console.log(chalk.gray('Content directory:'), chalk.cyan(CONTENT_MDX_DIR));
  console.log(chalk.gray('Blob store:'), chalk.cyan(BLOB_STORE_NAME));

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    console.error(chalk.red('Error: Content directory not found:'), chalk.cyan(CONTENT_MDX_DIR));
    return;
  }

  try {
    const watcher = await initializeWatcher();

    process.on('SIGINT', async () => {
      console.log(chalk.yellow('\nShutting down watcher...'));
      await watcher.close();
      process.exit(0);
    });
  } catch (error) {
    console.error(chalk.red('\nFailed to start watcher:'), error);
    return;
  }
};

main();
