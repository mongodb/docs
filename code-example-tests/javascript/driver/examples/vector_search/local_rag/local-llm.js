// :replace-start: {
//   "terms": {
//     "MODEL_OPTIONS": "{\n                verbose: true,\n                allowDownload: false,\n                modelConfigFile: \"./models3.json\"\n            }"
//   }
// }
import { getQueryResults } from './retrieve-documents.js';

// The docs snippet loads the model from a file the reader downloads into their
// project directory, alongside a models3.json config. The tests let gpt4all
// download the model into its own cache on first run instead.
const MODEL_OPTIONS = { verbose: true, allowDownload: true };

export async function answerQuestion() {
  let answer = '';

  // :snippet-start: local-rag-answer-question
  // :uncomment-start:
  // import { loadModel, createCompletionStream } from "gpt4all";
  // import { getQueryResults } from './retrieve-documents.js';
  // :uncomment-end:

  try {
    // :remove-start:
    // Imported here rather than at module scope so the test file can load this
    // module without gpt4all installed. It is an optional dependency; see the
    // local model tests note in CLAUDE.md.
    const { loadModel, createCompletionStream } = await import('gpt4all');
    // :remove-end:
    const query = 'beach house';

    const documents = await getQueryResults(query);

    let textDocuments = '';
    documents.forEach((doc) => {
      const summary = doc.summary;
      const link = doc.listing_url;
      const string = `Summary: ${summary} Link: ${link}. \n`;
      textDocuments += string;
    });

    const model = await loadModel(
      'mistral-7b-openorca.gguf2.Q4_0.gguf',
      MODEL_OPTIONS
    );

    const question =
      'Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.';

    const prompt = `Use the following pieces of context to answer the question at the end.
            {${textDocuments}}
            Question: {${question}}`;

    process.stdout.write('Output: ');
    const stream = createCompletionStream(model, prompt);
    stream.tokens.on('data', (data) => {
      process.stdout.write(data);
      answer += data; // :remove:
    });
    //wait till stream finishes.
    await stream.result;
    process.stdout.write('\n');
    model.dispose();
    console.log('\n Source documents: \n');
    console.log(textDocuments);
  } catch (err) {
    console.log(err.stack);
  }
  // :snippet-end:

  return answer;
}
// :replace-end:
