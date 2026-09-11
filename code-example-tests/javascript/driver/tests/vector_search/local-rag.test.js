/**
 * Tests for the local RAG examples (local embedding model + local LLM).
 *
 * These tests run against real services — nothing is mocked:
 *
 * - Embeddings come from the real `mixedbread-ai/mxbai-embed-large-v1` model
 *   through `@xenova/transformers`, downloaded from the Hugging Face model hub
 *   on first run and cached locally afterward.
 * - Retrieval runs a real `$vectorSearch` query against the
 *   `sample_airbnb.listingsAndReviews` collection on the deployment in
 *   CONNECTION_STRING. The deployment must have Search and Vector Search
 *   installed (a local Atlas deployment or an Atlas cluster).
 * - Generation runs the real Mistral 7B model locally through `gpt4all`. The
 *   model file is ~4 GB and downloads to the gpt4all cache on first run.
 *
 * Sample data hygiene: these tests add an `embeddings` field to documents in
 * `sample_airbnb.listingsAndReviews` and create a `vector_index` search index
 * on that collection. Both are reverted in teardown. The sample database
 * itself is never dropped.
 *
 * Because the two models together are several gigabytes and download on first
 * run, these tests are opt-in. Set `RUN_LOCAL_MODEL_TESTS=true` to run them.
 * `@xenova/transformers` and `gpt4all` are optional dependencies installed
 * separately (see package-models.json); CI leaves the variable unset, so the
 * suite skips there and never needs them.
 */

import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';
import { checkSampleDataAvailable } from '../../utils/sampleDataChecker.js';

const DATABASE_NAME = 'sample_airbnb';
const COLLECTION_NAME = 'listingsAndReviews';
const INDEX_NAME = 'vector_index';
const EMBEDDING_DIMENSIONS = 1024;

// Model downloads and a 50-document embedding pass are slow; allow generous
// time so a first run that fetches the models does not fail on the timeout.
const MODEL_TIMEOUT_MS = 30 * 60 * 1000;

function runLocalModelTests() {
  return ['1', 'true', 'yes'].includes(
    (process.env.RUN_LOCAL_MODEL_TESTS || '').toLowerCase()
  );
}

const describeOrSkip = runLocalModelTests() ? describe : describe.skip;

describeOrSkip('Vector Search local RAG tutorial', () => {
  let client;
  let collection;
  let sampleDataAvailable = false;
  let createdIndex = false;
  let generateEmbeddings;
  let createVectorIndex;
  let runTestQuery;
  let answerQuestion;

  beforeAll(async () => {
    if (!process.env.CONNECTION_STRING) {
      throw new Error(
        'Could not retrieve CONNECTION_STRING - make sure you have created ' +
          'the .env file at the root of the javascript/driver directory and ' +
          'the variable is correctly named as CONNECTION_STRING.'
      );
    }

    sampleDataAvailable = await checkSampleDataAvailable(DATABASE_NAME, [
      COLLECTION_NAME,
    ]);

    client = new MongoClient(process.env.CONNECTION_STRING);
    await client.connect();
    collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);

    ({ generateEmbeddings } =
      await import('../../examples/vector_search/local_rag/generate-embeddings.js'));
    ({ createVectorIndex } =
      await import('../../examples/vector_search/local_rag/vector-index.js'));
    ({ runTestQuery } =
      await import('../../examples/vector_search/local_rag/test-query.js'));
    ({ answerQuestion } =
      await import('../../examples/vector_search/local_rag/local-llm.js'));
  }, MODEL_TIMEOUT_MS);

  afterAll(async () => {
    if (!client) return;
    await removeEmbeddings();
    if (createdIndex) {
      try {
        await collection.dropSearchIndex(INDEX_NAME);
      } catch {
        // The index may already be gone; teardown should not fail the run.
      }
    }
    await client.close();
  });

  // Revert embeddings between tests so each one starts from the collection's
  // original state rather than inheriting a prior test's writes.
  beforeEach(async () => {
    await removeEmbeddings();
  });

  async function removeEmbeddings() {
    if (!collection) return;
    await collection.updateMany(
      { embeddings: { $exists: true } },
      { $unset: { embeddings: '' } }
    );
  }

  /** Creates the vector index once, using the example under test. */
  async function ensureIndex() {
    const existing = await collection.listSearchIndexes().toArray();
    if (!existing.some((index) => index.name === INDEX_NAME)) {
      await createVectorIndex();
      createdIndex = true;
    }
  }

  async function waitForQueryableIndex(timeoutSeconds = 300) {
    const deadline = Date.now() + timeoutSeconds * 1000;
    while (Date.now() < deadline) {
      const indexes = await collection.listSearchIndexes(INDEX_NAME).toArray();
      if (indexes.length && indexes[0].queryable === true) return;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    throw new Error(
      `Search index ${INDEX_NAME} did not become queryable within ` +
        `${timeoutSeconds} seconds.`
    );
  }

  function skipWithoutSampleData() {
    if (!sampleDataAvailable) {
      console.warn(
        `\n⚠️  Skipping - Missing sample data: ${DATABASE_NAME}.${COLLECTION_NAME}`
      );
      return true;
    }
    return false;
  }

  describe('generate-embeddings.js', () => {
    it(
      'Should report fifty updated documents',
      async () => {
        if (skipWithoutSampleData()) return;

        const result = await generateEmbeddings();

        Expect.that(result).shouldMatch(
          'vector_search/local_rag/local-rag-create-embeddings-output.sh'
        );
      },
      MODEL_TIMEOUT_MS
    );

    it(
      'Should store a 1024-dimension vector on each updated document',
      async () => {
        if (skipWithoutSampleData()) return;

        await generateEmbeddings();

        const document = await collection.findOne(
          { embeddings: { $exists: true } },
          { projection: { embeddings: 1, _id: 0 } }
        );

        Expect.that({ dimensions: document.embeddings.length }).shouldMatch({
          dimensions: EMBEDDING_DIMENSIONS,
        });
      },
      MODEL_TIMEOUT_MS
    );
  });

  describe('vector-index.js', () => {
    it(
      'Should create a queryable vectorSearch index',
      async () => {
        if (skipWithoutSampleData()) return;

        await ensureIndex();
        await waitForQueryableIndex();

        const indexes = await collection
          .listSearchIndexes(INDEX_NAME)
          .toArray();

        Expect.that({
          name: indexes[0].name,
          type: indexes[0].type,
        }).shouldMatch({ name: INDEX_NAME, type: 'vectorSearch' });
      },
      MODEL_TIMEOUT_MS
    );
  });

  describe('retrieve-documents.js', () => {
    it(
      'Should return five listings with summary, listing_url, and descending scores',
      async () => {
        if (skipWithoutSampleData()) return;

        await generateEmbeddings();
        await ensureIndex();
        await waitForQueryableIndex();

        const results = await runTestQuery();

        // Vector search scores and result order vary across environments, so
        // validate the shape of the results rather than exact values.
        Expect.that(results)
          .shouldResemble(
            'vector_search/local_rag/local-rag-query-results-output.sh'
          )
          .withSchema({
            count: 5,
            requiredFields: ['summary', 'listing_url', 'score'],
          });

        // The index uses cosine similarity, so each score must be a number in
        // the normalized (0, 1] range, and $vectorSearch must return the
        // results from most to least relevant.
        const scores = results.map((result) => result.score);

        Expect.that({
          scoresInRange: scores.every(
            (score) => Number.isFinite(score) && score > 0 && score <= 1
          ),
          scoresDescending: scores.every(
            (score, index) => index === 0 || scores[index - 1] >= score
          ),
        }).shouldMatch({ scoresInRange: true, scoresDescending: true });
      },
      MODEL_TIMEOUT_MS
    );
  });

  describe('local-llm.js', () => {
    it(
      'Should return a generated answer from the retrieved listings',
      async () => {
        if (skipWithoutSampleData()) return;

        await generateEmbeddings();
        await ensureIndex();
        await waitForQueryableIndex();

        const answer = await answerQuestion();

        // The LLM response text varies on every run, so assert only that the
        // generation step produced text.
        Expect.that({
          answer,
          isEmpty: answer.trim() === '',
        }).shouldMatch({ answer: '...', isEmpty: false });
      },
      MODEL_TIMEOUT_MS
    );
  });
});
