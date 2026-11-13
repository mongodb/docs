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
  scoreFactuality,
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
  it('returns no issues and full fluency for a faithful translation', async () => {
    const r = await judgeTranslation(INPUT, optsReturning(envelope({ issues: [], rationale: 'faithful', fluency: 5 })));
    expect(r.issues).toEqual([]);
    expect(r.fluency).toBe(1);
    expect(r.rationale).toBe('faithful');
  });

  it('parses each issue with its type, severity, quote and explanation', async () => {
    const issue = { type: 'distortion', severity: 'minor', quote: 'único', explanation: 'plural lost' };
    const r = await judgeTranslation(
      INPUT,
      optsReturning(envelope({ issues: [issue], rationale: '', fluency: 3 })),
    );
    expect(r.issues).toEqual([issue]);
  });

  it('rejects a response with no issues array instead of scoring it perfect', async () => {
    await expect(
      judgeTranslation(INPUT, optsReturning(envelope({ rationale: '', fluency: 3 }))),
    ).rejects.toThrow(/no issues array/);
    await expect(
      judgeTranslation(INPUT, optsReturning(envelope({ issues: 'none', rationale: '', fluency: 3 }))),
    ).rejects.toThrow(/no issues array/);
  });

  it('rejects an issue with an unknown type or severity', async () => {
    const bad = (issue: object) =>
      judgeTranslation(INPUT, optsReturning(envelope({ issues: [issue], rationale: '', fluency: 3 })));
    await expect(bad({ type: 'mistranslation', severity: 'minor', quote: '', explanation: '' })).rejects.toThrow(
      /unknown type/,
    );
    await expect(bad({ type: 'omission', severity: 'major', quote: '', explanation: '' })).rejects.toThrow(
      /unknown severity/,
    );
  });

  it('reads issue type and severity case-insensitively', async () => {
    const r = await judgeTranslation(
      INPUT,
      optsReturning(
        envelope({
          issues: [{ type: ' Contradiction ', severity: 'CRITICAL', quote: 'q', explanation: 'e' }],
          rationale: '',
          fluency: 3,
        }),
      ),
    );
    expect(r.issues).toEqual([
      { type: 'contradiction', severity: 'critical', quote: 'q', explanation: 'e' },
    ]);
  });

  it('maps the 1-5 fluency rating onto 0-1 and clamps out-of-range values', async () => {
    const fluency = async (value: number) =>
      (await judgeTranslation(INPUT, optsReturning(envelope({ issues: [], rationale: '', fluency: value }))))
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
          content: [{ type: 'output_text', text: JSON.stringify({ issues: [], rationale: 'ok', fluency: 4 }) }],
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
    const raw = messagesEnvelope({
      issues: [{ type: 'addition', severity: 'minor', quote: 'extra', explanation: 'x' }],
      rationale: 'extra words',
      fluency: 3,
    });
    const r = await judgeTranslation(INPUT, optsReturning(raw, 'claude-sonnet-5-5'));
    expect(r.issues).toHaveLength(1);
    expect(r.fluency).toBe(0.5);
    expect(r.rationale).toBe('extra words');
  });

  it('concatenates multiple Messages text blocks', async () => {
    const payload = JSON.stringify({ issues: [], rationale: 'ok', fluency: 4 });
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
      return { ok: true, status: 200, text: async () => envelope({ issues: [], rationale: '', fluency: 5 }) };
    };

    const opts = createJudgeOptions(loadConfig(env), env, fake);
    expect(opts.model).toBe('judge-model');

    const raw = await opts.transport('{"probe":true}');
    expect(seen!.url).toBe('https://grove.test/v1/responses');
    expect(seen!.headers['api-key']).toBe('k');
    expect(seen!.body).toBe('{"probe":true}');
    expect(JSON.parse(raw).output_text).toContain('"issues":[]');
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
      return { ok: true, status: 200, text: async () => messagesEnvelope({ issues: [], rationale: '', fluency: 5 }) };
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

describe('grammatical agreement', () => {
  const withAgreement = (agreement: unknown) =>
    envelope({ issues: [], rationale: 'ok', fluency: 3, agreement });

  it('maps the 1-5 agreement rating onto 0-1 and clamps', async () => {
    const agreement = async (value: unknown) =>
      (await judgeTranslation(INPUT, optsReturning(withAgreement(value)))).agreement;
    expect(await agreement(1)).toBe(0);
    expect(await agreement(3)).toBe(0.5);
    expect(await agreement(5)).toBe(1);
    expect(await agreement(99)).toBe(1);
    expect(await agreement(-4)).toBe(0);
  });

  it('is null when the judge returns null or omits the field', async () => {
    expect((await judgeTranslation(INPUT, optsReturning(withAgreement(null)))).agreement).toBeNull();
    const omitted = envelope({ issues: [], rationale: 'ok', fluency: 3 });
    expect((await judgeTranslation(INPUT, optsReturning(omitted))).agreement).toBeNull();
  });

  it('asks for the agreement rating in the schema and the prompt', () => {
    const schema = JUDGE_RESPONSE_SCHEMA.properties as Record<string, unknown>;
    expect(schema['agreement']).toBeDefined();
    expect((JUDGE_RESPONSE_SCHEMA as { required: readonly string[] }).required).toContain('agreement');
    expect(buildJudgePrompt(INPUT).toLowerCase()).toContain('agreement');
  });
});

describe('scoreFactuality', () => {
  const issue = (type: string, severity: string) =>
    ({ type, severity, quote: 'q', explanation: 'e' }) as Parameters<typeof scoreFactuality>[0][number];

  it('scores a page with no issues 1 on every factuality score', () => {
    expect(scoreFactuality([], 10)).toEqual({
      omission: 1,
      addition: 1,
      contradiction: 1,
      distortion: 1,
      faithful: 1,
    });
  });

  it('zeroes omission on a critical omission, but accepts minor ones', () => {
    expect(scoreFactuality([issue('omission', 'minor')], 10).omission).toBe(1);
    const page = scoreFactuality([issue('omission', 'minor'), issue('omission', 'critical')], 10);
    expect(page.omission).toBe(0);
    expect(page.addition).toBe(1);
  });

  it('zeroes addition on a critical addition, but accepts minor ones', () => {
    expect(scoreFactuality([issue('addition', 'minor')], 10).addition).toBe(1);
    expect(scoreFactuality([issue('addition', 'critical')], 10).addition).toBe(0);
  });

  it('zeroes contradiction on any contradiction', () => {
    expect(scoreFactuality([issue('contradiction', 'critical')], 10).contradiction).toBe(0);
    expect(scoreFactuality([issue('distortion', 'critical')], 10).contradiction).toBe(1);
  });

  it('scales distortion by critical distortions per segment and ignores minor ones', () => {
    expect(scoreFactuality([issue('distortion', 'minor'), issue('distortion', 'minor')], 10).distortion).toBe(1);
    expect(scoreFactuality([issue('distortion', 'critical')], 20).distortion).toBeCloseTo(1 - 1 / 20);
    expect(scoreFactuality([issue('distortion', 'critical'), issue('distortion', 'critical')], 1).distortion).toBe(0);
  });

  it('dilutes one critical distortion across a larger page', () => {
    const small = scoreFactuality([issue('distortion', 'critical')], 10);
    const large = scoreFactuality([issue('distortion', 'critical')], 40);
    expect(large.distortion).toBeGreaterThan(small.distortion);
  });

  it('treats a page with no segments as one segment', () => {
    expect(scoreFactuality([issue('distortion', 'critical')], 0).distortion).toBe(0);
  });

  it('scores faithful 0 on any critical issue or contradiction, and 1 otherwise', () => {
    const faithful = (...issues: ReturnType<typeof issue>[]) => scoreFactuality(issues, 10).faithful;
    expect(faithful()).toBe(1);
    expect(faithful(issue('omission', 'minor'), issue('distortion', 'minor'))).toBe(1);
    expect(faithful(issue('addition', 'critical'))).toBe(0);
    expect(faithful(issue('distortion', 'critical'))).toBe(0);
    expect(faithful(issue('contradiction', 'minor'))).toBe(0);
  });
});

describe('factuality prompt and schema', () => {
  it('defines the four issue types and the critical and minor severities', () => {
    const prompt = buildJudgePrompt(INPUT);
    for (const word of ['omission', 'addition', 'contradiction', 'distortion', 'critical', 'minor']) {
      expect(prompt).toContain(word);
    }
    expect(prompt).toContain('valores de expresión único');
  });

  it('requires a typed, severity-graded issue list in the schema', () => {
    const schema = JUDGE_RESPONSE_SCHEMA as unknown as {
      required: string[];
      properties: { issues: { items: { properties: Record<string, { enum?: string[] }> } } };
    };
    expect(schema.required).toContain('issues');
    const item = schema.properties.issues.items.properties;
    expect(item['type']!.enum).toEqual(['omission', 'addition', 'contradiction', 'distortion']);
    expect(item['severity']!.enum).toEqual(['critical', 'minor']);
  });
});

describe('JUDGE_RESPONSE_SCHEMA provider compatibility', () => {
  // The judge hand-builds its request and posts it with a raw fetch, so no SDK
  // strips keywords the API does not support. Anthropic's structured outputs
  // rejects these outright (HTTP 400) rather than ignoring them.
  const UNSUPPORTED_KEYWORDS = new Set([
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'multipleOf',
    'minLength',
    'maxLength',
    'pattern',
  ]);

  function collectKeys(node: unknown, out: Set<string> = new Set()): Set<string> {
    if (Array.isArray(node)) {
      for (const item of node) collectKeys(item, out);
    } else if (typeof node === 'object' && node !== null) {
      for (const [key, value] of Object.entries(node)) {
        out.add(key);
        collectKeys(value, out);
      }
    }
    return out;
  }

  it('carries no keyword Anthropic structured outputs rejects', () => {
    const present = [...collectKeys(JUDGE_RESPONSE_SCHEMA)].filter((key) =>
      UNSUPPORTED_KEYWORDS.has(key),
    );
    expect(present).toEqual([]);
  });

  it('constrains fluency to 1-5 as an allowed-value list, not numeric bounds', () => {
    const props = JUDGE_RESPONSE_SCHEMA.properties as Record<string, unknown>;
    expect(props['fluency']).toEqual({ type: 'integer', enum: [1, 2, 3, 4, 5] });
  });

  it('allows agreement to be a 1-5 rating or null', () => {
    const props = JUDGE_RESPONSE_SCHEMA.properties as Record<string, unknown>;
    expect(props['agreement']).toEqual({
      anyOf: [
        { type: 'integer', enum: [1, 2, 3, 4, 5] },
        { type: 'null' },
      ],
    });
  });
});
