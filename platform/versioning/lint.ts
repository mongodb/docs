/**
 * Validates the docset versioning data against the repo.
 *
 * `defineDocset` already enforces what it can see from inside one file
 * (duplicate versions, two stable versions, groups naming unknown versions).
 * This covers what it cannot: cross-file uniqueness, agreement with the
 * `projects/` directory, and agreement with `content/`.
 *
 *   pnpm --filter versioning lint:catalog
 *
 * Named `lint:catalog`, not `lint`, while the catalog has no readers: turbo's
 * `lint` task runs in every workspace package, so a plain `lint` script would
 * run this on every platform PR and could fail someone else's work on data
 * drift the catalog cannot yet affect. The cutover renames it back.
 *
 * Errors exit non-zero. Warnings do not block builds.
 */
import fs from "node:fs";
import path from "node:path";
import { docsets, isMultiVersion } from "./index";

/** Published docsets whose content lives outside this monorepo. */
const CONTENT_ELSEWHERE = new Set(["mongoid-railsmdb"]);

/** Subdirectories of a content dir that are never versions. */
const NON_VERSION_DIRS = new Set(["images", "includes", "examples", "source"]);

const errors: string[] = [];
const warnings: string[] = [];

const currentDir = import.meta.dirname;
const repoRoot = path.resolve(currentDir, '..', '..');
const projectsDir = path.join(currentDir, 'projects');
const contentRoot = path.join(repoRoot, "content");

/** Maps snooty project name -> content directory by walking /content. */
const contentDirFor = (): Map<string, string> => {
	const contentDirMap = new Map<string, string>();
	for (const dir of fs.readdirSync(contentRoot)) {
		const base = path.join(contentRoot, dir);
		if (!fs.statSync(base).isDirectory()) continue;
		const candidates = [path.join(base, "snooty.toml")];
		for (const sub of fs.readdirSync(base)) {
			candidates.push(path.join(base, sub, "snooty.toml"));
		}
		for (const toml of candidates) {
			if (!fs.existsSync(toml)) continue;
			const name = /^name\s*=\s*"([^"]+)"/m.exec(
				fs.readFileSync(toml, "utf8"),
			)?.[1];
			if (name) {
				contentDirMap.set(name, dir);
				break;
			}
		}
	}
	return contentDirMap;
};

const main = (): void => {
  // Map project -> content directory
  const dirs = contentDirFor();

  // 1. Every file in /projects is in the barrel, and vice versa.
  const docsetFileNames = new Set(
    fs
      .readdirSync(projectsDir)
      .filter((f) => f.endsWith('.ts'))
      .map((f) => f.replace(/\.ts$/, '')),
  );
  const registered = new Set(docsets.map((d) => d.project));
  for (const file of docsetFileNames) {
    if (!registered.has(file)) {
      errors.push(
        `projects/${file}.ts is not registered in index.ts — the site will be missing from the catalog`,
      );
    }
  }
  for (const project of registered) {
    if (!docsetFileNames.has(project)) {
      errors.push(
        `index.ts registers "${project}" but projects/${project}.ts does not exist`,
      );
    }
  }

  // 2. Project ids are unique.
  const counts = new Map<string, number>();
  for (const d of docsets)
    counts.set(d.project, (counts.get(d.project) ?? 0) + 1);
  for (const [project, n] of counts) {
    if (n > 1) errors.push(`"${project}" is registered ${n} times in index.ts`);
  }

  // 3. No two docsets share a prefix. Manual and landing are the
  //    exception: `landing` serves /docs/ itself while `docs` serves
  //    /docs/<version>/, so they coexist. Any other pair is a routing
  //    conflict.
  const byPrefix = new Map<string, string[]>();
  for (const d of docsets) {
    byPrefix.set(d.prefix, [...(byPrefix.get(d.prefix) ?? []), d.project]);
  }
  for (const [prefix, projects] of byPrefix) {
    if (projects.length < 2) continue;
    const sharers = [...projects].sort();
    const isAllowedDuplicatePrefix =
      sharers.length === 2 && sharers[0] === 'docs' && sharers[1] === 'landing';
    if (!isAllowedDuplicatePrefix) {
      errors.push(
        `${sharers
          .map((p) => `"${p}"`)
          .join(
            ' and ',
          )} all use the prefix "${prefix}" — only "docs" and "landing" may share one`,
      );
    }
  }

  // 4. Every active version has source in /content
  for (const d of docsets) {
    if (CONTENT_ELSEWHERE.has(d.project)) continue;
    // A fully deprecated docset keeps its history in the catalog but publishes
    // nothing, so its content directory is removed. docs-k8s-operator is the
    // current example. Only require content for a docset that still serves.
    if (!d.versions.some((v) => v.active)) continue;
    const dir = dirs.get(d.project);
    if (!dir) {
      errors.push(
        `"${d.project}" has no content directory — no content/*/snooty.toml declares it`,
      );
      continue;
    }
    for (const v of d.versions) {
      if (!v.active) continue;
      const expected = isMultiVersion(d)
        ? path.join(contentRoot, dir, v.versionName)
        : path.join(contentRoot, dir);
      if (!fs.existsSync(expected)) {
        errors.push(
          `"${d.project}" version "${
            v.versionName
          }" is active but content/${path.relative(
            contentRoot,
            expected,
          )}/ does not exist`,
        );
      }
    }
  }

  // 5. Warn when /content holds a version the catalog does not list.
  for (const d of docsets) {
    if (!isMultiVersion(d)) continue;
    const dir = dirs.get(d.project);
    if (!dir) continue;
    const known = new Set(d.versions.map((v) => v.versionName));
    for (const subDir of fs.readdirSync(path.join(contentRoot, dir))) {
      if (NON_VERSION_DIRS.has(subDir)) continue;
      if (!fs.statSync(path.join(contentRoot, dir, subDir)).isDirectory())
        continue;
      if (!known.has(subDir)) {
        warnings.push(
          `content/${dir}/${subDir}/ exists but "${d.project}" does not list a version named "${subDir}"`,
        );
      }
    }
  }

  // 6. Every version named by a TOC gate is a real versionName.
  // Only the data directories. The rest of content/table-of-contents is
  // ordinary TypeScript -- scripts, types, tests -- where `versions:` shows up
  // in destructuring and in generator template literals, and where a regex or
  // template literal could confuse a scanner that is not a real parser.
  const TOC_DATA_DIRS = ["L1-data", "L2-data", "manual-data", "docset-data"];
  const tocRoot = path.join(contentRoot, "table-of-contents");
  const tocFiles: string[] = [];
  const collectTocFiles = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) collectTocFiles(full);
      else if (entry.name.endsWith(".ts")) tocFiles.push(full);
    }
  };
  for (const dir of TOC_DATA_DIRS) {
    const full = path.join(tocRoot, dir);
    if (fs.existsSync(full)) collectTocFiles(full);
    else warnings.push(`TOC data directory content/table-of-contents/${dir}/ not found — gates there are unchecked`);
  }

  const versionNamesByProject = new Map(
    docsets.map((d) => [d.project, new Set(d.versions.map((v) => v.versionName))]),
  );
  const allVersionNames = new Set(
    docsets.flatMap((d) => d.versions.map((v) => v.versionName)),
  );

  /** A `{ ... }` literal in a TOC file, linked to the one enclosing it. */
  type TocObject = { parent: TocObject | undefined; contentSite?: string };

  /**
   * `contentSite` is usually declared on an ancestor node rather than on the
   * gated item, and a sibling may declare a different one in between.
   * Track nesting depth instead and inherit the way the renderer does:
   * the gate's own object, else its nearest ancestor.
   */
  const scanGates = (
    text: string,
  ): { offset: number; body: string; contentSite?: string }[] => {
    const gates: { offset: number; body: string; owner: TocObject }[] = [];
    const root: TocObject = { parent: undefined };
    let current = root;
    let index = 0;

    while (index < text.length) {
      const char = text[index] as string;

      // Skip over anything where a brace or a quote is not structural.
      if (char === "/" && text[index + 1] === "/") {
        index = text.indexOf("\n", index);
        if (index === -1) break;
        continue;
      }
      if (char === "/" && text[index + 1] === "*") {
        const close = text.indexOf("*/", index + 2);
        index = close === -1 ? text.length : close + 2;
        continue;
      }
      if (char === "'" || char === '"' || char === "`") {
        index += 1;
        while (index < text.length && text[index] !== char) {
          index += text[index] === "\\" ? 2 : 1;
        }
        index += 1;
        continue;
      }

      if (char === "{") {
        current = { parent: current };
        index += 1;
        continue;
      }
      if (char === "}") {
        current = current.parent ?? root;
        index += 1;
        continue;
      }

      const site = /^contentSite:\s*['"]([^'"]+)['"]/.exec(text.slice(index));
      if (site) {
        current.contentSite = site[1] as string;
        index += site[0].length;
        continue;
      }

      // `versions: { ... }`. Gate bodies hold no nested braces.
      //
      // The brace has to come right after the key. `versions:` also shows up
      // as a plain property (`versions: someArray`), and hunting for the next
      // `{` would grab some unrelated object and wreck everything after it.
      if (text.startsWith("versions:", index)) {
        const afterKey = index + "versions:".length;
        const open = afterKey + (/^\s*/.exec(text.slice(afterKey))?.[0].length ?? 0);
        const close = text[open] === "{" ? text.indexOf("}", open) : -1;
        if (close !== -1) {
          gates.push({
            offset: index,
            body: text.slice(open + 1, close),
            owner: current,
          });
          index = close + 1;
          continue;
        }
        index = afterKey;
        continue;
      }

      index += 1;
    }

    return gates.map(({ offset, body, owner }) => {
      let node: TocObject | undefined = owner;
      while (node && !node.contentSite) node = node.parent;
      const contentSite = node?.contentSite;
      return contentSite === undefined
        ? { offset, body }
        : { offset, body, contentSite };
    });
  };

  const LITERAL_ARRAY = /(includes|excludes)\s*:\s*\[([^\]]*)\]/g;
  const QUOTED = /['"]([^'"]+)['"]/g;
  // A spread of a helper call inside an otherwise literal array, e.g.
  // `excludes: [...manualVersions.before('v8.2')]`. Its quoted text is an
  // argument naming a version-array entry, not a gate value -- those are
  // version-array names (v8.3), not catalog names (manual), and flagging them
  // would report the helper's own vocabulary as broken.
  const SPREAD_CALL = /\.{3}[\w.]+\([^)]*\)/g;

  for (const file of tocFiles) {
    const text = fs.readFileSync(file, "utf8");
    const relative = path.relative(repoRoot, file);
    const lineOf = (offset: number): number =>
      text.slice(0, offset).split("\n").length;

    for (const gate of scanGates(text)) {
      const projectVersions = gate.contentSite
        ? versionNamesByProject.get(gate.contentSite)
        : undefined;
      // A gate naming a project we do not publish is passed.
      if (gate.contentSite && !projectVersions) continue;
      // Files under docset-data/*/versions/ are fragments whose contentSite is
      // supplied by the parent that imports them, so some gates cannot be
      // attributed by reading one file. Check those against every project's
      // versions: weaker, but it still catches a name that exists nowhere --
      // which is what a stale gate looks like.
      const knownVersions = projectVersions ?? allVersionNames;

      for (const array of gate.body.matchAll(LITERAL_ARRAY)) {
        // array[2] is whatever sits between the brackets. Drop any spread
        // helper call first -- its quoted args are release numbers (v8.3), not
        // the catalog names (upcoming) a gate matches on, and the TOC build
        // already validates them.
        const literalsOnly = (array[2] as string).replace(SPREAD_CALL, "");

        // What's left is plain: each string claims a version exists.
        for (const quoted of literalsOnly.matchAll(QUOTED)) {
          const value = quoted[1] as string;
          if (knownVersions.has(value)) continue;

          // Two messages because `knownVersions` means two different things: this
          // project's versions when we could attribute the gate, every
          // project's versions when we couldn't.
          warnings.push(
            gate.contentSite
              ? `${relative}:${lineOf(gate.offset)} — toc gate for "${
                  gate.contentSite
                }" names "${value}", which is not one of its versions`
              : `${relative}:${lineOf(
                  gate.offset,
                )} — toc gate names "${value}", which is not a version of any project`,
          );
        }
      }
    }
  }

  for (const w of warnings) console.warn(`[Warning] Versioning: ${w}`);
  for (const e of errors) console.error(`[ERROR] Versioning: ${e}`);
  console.log(
    `\nchecked ${docsets.length} docsets, ${docsets.reduce(
      (n, d) => n + d.versions.length,
      0,
    )} versions — ` +
      `${errors.length} error(s), ${warnings.length} warning(s)`,
  );
  if (errors.length) process.exit(1);
};

main();
