const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { Decimal128, ObjectId } = require('mongodb'); // Import MongoDB data types

function outputMatchesExampleOutput(filepath, output) {
  // Read the content of the expected output
  const filepathString = '../examples/' + filepath;
  const outputFilePath = path.resolve(__dirname, filepathString);
  const rawExpectedOutput = fs.readFileSync(outputFilePath, 'utf8');

  const preprocessFileContents = (contents) => {
    // Detect multiple objects and wrap them into an array
    const wrappedContents = contents
      .trim()
      .replace(/}\n{/g, '},\n{') // Add commas between objects if they are concatenated
      .replace(/'(.*?)'/g, '"$1"') // Convert single-quoted values to double quotes
      .replace(/^\{/g, '[{') // Wrap first object in an array if no array starts
      .replace(/}$/g, '}]'); // Wrap last object in an array if no array ends

    // Ensure keys are quoted properly
    const processed = wrappedContents.replace(
      /(\b[a-zA-Z_]\w*)\s*:/g, // Match alphanumeric keys (letters, optional underscores) followed by a colon
      '"$1":' // Wrap the key in double quotes without touching the colon
    );

    // Quote any unquoted ISO-like date values
    const finalProcessed = processed.replace(
      /:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z?)/g, // Match ISO-like datetime strings
      (match, dateValue) => `: "${dateValue.trim()}"` // Wrap the value in double quotes
    );

    return finalProcessed; // Return final sanitized string
  };

  const processedExpectedOutput = preprocessFileContents(rawExpectedOutput);

  const context = {
    Decimal128: (value) => new Decimal128(value),
    ObjectId: (value) => new ObjectId(value),
    Date: (value) => new Date(value),
  };

  let expectedOutputArray;
  try {
    expectedOutputArray = vm.runInNewContext(processedExpectedOutput, context); // Safely parse expected output
  } catch (error) {
    console.error('Failed to parse expected output:', error);
    return false;
  }

  // Directly use the `output` as it is already expected to be a valid array of objects
  const actualOutputArray = output;

  // Helper function to normalize MongoDB data types for comparison
  const normalizeItem = (item) => {
    const normalized = {};
    for (const key in item) {
      if (item[key] instanceof Decimal128 || item[key] instanceof ObjectId) {
        normalized[key] = item[key].toString(); // Convert Decimal128 and ObjectId to strings
      } else if (item[key] instanceof Date) {
        normalized[key] = item[key].toISOString(); // Convert dates to ISO8601 strings for consistent comparison
      } else {
        normalized[key] = item[key]; // Keep other values as-is
      }
    }
    return normalized;
  };

  if (actualOutputArray !== undefined && expectedOutputArray !== undefined) {
    // Check that both arrays contain the same elements, regardless of order
    const isEqual =
      actualOutputArray.length === expectedOutputArray.length &&
      expectedOutputArray.every((expectedItem) =>
        actualOutputArray.some(
          (actualItem) =>
            JSON.stringify(normalizeItem(actualItem)) ===
            JSON.stringify(normalizeItem(expectedItem))
        )
      );
    if (!isEqual) {
      console.log('Mismatch between actual output and expected output:', {
        actualOutputArray,
        expectedOutputArray,
      });
    }

    return isEqual;
  } else {
    console.log('One or both arrays is undefined.');
    return false;
  }
}

module.exports = outputMatchesExampleOutput;
