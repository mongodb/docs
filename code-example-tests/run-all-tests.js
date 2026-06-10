#!/usr/bin/env node
// Runs each language's run-tests.js sequentially with a sticky status bar.
// Sequential execution is required because all suites share the same MongoDB
// databases (e.g. agg_tutorials_db). Running in parallel causes one suite's
// teardown to drop the database mid-test in another suite.

import { spawn, execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT  = dirname(fileURLToPath(import.meta.url));
const write = (s) => process.stdout.write(s);

// ── Colors ───────────────────────────────────────────────────────────────────
const C = {
  reset:    '\x1b[0m',   bold:     '\x1b[1m',
  green:    '\x1b[1;32m', red:     '\x1b[1;31m',
  barBg:    '\x1b[48;5;17m',  barFg:    '\x1b[38;5;255m',
  barLabel: '\x1b[38;5;153m', barGreen: '\x1b[38;5;82m',
  barRed:   '\x1b[38;5;203m',
};

const LABEL_COLOR = {
  'C#': '\x1b[35m', 'Java': '\x1b[33m', 'JavaScript': '\x1b[36m',
  'Python': '\x1b[34m', 'Go': '\x1b[32m',
};

// ── ANSI terminal helpers ────────────────────────────────────────────────────
const T = {
  rows:       () => process.stdout.rows    ?? 24,
  save:       () => write('\x1b7'),
  restore:    () => write('\x1b8'),
  cup:        (r, c) => write(`\x1b[${r + 1};${c + 1}H`),
  eraseLine:  () => write('\x1b[2K'),
  csr:        (t, b) => write(`\x1b[${t + 1};${b + 1}r`),
  hideCursor: () => write('\x1b[?25l'),
  showCursor: () => write('\x1b[?25h'),
};

// ── CLI flags ────────────────────────────────────────────────────────────────
const NO_SNIP = process.argv.includes('--no-snip');
// By default, snip.js is skipped when any test suite fails so broken examples
// don't leak into content/code-examples/tested/. Pass --snip-on-failure to
// force snipping (useful when iterating on snippets while a flaky test is
// causing intermittent suite failures).
const SNIP_ON_FAILURE = process.argv.includes('--snip-on-failure');

// ── Suite definitions ────────────────────────────────────────────────────────
// Each suite runs `node run-tests.js` from its directory. Suites run
// sequentially (see Dashboard.setup() and the for-await loop in main()) because
// they share the same MongoDB databases.
const SUITES = [
  { label: 'C#',         cwd: 'csharp/driver'    },
  { label: 'Java (Driver Sync)', cwd: 'java/driver-sync' },
  { label: 'Java (Driver Reactive)', cwd: 'java/driver-reactive'  },
  { label: 'JavaScript', cwd: 'javascript/driver' },
  { label: 'Python',     cwd: 'python/pymongo'    },
  { label: 'Go',         cwd: 'go/driver'         },
];

// ── Dashboard ────────────────────────────────────────────────────────────────
const SPINNER_FRAMES = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];

class Dashboard {
  constructor(suites) {
    this.suites  = suites;
    this.numRows = suites.length;
    this.states  = Object.fromEntries(suites.map((s) => [s.label, { status: 'pending' }]));
    this.frame   = 0;
    this._timer  = null;
    // TTY-only: the dashboard relies on cursor positioning, scroll regions,
    // and erase-line escapes. In a piped / CI context those would render as
    // literal escape characters in the log, so we fall back to a quieter mode
    // that just prints a single status line per state change.
    this._tty = !!process.stdout.isTTY;
    // Snapshot the row count at setup time so a terminal resize mid-run can't
    // shift our scroll region or erase rows belonging to the user's scrollback.
    this._totalRows = T.rows();
  }

  get startRow()     { return this._totalRows - this.numRows; }
  get scrollBottom() { return this._totalRows - this.numRows - 1; }

  setup() {
    if (!this._tty) return;
    this._totalRows = T.rows();
    T.hideCursor();
    T.csr(0, this.scrollBottom);
    this.redraw();
    this._timer = setInterval(() => {
      this.frame = (this.frame + 1) % SPINNER_FRAMES.length;
      this.redraw();
    }, 80);
  }

  teardown() {
    if (!this._tty) return;
    clearInterval(this._timer);
    for (let i = 0; i < this.numRows; i++) {
      T.cup(this.startRow + i, 0);
      T.eraseLine();
    }
    T.csr(0, this._totalRows - 1);
    T.cup(this._totalRows - 1, 0);
    write('\n');
    T.showCursor();
  }

  setRunning(label) {
    this.states[label] = { status: 'running', start: Date.now() };
    if (this._tty) this.redraw();
    else write(`▶ ${label} running...\n`);
  }
  setDone(label, ok) {
    const prev = this.states[label];
    const elapsed = prev.start != null ? Date.now() - prev.start : 0;
    this.states[label] = { status: 'done', ok, elapsed };
    if (this._tty) {
      this.redraw();
    } else {
      const icon = ok ? '✓' : '✗';
      write(`${icon} ${label} ${ok ? 'complete' : 'failed'} (${formatDuration(elapsed)})\n`);
    }
  }

  redraw() {
    if (!this._tty) return;
    T.save();
    for (let i = 0; i < this.suites.length; i++) {
      const { label } = this.suites[i];
      T.cup(this.startRow + i, 0);
      write(C.barBg + C.barFg + '\x1b[K' + this._rowText(label, this.states[label]) + C.reset);
    }
    T.restore();
  }

  _rowText(label, state) {
    const pad = label.padEnd(12);
    if (state.status === 'pending') return ` ${C.barLabel}◦${C.barFg}  ${pad}  ${C.barLabel}pending`;
    if (state.status === 'running') {
      const secs = Math.floor((Date.now() - state.start) / 1000);
      return ` ${C.barFg}${SPINNER_FRAMES[this.frame]}  ${pad}  running... (${secs}s)`;
    }
    const icon   = state.ok ? `${C.barGreen}✓` : `${C.barRed}✗`;
    const status = state.ok ? `${C.barGreen}complete` : `${C.barRed}failed`;
    const dur    = formatDuration(state.elapsed);
    return ` ${icon}${C.barFg}  ${pad}  ${status} ${C.barLabel}(${dur})${C.barFg}`;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDuration(ms) {
  if (ms == null || ms < 0) return '?';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

// ── Suite runner ─────────────────────────────────────────────────────────────
function runSuite(suite, dashboard) {
  return new Promise((resolve) => {
    dashboard.setRunning(suite.label);
    const color  = LABEL_COLOR[suite.label] ?? '\x1b[37m';
    const prefix = `${C.bold}${color}[${suite.label}]${C.reset} `;

    const proc = spawn('node', ['run-tests.js'], {
      cwd:   join(ROOT, suite.cwd),
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let buf = '';
    const feed = (data) => {
      buf += data.toString();
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';
      for (const l of lines) write(prefix + l + '\n');
    };

    proc.stdout.on('data', feed);
    proc.stderr.on('data', feed);
    proc.on('close', (code) => {
      if (buf) write(prefix + buf + '\n');
      const ok = code === 0;
      dashboard.setDone(suite.label, ok);
      resolve({ label: suite.label, ok, elapsed: dashboard.states[suite.label].elapsed });
    });
    proc.on('error', (err) => {
      write(prefix + `[error] ${err.message}\n`);
      dashboard.setDone(suite.label, false);
      resolve({ label: suite.label, ok: false, elapsed: dashboard.states[suite.label].elapsed });
    });
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const dashboard = new Dashboard(SUITES);

  const abort = () => { dashboard.teardown(); process.exit(1); };
  process.on('SIGINT',  abort);
  process.on('SIGTERM', abort);

  write(`\n${C.bold}Running all Grove suites sequentially...${C.reset}\n\n`);
  dashboard.setup();

  const results = [];
  for (const s of SUITES) {
    results.push(await runSuite(s, dashboard));
  }

  dashboard.teardown();

  write(`\n${C.bold}════════════════ Summary ════════════════${C.reset}\n`);
  let pass = 0, fail = 0;
  for (const r of results) {
    const dur = `\x1b[2m(${formatDuration(r.elapsed)})${C.reset}`;
    if (r.ok) { write(`  ${C.green}✓ ${r.label}${C.reset} ${dur}\n`); pass++; }
    else       { write(`  ${C.red}✗ ${r.label}${C.reset} ${dur}\n`);  fail++; }
  }
  write(`\n  ${C.bold}${pass} passed, ${fail} failed${C.reset}\n\n`);

  if (NO_SNIP) {
    // Caller opted out explicitly.
  } else if (fail > 0 && !SNIP_ON_FAILURE) {
    write(`${C.bold}Skipping snip.js — ${fail} suite(s) failed.${C.reset}\n`);
    write(`  (use --snip-on-failure to snip anyway)\n\n`);
  } else {
    write(`${C.bold}Running snip.js for all suites...${C.reset}\n`);
    for (const s of SUITES) {
      const snipCwd = join(ROOT, s.cwd);
      write(`  ${C.bold}[${s.label}]${C.reset} node snip.js\n`);
      try {
        execSync('node snip.js', { cwd: snipCwd, stdio: 'inherit' });
      } catch (err) {
        write(`  ${C.red}✗ snip.js failed for ${s.label}${C.reset}\n`);
        process.exit(1);
      }
    }
    write(`\n`);
  }

  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => { console.error(err); process.exit(1); });

