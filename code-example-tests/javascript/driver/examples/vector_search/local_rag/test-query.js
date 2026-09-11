import { getQueryResults } from './retrieve-documents.js';

export async function runTestQuery() {
  let queryDocuments = []; // :remove:

  // :snippet-start: local-rag-test-query
  // :uncomment-start:
  // import { getQueryResults } from './retrieve-documents.js';
  // :uncomment-end:

  try {
    const query = 'beach house';

    const documents = await getQueryResults(query);
    queryDocuments = documents; // :remove:
    documents.forEach((doc) => {
      console.log(doc);
    });
  } catch (err) {
    console.log(err.stack);
  }
  // :snippet-end:

  return queryDocuments;
}
