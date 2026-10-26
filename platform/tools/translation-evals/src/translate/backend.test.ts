import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BackendName } from '@mongodb-docs/translation-service';
import { resolveBackendName, selectBackend } from './backend.js';

// selectBackend builds a real backend from process.env, and both factories
// require the gateway key. Provide one so the test never depends on the
// developer's shell or a loaded .env.
const previousKey = process.env.AI_GATEWAY_API_KEY;
beforeEach(() => {
  process.env.AI_GATEWAY_API_KEY = 'test-key';
});
afterEach(() => {
  if (previousKey === undefined) delete process.env.AI_GATEWAY_API_KEY;
  else process.env.AI_GATEWAY_API_KEY = previousKey;
});

describe('selectBackend', () => {
  it('picks the anthropic backend for claude models', () => {
    expect(selectBackend('claude-sonnet-5-5').name).toBe('anthropic');
  });

  it('picks the openai backend for gpt models', () => {
    expect(selectBackend('gpt-5.5').name).toBe('openai');
  });

  it('falls back to the openai backend for an unknown model', () => {
    expect(selectBackend('something-else').name).toBe('openai');
  });

  it('falls back to the openai backend when no model is configured', () => {
    expect(selectBackend(undefined).name).toBe('openai');
  });
});

const REQUEST = {
  source_locale: 'en',
  target_locale: 'es',
  content_type: 'platform_strings' as const,
  items: [{ key: 'a', text: 'A' }],
  backend_preferences: { provider: 'auto', model: 'auto' },
};

// The transport captures `fetch` when the backend is constructed, so the
// stub must be installed before `selectBackend` builds the backend.
function stubFetch(body: unknown): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), { status: 200 })) as unknown as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

describe('selectBackend forwards the model to the backend', () => {
  it('runs the claude model it was given, not the anthropic default', async () => {
    const restore = stubFetch({
      content: [{ type: 'text', text: '{"translations":[{"key":"a","value":"b"}]}' }],
      stop_reason: 'end_turn',
    });
    try {
      const result = await selectBackend('claude-opus-5-5').translateBatch(REQUEST);
      expect(result.meta.model).toBe('claude-opus-5-5');
    } finally {
      restore();
    }
  });

  it('runs the gpt model it was given, not the openai default', async () => {
    const restore = stubFetch({
      output_text: '{"translations":[{"key":"a","value":"b"}]}',
    });
    try {
      const result = await selectBackend('gpt-6-astra').translateBatch(REQUEST);
      expect(result.meta.model).toBe('gpt-6-astra');
    } finally {
      restore();
    }
  });
});

describe('resolveBackendName', () => {
  it('routes by model family when no backend is given', () => {
    expect(resolveBackendName('claude-sonnet-5-5')).toBe('anthropic');
    expect(resolveBackendName('gpt-5.5')).toBe('openai');
    expect(resolveBackendName(undefined)).toBe('openai');
  });

  it('lets an explicit backend override the model family', () => {
    expect(resolveBackendName('claude-sonnet-5-5', BackendName.OpenAI)).toBe('openai');
    expect(resolveBackendName('gpt-5.5', BackendName.AwsTranslate)).toBe('aws-translate');
  });
});

describe('selectBackend with an explicit backend', () => {
  it('builds the aws-translate backend', () => {
    // The AWS config resolver reads no credentials and no gateway key, so
    // this needs neither; the SDK resolves creds lazily at call time.
    expect(selectBackend(undefined, BackendName.AwsTranslate).name).toBe('aws-translate');
  });

  it('builds the stub backend', () => {
    expect(selectBackend(undefined, BackendName.Stub).name).toBe('stub');
  });

  it('forwards the model on the explicitly chosen openai path', async () => {
    const restore = stubFetch({ output_text: '{"translations":[{"key":"a","value":"b"}]}' });
    try {
      const result = await selectBackend('gpt-6-astra', BackendName.OpenAI).translateBatch(REQUEST);
      expect(result.meta.model).toBe('gpt-6-astra');
    } finally {
      restore();
    }
  });
});
