/**
 * Unit tests for the AI agent tutorial examples.
 *
 * These tests run without any third-party API keys. The `voyageai`, `openai`,
 * and `@langchain/community` modules are replaced with jest mocks before the
 * example modules load (config.js constructs the Voyage AI and OpenAI clients
 * at import time), so the calculator, memory, and vector search pipeline logic
 * run against a live MongoDB deployment in CI. `Collection.aggregate` is
 * stubbed for the vector search test because `$vectorSearch` requires an Atlas
 * Vector Search index that isn't available in a plain deployment.
 *
 * Only `CONNECTION_STRING` is required; the suite skips when it is absent so it
 * can run in environments without a MongoDB deployment. The live Voyage AI,
 * OpenAI, and `$vectorSearch` paths are covered by ai-agent.integration.test.js.
 */

import { jest } from '@jest/globals';

const EMBEDDING_DIMENSIONS = 1024;

// Deterministic 1024-dim embedding returned by the mocked Voyage AI client.
const mockEmbed = jest.fn(async () => ({
  data: [{ embedding: Array(EMBEDDING_DIMENSIONS).fill(0.1) }],
}));

// Voyage AI SDK: ingest-data.js calls `new VoyageAIClient({ apiKey }).embed()`.
jest.mock('voyageai', () => ({
  VoyageAIClient: jest.fn(() => ({ embed: mockEmbed })),
}));

// OpenAI SDK: config.js constructs `new OpenAI(...)` at import time. The unit
// suite never exercises the live LLM paths, so a no-op client is sufficient.
jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    chat: { completions: { create: jest.fn() } },
  })),
}));

// LangChain PDF loader: only the integration ingestData path uses it, but
// ingest-data.js imports it at module load, so provide a stub.
jest.mock('@langchain/community/document_loaders/fs/pdf', () => ({
  PDFLoader: jest.fn(() => ({ load: jest.fn(async () => []) })),
}));

const REQUIRED_ENV_VARS = ['CONNECTION_STRING'];
const MISSING_ENV_VARS = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
const describeOrSkip = MISSING_ENV_VARS.length ? describe.skip : describe;

describeOrSkip('Vector Search AI agent tutorial (unit)', () => {
  let config;
  let ingest;
  let tools;
  let memory;
  let indexModule;

  beforeAll(async () => {
    // Set a test API key so getEmbedding() passes its guard before the mock runs
    process.env.VOYAGE_API_KEY = 'test-key';

    config = await import('../../examples/vector_search/ai_agent/config.js');
    ingest =
      await import('../../examples/vector_search/ai_agent/ingest-data.js');
    tools = await import('../../examples/vector_search/ai_agent/tools.js');
    memory = await import('../../examples/vector_search/ai_agent/memory.js');
    indexModule =
      await import('../../examples/vector_search/ai_agent/index.js');

    await config.mongoClient.connect();
  });

  beforeEach(async () => {
    mockEmbed.mockClear();
    await config.mongoClient.db('ai_agent_db').dropDatabase();
  });

  afterAll(async () => {
    if (config) {
      await config.mongoClient.db('ai_agent_db').dropDatabase();
      await config.mongoClient.close();
    }
  });

  describe('ingest-data.js', () => {
    it('getEmbedding forwards the input_type to Voyage AI', async () => {
      const embedding = await ingest.getEmbedding('search query', 'query');

      expect(embedding).toHaveLength(EMBEDDING_DIMENSIONS);
      expect(mockEmbed).toHaveBeenCalledTimes(1);
      expect(mockEmbed).toHaveBeenCalledWith(
        expect.objectContaining({
          input: ['search query'],
          input_type: 'query',
        })
      );
    });
  });

  describe('tools.js', () => {
    it('calculatorTool returns the result of a valid expression as a string', () => {
      expect(tools.calculatorTool('123+456')).toBe('579');
    });

    it('calculatorTool returns an error string for an invalid expression', () => {
      expect(tools.calculatorTool('1 +* 2').startsWith('Error:')).toBe(true);
    });

    it('vectorSearchTool builds a $vectorSearch pipeline and returns a list', async () => {
      const aggregateSpy = jest
        .spyOn(config.vectorCollection, 'aggregate')
        .mockReturnValue({
          toArray: async () => [{ document: { pageContent: 'MongoDB text.' } }],
        });

      const results = await tools.vectorSearchTool(
        "What was MongoDB's latest acquisition?"
      );

      expect(Array.isArray(results)).toBe(true);
      expect(results[0].document).toHaveProperty('pageContent');
      const pipeline = aggregateSpy.mock.calls[0][0];
      expect(pipeline[0].$vectorSearch.index).toBe('vector_index');
      expect(pipeline[0].$vectorSearch.path).toBe('embedding');
      aggregateSpy.mockRestore();
    });
  });

  describe('memory.js', () => {
    it('stores messages and retrieves them in chronological order', async () => {
      await memory.storeChatMessage('session-1', 'user', 'first');
      await memory.storeChatMessage('session-1', 'system', 'second');

      const history = await memory.retrieveSessionHistory('session-1');

      expect(history).toStrictEqual([
        { role: 'user', content: 'first' },
        { role: 'system', content: 'second' },
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

  describe('index.js', () => {
    it('exposes the agent entry point without running the REPL', () => {
      expect(typeof indexModule.main).toBe('function');
    });
  });
});
