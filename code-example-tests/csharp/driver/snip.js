import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { promisify } from 'util';
import { exec as childExec } from 'child_process';

const exec = promisify(childExec);

// ------ CONFIGURATION: Set these values for your language/project ----------
// Add specific files or folders to IGNORE_PATTERNS to keep them from being processed by this script
const IGNORE_PATTERNS = new Set([
  'bin',
  'Examples.csproj',
  'ExampleStub.cs',
  'Program.cs',
  'obj'
]);

// Add file extensions to COPY and SNIP to designate what types should be copied or snipped
const COPY_PATTERNS = new Set(['.json', '.txt']);
const SNIP_PATTERNS = new Set(['.cs', '.sh']);

// Change to match the language and product specific path
const LANGUAGE_PATH = 'csharp/driver';
// ------ END CONFIGURATION --------------------------------------------------

// Get the filename and directory path of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Finds the root directory by taking the current dir and walking back to root
const ROOT_DIR = __dirname.replace('code-example-tests/' + LANGUAGE_PATH, '');
// Output files will be written to this full output path
const OUTPUT_PATH =
  ROOT_DIR + 'content/code-examples/tested/' + LANGUAGE_PATH + '/';

function getAllFiles(dirPath, arrayOfFiles = []) {
  // Reads the files in the given directory
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    // Gets the full path of the item
    const absolutePath = path.join(dirPath, file);
    if (!IGNORE_PATTERNS.has(file)) {
      if (fs.statSync(absolutePath).isDirectory()) {
        // If it's a directory, recursively call the function
        arrayOfFiles = getAllFiles(absolutePath, arrayOfFiles);
      } else {
        // If it's a file, add its path to the array
        arrayOfFiles.push(absolutePath);
      }
    }
  });
  return arrayOfFiles;
}

// Finds the last / in a filepath and returns the remaining string.
function getFileName(filepath) {
  const lastSlashIndex = filepath.lastIndexOf('/');
  if (lastSlashIndex === -1 || lastSlashIndex === filepath.length - 1) {
    throw new Error(
      'File path has no /, perhaps a root directory was given by mistake?'
    );
  }
  return filepath.substring(lastSlashIndex);
}

// Compress the verbose Bluehawk output into a concise report
async function addNumFilesProcessedAndWritten(stdoutLines) {
  // Iterate through stdout until finding the line that starts with "Processed X files:"
  let i = 0;
  while (
    i < stdoutLines.length - 1 &&
    !stdoutLines[i].startsWith('Processed')
  ) {
    i++;
  }

  // Matches one or more digits
  const regex = /\d+/;
  // Goes to the processed X files line and gets the digit
  let numProcessed = stdoutLines[i].match(regex)[0];
  // Goes to the Wrote X files line and gets the digit
  let numWritten = stdoutLines[i + 4].match(regex)[0];
  // Adds to total
  numFilesProcessedAndWritten[0] += parseInt(numProcessed);
  numFilesProcessedAndWritten[1] += parseInt(numWritten);
}

// Check if the text of the file contains any Bluehawk `snippet-start` tags
async function checkIfContainsSnipMarkup(filePath) {
  const outputFilePath = path.resolve(__dirname, filePath);
  const fileContents = fs.readFileSync(outputFilePath, 'utf8');
  return fileContents.includes('snippet-start');
}

// Snips or copies a file based on its type to the given output path
async function snip(filePath) {
  let fileExt = path.extname(filePath);

  if (!fileExt) {
    throw new Error(
      'File has no extension type. Please check file path: ' + filePath
    );
  }

  let fileName = getFileName(filePath);
  let relPath = filePath.substring(startDirectory.length - 1);
  let outputDir = (OUTPUT_PATH + relPath).replace(fileName, '');
  let command = '';
  const snipCommand = 'bluehawk snip --output ' + outputDir + ' ' + filePath;
  const copyCommand = 'bluehawk copy --output ' + outputDir + ' ' + filePath;

  // Ensure the output directory exists
  try {
    await fs.promises.mkdir(outputDir, { recursive: true }); // Create the directory if it doesn't exist
  } catch (error) {
    console.error(`Failed to create directory: ${outputDir}`, error);
    return;
  }

  // If the file is a copy-only file type - i.e. JSON can't contain comments for Bluehawk snip markup - just copy it
  if (COPY_PATTERNS.has(fileExt)) {
    command = copyCommand;

    // If the file could contain Bluehawk snip markup, do additional processing to decide whether to snip or copy
  } else if (SNIP_PATTERNS.has(fileExt)) {
    // If the file contains any Bluehawk `snippet-start` tags, snip it. Otherwise, copy it.
    const containsSnipMarkup = await checkIfContainsSnipMarkup(filePath);
    if (containsSnipMarkup) {
      command = snipCommand;
    } else {
      command = copyCommand;
    }
  } else {
    throw new Error('Unrecognized file type found: ' + relPath);
  }

  if (command.startsWith('bluehawk')) {
    try {
      const { stdout, stderr } = await exec(command);

      const lines = stdout.split('\n');
      await addNumFilesProcessedAndWritten(lines);

      if (
        stderr !== '' &&
        !stderr.startsWith(
          'Error: Unable to use "first char" lexer optimizations:'
        )
      ) {
        // Saves the parsed file path, written to path, and error message
        errorLog.push([lines[0], lines[1], stderr]);
      }
    } catch (error) {
      console.error(`exec error: ${error}`);
    }
  }
}

const errorLog = [];
let numFilesProcessedAndWritten = [0, 0];
const startDirectory = './examples';

async function processFiles() {
  const files = getAllFiles(startDirectory);

  for (const file of files) {
    await snip(file);
  }

  if (errorLog.length > 0) {
    errorLog.forEach((error) => {
      let parsedPath = error[0];
      let writtenPath = error[1];
      let err = error[2];
      console.error(`Bluehawk ${err}\nAt ${parsedPath}\n${writtenPath}`);
    });
  }

  console.log(`Processed ${numFilesProcessedAndWritten[0]} file(s)`);
  console.log(
    `Wrote ${numFilesProcessedAndWritten[1]} file(s) to ${OUTPUT_PATH}`
  );
}

processFiles().catch(console.dir);
