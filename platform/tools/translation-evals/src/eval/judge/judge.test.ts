import { describe, it, expect } from 'vitest';
import type { Transport, TransportRequest } from '@mongodb-docs/translation-service';
import { loadConfig } from '../../config.js';
import { createJudgeOptions } from './grove.js';
import { buildJudgeRequest, judgeTranslation, type JudgeOptions } from './judge.js';
import { buildJudgePrompt, type JudgeInput } from './prompt.js';

const INPUT: JudgeInput = {
  source: 'Add a user.',
  output: 'Añade un usuario.',
  reference: 'Añadir un usuario.',
  locale: 'es',
};

function envelope(payload: unknown): string {
  return JSON.stringify({ output_text: JSON.stringify(payload) });
}

function optsReturning(raw: string): JudgeOptions {
  return { transport: async () => raw, model: 'judge-model' };
}

describe('buildJudgePrompt', () => {
  it('names the locale, carries the source, and anchors on the source', () => {
    const prompt = buildJudgePrompt(INPUT);
    expect(prompt).toContain('es');
    expect(prompt).toContain('Add a user.');
    expect(prompt.toLowerCase()).toContain('source');
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
});

describe('buildJudgeRequest', () => {
  it('sends the judge model, a system and user message, and a strict schema', () => {
    const body = JSON.parse(buildJudgeRequest(INPUT, 'judge-model')) as {
      model: string;
      input: Array<{ role: string; content: Array<{ text: string }> }>;
      text: { format: { strict: boolean } };
    };
    expect(body.model).toBe('judge-model');
    expect(body.input.map((m) => m.role)).toEqual(['system', 'user']);
    expect(body.input[1]!.content[0]!.text).toContain('SOURCE:');
    expect(body.text.format.strict).toBe(true);
  });
});

describe('createJudgeOptions', () => {
  const env = {
    GROVE_API_KEY: 'k',
    JUDGE_MODEL: 'judge-model',
    GROVE_ENDPOINT: 'https://grove.test/v1/responses',
  };

  it('requires JUDGE_MODEL so the judge never reuses the translator model', () => {
    expect(() => createJudgeOptions(loadConfig({ GROVE_API_KEY: 'k' }))).toThrow(/JUDGE_MODEL/);
  });

  it('posts the judge request to the Grove endpoint with the api-key header', async () => {
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

  it('throws when Grove responds with a non-ok status', async () => {
    const fake: Transport = async () => ({ ok: false, status: 429, text: async () => '' });
    const opts = createJudgeOptions(loadConfig(env), env, fake);
    await expect(opts.transport('{}')).rejects.toThrow(/HTTP 429/);
  });
});
