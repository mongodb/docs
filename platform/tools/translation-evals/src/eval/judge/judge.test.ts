import { describe, it, expect } from 'vitest';
import {
  ANTHROPIC_DEFAULTS,
  type Transport,
  type TransportRequest,
} from '@mongodb-docs/translation-service';
import { loadConfig } from '../../config.js';
import { createJudgeOptions } from './backend.js';
import {
  buildJudgeRequest,
  judgeFormatFor,
  judgeTranslation,
  type JudgeOptions,
} from './judge.js';
import {
  JUDGE_RESPONSE_SCHEMA,
  buildJudgePrompt,
  type JudgeInput,
} from './prompt.js';

const INPUT: JudgeInput = {
  source: 'Add a user.',
  output: 'Añade un usuario.',
  reference: 'Añadir un usuario.',
  locale: 'es',
};

function envelope(payload: unknown): string {
  return JSON.stringify({ output_text: JSON.stringify(payload) });
}

function messagesEnvelope(payload: unknown): string {
  return JSON.stringify({
    stop_reason: 'end_turn',
    content: [{ type: 'text', text: JSON.stringify(payload) }],
  });
}

function optsReturning(raw: string, model = 'judge-model'): JudgeOptions {
  return { transport: async () => raw, model };
}

describe('buildJudgePrompt', () => {
  it('names the locale, carries the source, and anchors on the source', () => {
    const prompt = buildJudgePrompt(INPUT);
    expect(prompt).toContain('es');
    expect(prompt).toContain('Add a user.');
    expect(prompt.toLowerCase()).toContain('source');
  });
});

describe('judgeFormatFor', () => {
  it('routes claude-* models to the Messages format', () => {
    expect(judgeFormatFor('claude-sonnet-5-5')).toBe('messages');
  });

  it('routes everything else to the Responses format', () => {
    expect(judgeFormatFor('gpt-5.5')).toBe('responses');
  });
});

describe('judgeTranslation', () => {
  it('scores a faithful translation 1/1', async () => {
    const r = await judgeTranslation(INPUT, optsReturning(envelope({ category: 'C', rationale: 'faithful', fluency: 5 })));
    expect(r.factuality).toBe(1);
    expect(r.fluency).toBe(1);
    expect(r.rationale).toBe('faithful');
  });

  it('maps each factuality category', async () => {
    const score = async (category: string) =>
      (await judgeTranslation(INPUT, optsReturning(envelope({ category, rationale: '', fluency: 3 }))))
        .factuality;
    expect(await score('A')).toBe(0.4);
    expect(await score('B')).toBe(0.6);
    expect(await score('C')).toBe(1);
    expect(await score('D')).toBe(0);
    expect(await score('unexpected')).toBe(0);
  });

  it('maps the 1-5 fluency rating onto 0-1 and clamps out-of-range values', async () => {
    const fluency = async (value: number) =>
      (await judgeTranslation(INPUT, optsReturning(envelope({ category: 'C', rationale: '', fluency: value }))))
        .fluency;
    expect(await fluency(1)).toBe(0);
    expect(await fluency(3)).toBe(0.5);
    expect(await fluency(5)).toBe(1);
    expect(await fluency(99)).toBe(1);
    expect(await fluency(-4)).toBe(0);
  });

  it('falls back to the output[] message part when output_text is absent', async () => {
    const raw = JSON.stringify({
      output: [
        { type: 'reasoning', content: [] },
        {
          type: 'message',
          content: [{ type: 'output_text', text: JSON.stringify({ category: 'C', rationale: 'ok', fluency: 4 }) }],
        },
      ],
    });
    const r = await judgeTranslation(INPUT, optsReturning(raw));
    expect(r.fluency).toBe(0.75);
  });

  it('rejects a body that is not JSON', async () => {
    await expect(judgeTranslation(INPUT, optsReturning('<html>503</html>'))).rejects.toThrow(
      /not valid JSON/,
    );
  });

  it('rejects an envelope with no output text', async () => {
    await expect(judgeTranslation(INPUT, optsReturning('{}'))).rejects.toThrow(/no output text/);
  });

  it('parses a Messages reply from a claude-* judge model', async () => {
    const raw = messagesEnvelope({ category: 'B', rationale: 'extra words', fluency: 3 });
    const r = await judgeTranslation(INPUT, optsReturning(raw, 'claude-sonnet-5-5'));
    expect(r.factuality).toBe(0.6);
    expect(r.fluency).toBe(0.5);
    expect(r.rationale).toBe('extra words');
  });

  it('concatenates multiple Messages text blocks', async () => {
    const payload = JSON.stringify({ category: 'C', rationale: 'ok', fluency: 4 });
    const raw = JSON.stringify({
      stop_reason: 'end_turn',
      content: [
        { type: 'thinking', thinking: 'considering...' },
        { type: 'text', text: payload.slice(0, 10) },
        { type: 'text', text: payload.slice(10) },
      ],
    });
    const r = await judgeTranslation(INPUT, optsReturning(raw, 'claude-sonnet-5-5'));
    expect(r.fluency).toBe(0.75);
  });
});

describe('buildJudgeRequest', () => {
  it('sends the judge model, a system and user message, and a strict schema', () => {
    const body = JSON.parse(buildJudgeRequest(INPUT, { model: 'judge-model' })) as {
      model: string;
      input: Array<{ role: string; content: Array<{ text: string }> }>;
      text: { format: { strict: boolean } };
    };
    expect(body.model).toBe('judge-model');
    expect(body.input.map((m) => m.role)).toEqual(['system', 'user']);
    expect(body.input[1]!.content[0]!.text).toContain('SOURCE:');
    expect(body.text.format.strict).toBe(true);
  });

  it('sends the Messages shape for a claude-* judge model', () => {
    const body = JSON.parse(
      buildJudgeRequest(INPUT, { model: 'claude-sonnet-5-5', maxTokens: 4096 }),
    ) as {
      model: string;
      max_tokens: number;
      system: string;
      messages: Array<{ role: string; content: string }>;
      output_config: { format: { type: string; name?: string; schema: unknown } };
      input?: unknown;
      text?: unknown;
    };

    expect(body.model).toBe('claude-sonnet-5-5');
    expect(body.max_tokens).toBe(4096);
    expect(body.system).toContain('bilingual translation evaluator');
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0]!.role).toBe('user');
    expect(body.messages[0]!.content).toContain('SOURCE:');
    expect(body.output_config.format.type).toBe('json_schema');
    expect(body.output_config.format).not.toHaveProperty('name');
    expect(body.output_config.format.schema).toEqual(JUDGE_RESPONSE_SCHEMA);
    // The Responses-only envelope members must not leak into the Messages body.
    expect(body.input).toBeUndefined();
    expect(body.text).toBeUndefined();
  });

  it('defaults max_tokens for the Messages shape when unset', () => {
    const body = JSON.parse(buildJudgeRequest(INPUT, { model: 'claude-sonnet-5-5' })) as {
      max_tokens: number;
    };
    expect(body.max_tokens).toBe(ANTHROPIC_DEFAULTS.maxTokens);
  });
});

describe('createJudgeOptions', () => {
  const env = {
    AI_GATEWAY_API_KEY: 'k',
    JUDGE_MODEL: 'judge-model',
    OPENAI_ENDPOINT: 'https://grove.test/v1/responses',
  };

  it('requires JUDGE_MODEL so the judge never reuses the translator model', () => {
    expect(() => createJudgeOptions(loadConfig({ AI_GATEWAY_API_KEY: 'k' }))).toThrow(/JUDGE_MODEL/);
  });

  it('posts the judge request to the OpenAI endpoint with the api-key header', async () => {
    let seen: TransportRequest | undefined;
    const fake: Transport = async (request) => {
      seen = request;
      return { ok: true, status: 200, text: async () => envelope({ category: 'C', rationale: '', fluency: 5 }) };
    };

    const opts = createJudgeOptions(loadConfig(env), env, fake);
    expect(opts.model).toBe('judge-model');

    const raw = await opts.transport('{"probe":true}');
    expect(seen!.url).toBe('https://grove.test/v1/responses');
    expect(seen!.headers['api-key']).toBe('k');
    expect(seen!.body).toBe('{"probe":true}');
    expect(JSON.parse(raw).output_text).toContain('"category":"C"');
  });

  it('throws when the gateway responds with a non-ok status', async () => {
    const fake: Transport = async () => ({ ok: false, status: 429, text: async () => '' });
    const opts = createJudgeOptions(loadConfig(env), env, fake);
    await expect(opts.transport('{}')).rejects.toThrow(/HTTP 429/);
  });

  it('posts a claude-* judge request to the Anthropic endpoint with the x-api-key header', async () => {
    let seen: TransportRequest | undefined;
    const fake: Transport = async (request) => {
      seen = request;
      return { ok: true, status: 200, text: async () => messagesEnvelope({ category: 'C', rationale: '', fluency: 5 }) };
    };

    const claudeEnv = {
      AI_GATEWAY_API_KEY: 'k',
      JUDGE_MODEL: 'claude-sonnet-5-5',
      ANTHROPIC_ENDPOINT: 'https://grove.test/anthropic/v1/messages',
    };

    const opts = createJudgeOptions(loadConfig(claudeEnv), claudeEnv, fake);
    expect(opts.model).toBe('claude-sonnet-5-5');
    expect(opts.maxTokens).toBe(ANTHROPIC_DEFAULTS.maxTokens);

    await opts.transport('{"probe":true}');
    expect(seen!.url).toBe('https://grove.test/anthropic/v1/messages');
    expect(seen!.headers['x-api-key']).toBe('k');
    expect(seen!.headers['anthropic-version']).toBe('2023-06-01');
    expect(seen!.headers['api-key']).toBeUndefined();
  });

  it('labels a claude-* judge HTTP failure as Anthropic', async () => {
    const fake: Transport = async () => ({ ok: false, status: 500, text: async () => '' });
    const claudeEnv = { AI_GATEWAY_API_KEY: 'k', JUDGE_MODEL: 'claude-sonnet-5-5' };
    const opts = createJudgeOptions(loadConfig(claudeEnv), claudeEnv, fake);
    await expect(opts.transport('{}')).rejects.toThrow(/Anthropic returned HTTP 500/);
  });
});
