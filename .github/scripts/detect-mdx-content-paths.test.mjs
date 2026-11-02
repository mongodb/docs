import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { scanContentPaths, readProjectName } from "./detect-mdx-content-paths.mjs";

/** Build a throwaway content/ tree. `spec` maps contentPath -> project name. */
function makeContentDir(spec) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mdx-detect-"));
  for (const [contentPath, project] of Object.entries(spec)) {
    const dir = path.join(root, contentPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "snooty.toml"), `name = "${project}"\ntitle = "T"\n`);
  }
  // A directory with no snooty.toml anywhere must be ignored.
  fs.mkdirSync(path.join(root, "shared"), { recursive: true });
  return root;
}

test("scanContentPaths finds unversioned and versioned projects", () => {
  const contentDir = makeContentDir({
    atlas: "cloud-docs",
    voyageai: "voyageai",
    "manual/v8.0": "docs",
    "manual/upcoming": "docs",
    "golang/current": "golang",
  });

  assert.deepEqual(scanContentPaths(contentDir), [
    { contentPath: "atlas", project: "cloud-docs", versionName: null },
    { contentPath: "golang/current", project: "golang", versionName: "current" },
    { contentPath: "manual/upcoming", project: "docs", versionName: "upcoming" },
    { contentPath: "manual/v8.0", project: "docs", versionName: "v8.0" },
    { contentPath: "voyageai", project: "voyageai", versionName: null },
  ]);
});

test("scanContentPaths returns [] for an empty content dir", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mdx-detect-empty-"));
  assert.deepEqual(scanContentPaths(root), []);
});

test("readProjectName throws when name is absent", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mdx-detect-bad-"));
  const toml = path.join(root, "snooty.toml");
  fs.writeFileSync(toml, 'title = "No name here"\n');
  assert.throws(() => readProjectName(toml), /no `name`/);
});

import {
  filterActivePaths,
  mapChangedFilesToContentPaths,
  detectContentPaths,
} from "./detect-mdx-content-paths.mjs";

const CATALOG = [
  { project: "cloud-docs", versions: [{ versionName: "main", active: true }] },
  { project: "docs", versions: [
    { versionName: "upcoming", active: true },
    { versionName: "v8.0", active: true },
    { versionName: "v4.4", active: false },
  ] },
  { project: "atlas-architecture", versions: [
    { versionName: "current", active: true },
    { versionName: "v20260330", active: false },
  ] },
  { project: "bi-connector", versions: [{ versionName: "current", active: false }] },
];

test("filterActivePaths keeps active versions and drops inactive ones", () => {
  const scanned = [
    { contentPath: "atlas", project: "cloud-docs", versionName: null },
    { contentPath: "manual/v8.0", project: "docs", versionName: "v8.0" },
    { contentPath: "manual/v4.4", project: "docs", versionName: "v4.4" },
    { contentPath: "arch/current", project: "atlas-architecture", versionName: "current" },
    { contentPath: "arch/v20260330", project: "atlas-architecture", versionName: "v20260330" },
  ];
  assert.deepEqual(
    filterActivePaths(scanned, CATALOG).map((p) => p.contentPath),
    ["atlas", "manual/v8.0", "arch/current"],
  );
});

test("filterActivePaths drops a docset with no active version", () => {
  const scanned = [{ contentPath: "bi-connector/current", project: "bi-connector", versionName: "current" }];
  assert.deepEqual(filterActivePaths(scanned, CATALOG), []);
});

test("filterActivePaths drops content paths with no catalog entry", () => {
  const scanned = [{ contentPath: "unknown", project: "unknown", versionName: null }];
  assert.deepEqual(filterActivePaths(scanned, CATALOG), []);
});

test("mapChangedFilesToContentPaths picks the deepest matching content path", () => {
  const contentPaths = ["atlas", "manual/v8.0", "voyageai"];
  const changed = [
    "content/manual/v8.0/source/reference/foo.txt",
    "content/atlas/source/index.txt",
    "content/voyageai/snooty.toml",
    "platform/snooty-ast-to-mdx/src/main.ts",
    "content/table-of-contents/toc.ts",
    "content/manual/v8.0/source/index.txt",
  ];
  assert.deepEqual(
    mapChangedFilesToContentPaths(changed, contentPaths),
    ["atlas", "manual/v8.0", "voyageai"],
  );
});

test("detectContentPaths full mode returns every active path", () => {
  const contentDir = makeContentDir({
    atlas: "cloud-docs",
    "manual/v8.0": "docs",
    "manual/v4.4": "docs",
    "arch/v20260330": "atlas-architecture",
  });
  assert.deepEqual(
    detectContentPaths({ contentDir, catalog: CATALOG, changedFiles: [], mode: "full" }),
    ["atlas", "manual/v8.0"],
  );
});

test("detectContentPaths incremental mode returns only changed active paths", () => {
  const contentDir = makeContentDir({
    atlas: "cloud-docs",
    "manual/v8.0": "docs",
    "manual/v4.4": "docs",
  });
  assert.deepEqual(
    detectContentPaths({
      contentDir,
      catalog: CATALOG,
      changedFiles: ["content/manual/v4.4/source/index.txt"],
      mode: "incremental",
    }),
    [],
  );
  assert.deepEqual(
    detectContentPaths({
      contentDir,
      catalog: CATALOG,
      changedFiles: ["content/manual/v8.0/source/index.txt"],
      mode: "incremental",
    }),
    ["manual/v8.0"],
  );
});
