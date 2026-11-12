/**
 * Syncs the bundled glossary to AWS Translate as a custom terminology.
 *
 * This is NOT part of the hermetic jest suite — a live sync makes real
 * AWS calls and needs real credentials. It imports the built output in
 * `dist/`, so run `pnpm build` first (the `pnpm sync-terminology` script
 * does this for you). `--dry-run` builds the CSV and validates the name
 * without touching AWS or needing credentials.
 *
 * Run:  pnpm sync-terminology --dry-run
 *       pnpm sync-terminology
 *       pnpm sync-terminology --locale fr --name docs-glossary-fr
 *
 * Exits 0 on success, 1 on any failure.
 */
import { parseArgs } from "node:util";
import {
  DEFAULT_GLOSSARY,
  buildTerminologyCsv,
  createTerminologyClient,
  isTerminologyName,
  resolveAwsTranslateConfigFromEnv,
  syncTerminology,
  terminologyIdentity,
} from "../dist/index.js";

const { values: args } = parseArgs({
  options: {
    locale: { type: "string", default: "es" },
    name: { type: "string" },
    "dry-run": { type: "boolean", default: false },
  },
});

const envName =
  process.env.AWS_TRANSLATE_TERMINOLOGY_NAME === "" ||
  process.env.AWS_TRANSLATE_TERMINOLOGY_NAME === undefined
    ? undefined
    : process.env.AWS_TRANSLATE_TERMINOLOGY_NAME;
const name = args.name ?? envName ?? "aws-translate-glossary";

const problems = [];
if (!isTerminologyName(name)) {
  problems.push(
    `terminology name "${name}" does not match ^([A-Za-z0-9-]_?)+$ (max 256 chars)`,
  );
}

let built;
try {
  built = buildTerminologyCsv(DEFAULT_GLOSSARY, args.locale);
} catch (cause) {
  console.error(`\n❌ SYNC FAILED: ${cause instanceof Error ? cause.message : cause}`);
  process.exit(1);
}
if (built.termCount === 0) {
  problems.push(`glossary has no terms with a "${args.locale}" translation`);
}

const identity = terminologyIdentity(built.csv);
console.log(
  `built ${built.termCount} terms for en->${args.locale} as "${name}" (identity ${identity})`,
);
for (const skip of built.skipped) {
  console.log(`skipped "${skip.term}": ${skip.reason}`);
}

if (args["dry-run"]) {
  process.stdout.write(built.csv);
  if (problems.length > 0) {
    console.error(`\n❌ DRY RUN FAILED:\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log("\n✅ DRY RUN OK: no AWS calls made");
  process.exit(0);
}

if (problems.length > 0) {
  console.error(`\n❌ SYNC FAILED:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

let config;
try {
  config = resolveAwsTranslateConfigFromEnv(process.env);
} catch (cause) {
  console.error(`\n❌ SYNC FAILED: ${cause instanceof Error ? cause.message : cause}`);
  process.exit(1);
}

let report;
try {
  report = await syncTerminology({
    name,
    csv: built.csv,
    identity,
    expectedTermCount: built.termCount,
    client: createTerminologyClient(config.region),
  });
} catch (cause) {
  console.error(`\n❌ SYNC FAILED: ${cause instanceof Error ? cause.message : cause}`);
  process.exit(1);
}

console.log(`result: ${report.outcome.action} (${report.outcome.name})`);
if (report.outcome.action === "overwritten") {
  console.log(`⚠️  ${report.outcome.propagationWarning}`);
}
if (report.skippedTermCount > 0) {
  console.log(
    `⚠️  "${name}" was uploaded with ${report.outcome.termCount} of ${built.termCount} terms; AWS skipped ${report.skippedTermCount} term(s) at import`,
  );
  if (report.auxiliaryDataLocation !== undefined) {
    const warningFile = await fetch(report.auxiliaryDataLocation).then(
      (response) => response.text(),
      () => "(could not fetch the warnings file; the presigned URL expires after 30 minutes)",
    );
    console.log(warningFile);
  }
  process.exit(1);
}
console.log("✅ SYNC OK");
