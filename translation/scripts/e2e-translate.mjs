/**
 * Live end-to-end test against the REAL Grove gateway.
 *
 * This is NOT part of the hermetic jest suite — it makes a real network
 * call and needs a real GROVE_API_KEY. It imports the built output in
 * `dist/`, so run `npm run build` first (the `npm run e2e` script does
 * this for you).
 *
 * Run:  npm run e2e     (after: cp .env.example .env && edit .env)
 *
 * Exits 0 on success, 1 on any failure — so it doubles as a smoke check.
 */
import { translate, createGroveBackend } from "../dist/index.js";

if (!process.env.GROVE_API_KEY) {
  console.error(
    "GROVE_API_KEY is not set.\n" +
      "Copy the template and fill it in:  cp .env.example .env\n" +
      "then run:  npm run e2e",
  );
  process.exit(1);
}

const request = {
  source_locale: "en",
  target_locale: "fr",
  payload: {
    "actions.ask_mongodb_ai": "Ask MongoDB AI",
    "actions.copy_page": "Copy page",
    "nav.docs_home": "Docs Home",
  },
  // Product names that must survive translation verbatim (via __PROTn__).
  non_translatable_terms: ["MongoDB", "MongoDB AI"],
};

const keyCount = Object.keys(request.payload).length;
console.log(
  `Translating ${keyCount} strings ${request.source_locale} -> ${request.target_locale} via Grove...\n`,
);

const startedAt = Date.now();
let response;
try {
  // createGroveBackend() reads GROVE_API_KEY (+ optional overrides) from env.
  response = await translate(request, { backend: createGroveBackend() });
} catch (error) {
  // Request-level failures (e.g. bad request shape) throw. Backend failures
  // (HTTP/timeout/parse) are degraded to per-key errors, not thrown.
  console.error("Request threw:", error);
  process.exit(1);
}
const elapsedMs = Date.now() - startedAt;

console.log(JSON.stringify(response, null, 2));
console.log(
  `\nLatency: ${elapsedMs}ms  |  provider=${response.meta.provider}  model=${response.meta.model}`,
);

// --- Assertions: turn the call into a real pass/fail signal ---------------
const problems = [];

const inKeys = Object.keys(request.payload).sort();
const outKeys = Object.keys(response.translations).sort();
if (JSON.stringify(inKeys) !== JSON.stringify(outKeys)) {
  problems.push(`Key set changed.\n  in:  ${inKeys}\n  out: ${outKeys}`);
}

if (response.meta.partial_failure) {
  problems.push(
    `partial_failure=true; errors=${JSON.stringify(response.errors, null, 2)}`,
  );
}

for (const [key, value] of Object.entries(response.translations)) {
  if (value === null) continue;
  if (/__PROT\d+__/.test(value)) {
    problems.push(`Leaked placeholder token in "${key}": ${value}`);
  }
}

// The value with a protected term should still contain it verbatim.
const protectedValue = response.translations["actions.ask_mongodb_ai"];
if (protectedValue && !protectedValue.includes("MongoDB")) {
  problems.push(
    `Protected term "MongoDB" missing from "actions.ask_mongodb_ai": ${protectedValue}`,
  );
}

if (problems.length > 0) {
  console.error("\n❌ E2E FAILED:\n- " + problems.join("\n- "));
  process.exit(1);
}

console.log(
  "\n✅ E2E PASSED: keys preserved, no partial failures, protected terms intact, no leaked tokens.",
);
