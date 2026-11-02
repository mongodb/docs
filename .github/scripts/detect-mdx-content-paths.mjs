#!/usr/bin/env node
/**
 * Maps changed files under `content/` to Snooty content paths, filtered to the
 * versions the docs site actually publishes.
 *
 * A content path is relative to `content/`: `atlas`, `voyageai`, `manual/v8.0`.
 * It is a project if the directory holds a `snooty.toml`, otherwise its
 * immediate children that do.
 *
 * Plain Node, no dependencies, so it runs and tests outside the pnpm workspace.
 */
import fs from "node:fs";
import path from "node:path";

export function readProjectName(tomlPath) {
  const source = fs.readFileSync(tomlPath, "utf8");
  const match = source.match(/^[ \t]*name[ \t]*=[ \t]*"([^"]+)"/m);
  if (!match) throw new Error(`no \`name\` in ${tomlPath}`);
  return match[1];
}

export function scanContentPaths(contentDir) {
  const found = [];
  for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const projectDir = path.join(contentDir, entry.name);

    const rootToml = path.join(projectDir, "snooty.toml");
    if (fs.existsSync(rootToml)) {
      found.push({
        contentPath: entry.name,
        project: readProjectName(rootToml),
        versionName: null,
      });
      continue;
    }

    for (const child of fs.readdirSync(projectDir, { withFileTypes: true })) {
      if (!child.isDirectory()) continue;
      const versionToml = path.join(projectDir, child.name, "snooty.toml");
      if (!fs.existsSync(versionToml)) continue;
      found.push({
        contentPath: `${entry.name}/${child.name}`,
        project: readProjectName(versionToml),
        versionName: child.name,
      });
    }
  }
  return found.sort((a, b) => a.contentPath.localeCompare(b.contentPath));
}

export function filterActivePaths(paths, catalog) {
  const byProject = new Map(catalog.map((docset) => [docset.project, docset]));
  return paths.filter((entry) => {
    const docset = byProject.get(entry.project);
    if (!docset) return false;
    if (entry.versionName === null) {
      // Single-version docsets name their lone version with a stub (`main`)
      // that is not a directory, so any active version means the path is live.
      return docset.versions.some((version) => version.active);
    }
    const version = docset.versions.find((v) => v.versionName === entry.versionName);
    return Boolean(version?.active);
  });
}

export function mapChangedFilesToContentPaths(changedFiles, contentPaths) {
  // Longest first so `manual/v8.0` wins over any shorter prefix of it.
  const known = [...contentPaths].sort((a, b) => b.length - a.length);
  const hits = new Set();
  for (const file of changedFiles) {
    const rel = file.replace(/^\.\//, "");
    if (!rel.startsWith("content/")) continue;
    const rest = rel.slice("content/".length);
    const hit = known.find((cp) => rest === cp || rest.startsWith(`${cp}/`));
    if (hit) hits.add(hit);
  }
  return [...hits].sort();
}

export function detectContentPaths({ contentDir, catalog, changedFiles, mode }) {
  const active = filterActivePaths(scanContentPaths(contentDir), catalog);
  const activePaths = active.map((entry) => entry.contentPath);
  if (mode === "full") return activePaths;
  return mapChangedFilesToContentPaths(changedFiles, activePaths);
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
  const { parseArgs } = await import("node:util");
  const { values } = parseArgs({
    options: {
      "content-dir": { type: "string", default: "content" },
      catalog: { type: "string" },
      mode: { type: "string", default: "incremental" },
      "changed-files": { type: "string" },
    },
  });

  if (!values.catalog) {
    console.error("--catalog <path to docsets.json> is required");
    process.exit(2);
  }
  if (!["incremental", "full"].includes(values.mode)) {
    console.error(`--mode must be incremental or full, got ${values.mode}`);
    process.exit(2);
  }

  const catalog = JSON.parse(fs.readFileSync(values.catalog, "utf8"));
  let changedFiles = [];
  if (values.mode !== "full") {
    const raw = values["changed-files"]
      ? fs.readFileSync(values["changed-files"], "utf8")
      : fs.readFileSync(0, "utf8");
    changedFiles = raw.split("\n").map((line) => line.trim()).filter(Boolean);
  }

  const paths = detectContentPaths({
    contentDir: values["content-dir"],
    catalog,
    changedFiles,
    mode: values.mode,
  });
  process.stdout.write(paths.length ? `${paths.join("\n")}\n` : "");
}
