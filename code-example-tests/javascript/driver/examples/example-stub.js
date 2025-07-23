// THIS IS AN EXAMPLE. DO NOT USE ON A PAGE.
// You can copy this to get started on making a new javascript code example.
// See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

import { MongoClient } from 'mongodb';

// Write your code example inside a function that you can call from a corresponding test.
// When you call the function in the test, this executes the code example.
// The function can return output, which the test can validate to confirm that the code works.

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function yourExampleName() {
  try {
    // The text string after the :snippet-start: tag is used in the name of the snippet.
    // It should be a unique identifier within this example file.
    // For this snippet, the filename will be: example-stub.snippet.stub-console-log.js
    // :snippet-start: stub-console-log
    const dbName = client.db('your-db-name');
    const collName = dbName.collection('your-collection-name');

    console.log('Stub example. Do not use in a literal include.');

    // :remove-start:
    console.log(
      'Unnecessary code for tests. You can use the remove syntax to omit it from output.'
    );
    // :remove-end:

    // Be careful of whitespace when using 'remove' There will be 2 newlines above this.

    // :snippet-end:
    // The rest of the file will not be included in the snippet!

    // We can return something to compare expected output to actual output in our test.
    return 'some output to verify in a test';
  } finally {
    // Always close connection to free resources
    await client.close();
  }
}
