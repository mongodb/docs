/**
 * Integration tests for the AI agent tutorial examples.
 *
 * These tests exercise the real third-party integrations end to end:
 *
 * - Voyage AI embeddings via the `voyageai` SDK (direct vendor API).
 * - OpenAI chat completions (`gpt-4o`) via the Grove AI gateway, configured
 *   in config.js through `OPENAI_BASE_URL` and an `api-key` header.
 * - LangChain PDF loading and splitting of the real MongoDB investor PDF.
 * - Real `$vectorSearch` queries against an Atlas Vector Search index.
 *
 * The suite requires `CONNECTION_STRING`, `OPENAI_API_KEY`, `OPENAI_BASE_URL`,
 * and `VOYAGE_API_KEY` in the .env file at the driver directory root, plus an
 * Atlas cluster with Vector Search enabled. When any of these are missing, the
 * entire suite skips instead of failing so it can run in environments without
 * secrets.
 *
 * Because live LLM output is non-deterministic, assertions verify behavior and
 * structure (embedding dimensions, non-empty search hits, valid tool
 * selection, deterministic calculator results, chat history ordering) rather
 * than exact model wording.
 */

const REQUIRED_ENV_VARS = [
  'CONNECTION_STRING',
  'OPENAI_API_KEY',
  'OPENAI_BASE_URL',
  'VOYAGE_API_KEY',
];
const MISSING_ENV_VARS = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

// Live ingestion (real PDF download, Voyage AI embeddings, and building an
// Atlas Vector Search index) can take well over a minute, so the setup and the
// tests that call the LLM need generous timeouts beyond the jest default.
const SETUP_TIMEOUT = 5 * 60 * 1000;
const TEST_TIMEOUT = 60 * 1000;

const EMBEDDING_DIMENSIONS = 1024;

// config.js initializes the Voyage AI and OpenAI clients and the MongoClient at
// import time, so importing without valid credentials would fail before any
// test could skip. Load the example modules lazily inside beforeAll, and skip
// the whole suite when the required configuration is absent.
const describeOrSkip = MISSING_ENV_VARS.length ? describe.skip : describe;

describeOrSkip('Vector Search AI agent tutorial', () => {
  let config;
  let getEmbedding;
  let ingestData;
  let createVectorIndex;
  let tools;
  let memory;
  let planning;
  let indexModule;

  beforeAll(async () => {
    config = await import('../../examples/vector_search/ai_agent/config.js');
    const ingest =
      await import('../../examples/vector_search/ai_agent/ingest-data.js');
    getEmbedding = ingest.getEmbedding;
    ingestData = ingest.ingestData;
    createVectorIndex = ingest.createVectorIndex;
    tools = await import('../../examples/vector_search/ai_agent/tools.js');
    memory = await import('../../examples/vector_search/ai_agent/memory.js');
    planning =
      await import('../../examples/vector_search/ai_agent/planning.js');
    indexModule =
      await import('../../examples/vector_search/ai_agent/index.js');

    await config.mongoClient.connect();
    // Start from a clean database, then ingest the real PDF and build the Atlas
    // Vector Search index once for the whole suite. This performs real Voyage
    // AI embedding calls and creates a live search index, so it can take a
    // minute or more to complete.
    await config.mongoClient.db('ai_agent_db').dropDatabase();
    await ingestData();
    await createVectorIndex();
  }, SETUP_TIMEOUT);

  beforeEach(async () => {
    // Preserve the ingested embeddings and vector index built in beforeAll;
    // only reset chat history so memory-related tests start from a known state.
    await config.memoryCollection.deleteMany({});
  });

  afterAll(async () => {
    if (config) {
      await config.mongoClient.db('ai_agent_db').dropDatabase();
      await config.mongoClient.close();
    }
  });

  describe('ingest-data.js', () => {
    it(
      'getEmbedding returns a 1024-dimension embedding vector from Voyage AI',
      async () => {
        const embedding = await getEmbedding(
          'MongoDB acquired Voyage AI.',
          'document'
        );

        expect(Array.isArray(embedding)).toBe(true);
        expect(embedding).toHaveLength(EMBEDDING_DIMENSIONS);
        expect(embedding.every((value) => typeof value === 'number')).toBe(
          true
        );
      },
      TEST_TIMEOUT
    );

    it('ingestData populates ai_agent_db.embeddings with embedded PDF chunks', async () => {
      const docs = await config.vectorCollection.find({}).toArray();

      expect(docs.length).toBeGreaterThan(0);
      const first = docs[0];
      expect(first).toHaveProperty('document');
      expect(first).toHaveProperty('embedding');
      expect(first.embedding).toHaveLength(EMBEDDING_DIMENSIONS);
    });
  });

  describe('tools.js', () => {
    it(
      'vectorSearchTool returns matching documents from a live $vectorSearch query',
      async () => {
        const results = await tools.vectorSearchTool(
          "What was MongoDB's latest acquisition?"
        );

        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].document).toHaveProperty('pageContent');
      },
      TEST_TIMEOUT
    );

    it('calculatorTool returns the result of a valid expression as a string', () => {
      expect(tools.calculatorTool('123+456')).toBe('579');
    });

    it('calculatorTool returns an error string for an invalid expression', () => {
      expect(tools.calculatorTool('1 +* 2').startsWith('Error:')).toBe(true);
    });
  });

  describe('memory.js', () => {
    it('stores messages and retrieves them in chronological order', async () => {
      await memory.storeChatMessage(
        'session-1',
        'user',
        "What was MongoDB's latest acquisition?"
      );
      await memory.storeChatMessage(
        'session-1',
        'system',
        'MongoDB acquired Voyage AI.'
      );

      const history = await memory.retrieveSessionHistory('session-1');

      expect(history).toStrictEqual([
        { role: 'user', content: "What was MongoDB's latest acquisition?" },
        { role: 'system', content: 'MongoDB acquired Voyage AI.' },
      ]);
    });

    it('retrieveSessionHistory only returns messages for the requested session', async () => {
      await memory.storeChatMessage('session-a', 'user', 'hello from a');
      await memory.storeChatMessage('session-b', 'user', 'hello from b');

      const history = await memory.retrieveSessionHistory('session-a');

      expect(history).toHaveLength(1);
      expect(history[0].content).toBe('hello from a');
    });
  });

  describe('planning.js', () => {
    it(
      'toolSelector returns a valid tool option for a math question via a live LLM call',
      async () => {
        const { tool, input } = await planning.toolSelector('What is 123+456?');

        // Live LLM tool selection is non-deterministic, so assert only that the
        // returned tool is one of the valid options rather than a specific tool.
        expect(['vector_search_tool', 'calculator_tool', 'none']).toContain(
          tool
        );
        expect(typeof input).toBe('string');
      },
      TEST_TIMEOUT
    );

    it(
      'generateResponse answers a math question and stores the exchange in memory',
      async () => {
        const result = await planning.generateResponse(
          'calc-session',
          'What is 123+456?'
        );

        expect(result).toContain('579');
        const history = await memory.retrieveSessionHistory('calc-session');
        expect(history).toHaveLength(2);
        expect(history[0].role).toBe('user');
        expect(history[1].role).toBe('system');
      },
      TEST_TIMEOUT
    );

    it(
      'generateResponse returns a non-empty answer for a knowledge-base question',
      async () => {
        const result = await planning.generateResponse(
          'search-session',
          "What was MongoDB's latest acquisition?"
        );

        expect(typeof result).toBe('string');
        expect(result.trim().length).toBeGreaterThan(0);
      },
      TEST_TIMEOUT
    );
  });

  describe('index.js', () => {
    it('exposes the agent entry point without running the REPL', () => {
      expect(typeof indexModule.main).toBe('function');
    });
  });
});
