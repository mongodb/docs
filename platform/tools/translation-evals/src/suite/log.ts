export type LogEvent = 'begin' | 'done' | 'info' | 'warn' | 'fail';

export interface LogLine {
  scope?: string;
  event: LogEvent;
  subject?: string;
  attrs?: Record<string, string | number | boolean | undefined>;
}

const EVENT_WIDTH = 5;

function isoSeconds(now: Date): string {
  return now.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function renderAttr(key: string, value: string | number | boolean): string {
  const s = String(value).replace(/[\r\n]+/g, ' ');
  return /[\s"]/.test(s) ? `${key}="${s.replace(/"/g, '\\"')}"` : `${key}=${s}`;
}

export function formatLogLine(line: LogLine, now: Date = new Date()): string {
  const tokens = [isoSeconds(now)];
  if (line.scope) tokens.push(`[${line.scope}]`);
  tokens.push(line.event.padEnd(EVENT_WIDTH));
  if (line.subject) tokens.push(line.subject);
  for (const [key, value] of Object.entries(line.attrs ?? {})) {
    if (value === undefined) continue;
    tokens.push(renderAttr(key, value));
  }
  return tokens.join(' ');
}

export function logLine(line: LogLine): void {
  console.log(formatLogLine(line));
}
