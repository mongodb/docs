#!/usr/bin/env python3
"""Resolve a published MongoDB docs URL to its RST source file in content/.

Every candidate is verified against the filesystem before it is reported, so a
`resolved` result means the file exists. Ambiguous or unresolvable URLs are
reported as such rather than guessed at -- the caller must ask a human.

Why this is not a one-liner. CLAUDE.md documents the URL shape for the manual
and Atlas only. Beyond those, the mapping needs: legacy and moved URLs followed
through the repo's own redirect data; two-segment prefixes collapsed onto one
hyphenated directory (/docs/atlas/cli/ -> content/atlas-cli/); nested products
kept at top level (/docs/drivers/node/ -> content/node/); version aliases in the
URL reconciled against version directories; EOL versions excluded; and pages that
are a directory's index.txt handled. Each of those was a real miss found while
testing against live ticket URLs.

Scope and known limits:

* Pages only -- this does NOT traverse includes. A ticket's target text often
  lives in an `.. include::` file or a YAML extract under source/includes/, and
  that file may be shared by several pages. After resolving the page, grep the
  target string across the project's source/includes/ before editing.
* Redirects are read from the docs-site and docs-nextjs JSON files, not from
  netlify.toml. Measured on Atlas, the JSON covers 721 of 724 concrete
  netlify.toml redirect sources (99.6%), because add-redirects keeps both in
  sync; parsing TOML as well was not judged worth the dependency. If a legacy
  URL ever fails to resolve, an unsynced netlify.toml entry is a candidate cause.
* Generated reference pages (e.g. Atlas API spec pages under
  reference/api-resources-spec/) have no authored source and are reported
  unresolved with the directory named.

Usage:
    resolve_url.py <url> [<url> ...]
    resolve_url.py --json <url> [<url> ...]
    resolve_url.py --self-test
"""

import argparse
import json
import os
import re
import sys
from urllib.parse import unquote, urlparse

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))
CONTENT = os.path.join(REPO_ROOT, "content")

# The database manual is the one project whose URL segment does not match its
# content/ directory: content/manual/<version>/source/ serves at /docs/<alias>/.
MANUAL_URL_SEGMENT_TO_DIR = {
    "manual": "manual",
    "upcoming": "upcoming",
}
MANUAL_VERSION_RE = re.compile(r"^v\d+\.\d+$")

# Directory names under content/ that are not published docs projects.
NON_PROJECT_DIRS = {"code-examples", "shared", "table-of-contents", "404"}

# URL segments that name a version alias rather than a path component. An
# unversioned project ignores them; a versioned project resolves them to a
# version directory.
VERSION_ALIAS_RE = re.compile(r"^(current|upcoming|stable|master|v[\d.]+)$")

REDIRECT_GLOB_DIRS = (
    os.path.join(REPO_ROOT, "platform", "docs-site", "src", "redirects"),
    os.path.join(REPO_ROOT, "platform", "docs-nextjs", "src", "redirects"),
)


def normalize(url):
    """Strip domain, /docs/ prefix, anchor, query, and extension.

    Returns the docs-relative path segments, e.g.
    'https://www.mongodb.com/docs/atlas/security-vpc-peering/#foo'
        -> ['atlas', 'security-vpc-peering']
    """
    text = url.strip()
    if "://" not in text:
        # Bare input: a leading segment containing a dot is a hostname
        # ('docs.mongodb.com/atlas/x'); anything else is already a path
        # ('/docs/atlas/x' or 'atlas/x'). Only add a scheme in the first case,
        # otherwise urlparse would read the first path segment as the host.
        first = text.lstrip("/").split("/", 1)[0]
        text = ("https://" + text.lstrip("/")) if "." in first else ("///" + text.lstrip("/"))
    path = unquote(urlparse(text).path)
    # Legacy docs.mongodb.com URLs omit the /docs/ prefix.
    segments = [s for s in path.split("/") if s]
    if segments and segments[0] == "docs":
        segments = segments[1:]
    if segments and segments[-1] in ("index.html", "index"):
        segments = segments[:-1]
    if segments:
        segments[-1] = re.sub(r"\.(html?|txt)$", "", segments[-1])
    return segments


def source_dirs_for_project(project_dir):
    """Return [(label, absolute source dir)] for a content/ project directory.

    Unversioned projects have a single source/ at the project root. Versioned
    projects have one per version directory; EOL versions are excluded because
    the repo rules forbid editing them.
    """
    root = os.path.join(CONTENT, project_dir)
    direct = os.path.join(root, "source")
    if os.path.isdir(direct):
        return [("", direct)]

    results = []
    if not os.path.isdir(root):
        return results
    for version in sorted(os.listdir(root)):
        vsource = os.path.join(root, version, "source")
        if not os.path.isdir(vsource):
            continue
        if is_eol(os.path.join(root, version, "snooty.toml")):
            continue
        results.append((version, vsource))
    return results


def is_eol(snooty_path):
    if not os.path.isfile(snooty_path):
        return False
    try:
        with open(snooty_path, encoding="utf-8", errors="replace") as handle:
            for line in handle:
                stripped = line.strip().replace(" ", "")
                if stripped.startswith("eol=") and "true" in stripped.lower():
                    return True
    except OSError:
        return False
    return False


def page_candidates(source_dir, rel_segments):
    """A docs page may be a flat .txt or a directory's index.txt."""
    if not rel_segments:
        rel_segments = ["index"]
    rel = os.path.join(*rel_segments)
    out = []
    for candidate in (rel + ".txt", os.path.join(rel, "index.txt")):
        full = os.path.join(source_dir, candidate)
        if os.path.isfile(full):
            out.append(full)
    return out


def resolve_manual(segments):
    """Handle /docs/manual/, /docs/upcoming/, /docs/v8.0/ -> content/manual/<dir>/."""
    head = segments[0]
    version_dir = MANUAL_URL_SEGMENT_TO_DIR.get(head)
    if version_dir is None and MANUAL_VERSION_RE.match(head):
        version_dir = head
    if version_dir is None:
        return []
    source_dir = os.path.join(CONTENT, "manual", version_dir, "source")
    if not os.path.isdir(source_dir):
        return []
    if is_eol(os.path.join(CONTENT, "manual", version_dir, "snooty.toml")):
        return []
    return page_candidates(source_dir, segments[1:])


_redirect_cache = None


def load_redirects():
    """Build {source path -> destination path} from the repo's redirect data.

    These files are the authoritative record of legacy URL shapes, so following
    them lets an old ticket URL resolve without hardcoding project aliases.
    Entries are stored as docs-relative segment strings, matching normalize().
    """
    global _redirect_cache
    if _redirect_cache is not None:
        return _redirect_cache

    exact, prefixes = {}, []
    for directory in REDIRECT_GLOB_DIRS:
        if not os.path.isdir(directory):
            continue
        for name in sorted(os.listdir(directory)):
            if not name.endswith("-redirects.json") or name.startswith("all-"):
                continue
            try:
                with open(os.path.join(directory, name), encoding="utf-8") as handle:
                    entries = json.load(handle)
            except (OSError, ValueError):
                continue
            if not isinstance(entries, list):
                continue
            for entry in entries:
                if not isinstance(entry, dict):
                    continue
                src, dest = entry.get("source"), entry.get("destination")
                if not isinstance(src, str) or not isinstance(dest, str):
                    continue
                # Skip parameterised destinations -- we cannot substitute them
                # reliably, and a wrong substitution is worse than no match.
                if ":" in dest:
                    continue
                dest_key = "/".join(normalize(dest))
                if src.endswith("/*") or src.endswith("/:path*"):
                    base = src.split("/*")[0].split("/:path*")[0]
                    prefixes.append(("/".join(normalize(base)), dest_key))
                elif ":" not in src:
                    exact["/".join(normalize(src))] = dest_key

    prefixes.sort(key=lambda pair: len(pair[0]), reverse=True)
    _redirect_cache = (exact, prefixes)
    return _redirect_cache


def follow_redirect(path_key):
    """Return the redirect destination for a docs path, or None."""
    exact, prefixes = load_redirects()
    if path_key in exact:
        return exact[path_key]
    for base, dest in prefixes:
        if base and (path_key == base or path_key.startswith(base + "/")):
            remainder = path_key[len(base):].lstrip("/")
            return (dest + "/" + remainder).rstrip("/") if remainder else dest
    return None


def try_project(project, rel_segments):
    """Look for a page under content/<project>/, honoring a version alias.

    Returns (hits, note). A URL may carry a version alias segment
    (/docs/<project>/current/<page>): for a versioned project it selects the
    matching version directory, and for an unversioned one it is decorative
    and drops out. Applied for every project shape so nested products such as
    /docs/drivers/node/current/<page> behave the same as top-level ones.
    """
    if project in NON_PROJECT_DIRS or not os.path.isdir(os.path.join(CONTENT, project)):
        return [], ""

    source_dirs = source_dirs_for_project(project)
    hits = []
    for _label, source_dir in source_dirs:
        hits.extend(page_candidates(source_dir, rel_segments))
    if hits:
        return hits, ""

    if rel_segments and VERSION_ALIAS_RE.match(rel_segments[0]):
        alias, tail = rel_segments[0], rel_segments[1:]
        for label, source_dir in source_dirs:
            if label in ("", alias):
                hits.extend(page_candidates(source_dir, tail))
        if hits:
            return hits, ", version alias '%s'" % alias

    return [], ""


def is_docs_url(url):
    """False for a mongodb.com URL that is not under /docs/.

    Tickets sometimes cite marketing pages such as
    mongodb.com/resources/basics/backup-and-restore. Those are not docs pages,
    and letting them fall through to the basename search produces misleading
    candidates.
    """
    text = url.strip()
    if "://" not in text:
        first = text.lstrip("/").split("/", 1)[0]
        if "." not in first:
            return True  # a bare path, already docs-relative
        text = "https://" + text.lstrip("/")
    parsed = urlparse(text)
    host, path = parsed.netloc.lower(), parsed.path
    if not host:
        return True
    if host.startswith("docs."):
        return True
    return path.startswith("/docs/") or path == "/docs"


def resolve(url, _via_redirect=False):
    """Resolve one URL. Returns a dict with a `status` of resolved/ambiguous/unresolved."""
    segments = normalize(url)
    result = {"url": url, "path": "/".join(segments)}
    if not segments:
        result.update(status="unresolved", reason="no path segments in URL")
        return result
    if not is_docs_url(url):
        result.update(status="unresolved", reason="not a docs page (no /docs/ path segment)")
        return result

    hits = resolve_manual(segments)
    if hits:
        return finish(result, hits, "manual version alias")

    slug, rest = segments[0], segments[1:]

    # Try each way a URL prefix can name a content/ project, most specific
    # first. Every candidate is checked against the filesystem, so a wrong
    # guess simply produces no hits and falls through to the next.
    candidates = [
        # The common case: /docs/atlas/<page> -> content/atlas/.
        (slug, rest, "project slug matches content/ directory"),
    ]
    if rest:
        # A two-segment prefix can name one hyphenated directory:
        # /docs/atlas/cli/... -> content/atlas-cli/,
        # /docs/atlas/architecture/... -> content/atlas-architecture/.
        candidates.append(
            (
                "%s-%s" % (slug, rest[0]),
                rest[1:],
                "compound slug '%s/%s' -> content/%s-%s" % (slug, rest[0], slug, rest[0]),
            )
        )
        # A nested product keeps its own top-level directory:
        # /docs/drivers/node/... -> content/node/.
        candidates.append((rest[0], rest[1:], "nested product slug '%s'" % rest[0]))

    for project, rel_segments, how in candidates:
        hits, note = try_project(project, rel_segments)
        if hits:
            return finish(result, hits, how + note)

    # The URL may be a legacy shape. Follow the repo's own redirect data once
    # and retry; the guard stops a redirect loop from recursing.
    if not _via_redirect:
        destination = follow_redirect("/".join(segments))
        if destination and destination != "/".join(segments):
            followed = resolve(destination, _via_redirect=True)
            if followed["status"] == "resolved":
                result.update(
                    status="resolved",
                    file=followed["file"],
                    matched_by="followed repo redirect to /%s/" % destination,
                )
                return result

    # A URL can name a directory that has no index page of its own.
    if rest:
        directory = os.path.join(CONTENT, slug, "source", *rest)
        if os.path.isdir(directory):
            result.update(
                status="unresolved",
                reason="URL maps to directory %s, which has no index.txt" % rel(directory),
            )
            return result

    # Last resort: the page basename may have moved between projects. Report
    # every filesystem match but never auto-pick one.
    hits = search_by_basename(segments[-1])
    if hits:
        live = [h for h in hits if not in_eol_version(h)]
        if not live:
            # Every match is in an EOL version directory, which the repo
            # forbids editing. Offering these as candidates would invite a
            # change that must not be made.
            result.update(
                status="ambiguous",
                reason="basename '%s' exists only in EOL version directories, "
                "which must not be edited" % segments[-1],
                candidates=[rel(h) for h in hits],
            )
            return result
        result.update(
            status="ambiguous",
            reason="no slug/path match; found %d non-EOL file(s) with basename '%s'"
            % (len(live), segments[-1]),
            candidates=[rel(h) for h in live],
        )
        return result

    result.update(status="unresolved", reason="no file matches this URL path")
    return result


def in_eol_version(path):
    """True if a source file sits inside a version directory marked eol."""
    current = os.path.dirname(os.path.abspath(path))
    while current.startswith(CONTENT) and current != CONTENT:
        if is_eol(os.path.join(current, "snooty.toml")):
            return True
        current = os.path.dirname(current)
    return False


def search_by_basename(basename, limit=25):
    target = basename + ".txt"
    hits = []
    for dirpath, dirnames, filenames in os.walk(CONTENT):
        dirnames[:] = [d for d in dirnames if d not in ("images", "node_modules")]
        if target in filenames:
            hits.append(os.path.join(dirpath, target))
            if len(hits) >= limit:
                break
    return hits


def finish(result, hits, how):
    unique = sorted(set(hits))
    if len(unique) == 1:
        published = rel(unique[0])
        edit_path, note = edit_target_for(published)
        result.update(status="resolved", file=published, matched_by=how, edit_target=edit_path)
        if note:
            result["edit_target_note"] = note
    else:
        result.update(
            status="ambiguous",
            reason="URL maps to %d source files (likely multiple versions)" % len(unique),
            candidates=[rel(h) for h in unique],
            matched_by=how,
        )
    return result


def rel(path):
    return os.path.relpath(path, REPO_ROOT)


def edit_target_for(resolved_rel_path):
    """Return (edit_path, note) for a resolved published page.

    A URL always names the *published* page, but CLAUDE.md requires the edit to
    land in a docset's `upcoming/` version when it has one, treating the
    ticket's fixVersion as the oldest backport target. So the file the URL
    resolves to is not always the file to edit. Returns the same path with an
    empty note when the docset is unversioned or already has no upcoming.
    """
    parts = resolved_rel_path.split(os.sep)
    if len(parts) < 4 or parts[0] != "content":
        return resolved_rel_path, ""
    project, version = parts[1], parts[2]
    if version == "source":
        return resolved_rel_path, ""  # unversioned project

    upcoming = os.path.join(CONTENT, project, "upcoming")
    if not os.path.isdir(upcoming) or version == "upcoming":
        return resolved_rel_path, ""

    candidate = os.path.join(*([REPO_ROOT, "content", project, "upcoming"] + parts[3:]))
    if not os.path.isfile(candidate):
        return resolved_rel_path, (
            "docset has upcoming/ but no matching file there; confirm the target with the writer"
        )
    return rel(candidate), (
        "CLAUDE.md default is to edit upcoming/ and treat fixVersion as the oldest "
        "backport target, but writers do not always follow it for these tickets -- "
        "CONFIRM the version target with the writer before editing"
    )


# (url, expected status, expected file or None). Every expectation below was
# checked against the working tree, including the deliberate negatives.
SELF_TESTS = [
    (
        "https://www.mongodb.com/docs/atlas/security-vpc-peering/",
        "resolved",
        "content/atlas/source/security-vpc-peering.txt",
    ),
    (
        "https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/",
        "resolved",
        "content/manual/manual/source/reference/operator/aggregation/group.txt",
    ),
    (
        "https://www.mongodb.com/docs/atlas/online-archive/manage-online-archive/",
        "resolved",
        "content/atlas/source/online-archive/manage-online-archive.txt",
    ),
    # Version alias on an unversioned project, plus directory index page.
    ("https://www.mongodb.com/docs/compass/current/", "resolved", "content/compass/source/index.txt"),
    # Anchors and query strings must be stripped.
    (
        "https://www.mongodb.com/docs/search/query/score/modify-score/#examples",
        "resolved",
        "content/search/source/query/score/modify-score.txt",
    ),
    # Legacy URL that only resolves by following the repo's redirect data.
    (
        "https://www.mongodb.com/docs/atlas/atlas-stream-processing/kafka-private-link-connection/",
        "resolved",
        "content/atlas/source/atlas-stream-processing/kafka-private-connection.txt",
    ),
    # Legacy docs.mongodb.com host, no /docs/ prefix.
    (
        "https://docs.mongodb.com/atlas/security-vpc-peering/",
        "resolved",
        "content/atlas/source/security-vpc-peering.txt",
    ),
    # Two-segment URL prefix naming one hyphenated content/ directory.
    (
        "https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/",
        "resolved",
        "content/atlas-cli/current/source/atlas-cli-deploy-local.txt",
    ),
    (
        "https://www.mongodb.com/docs/atlas/architecture/current/backups/",
        "resolved",
        "content/atlas-architecture/current/source/backups.txt",
    ),
    # Nested product carrying a version alias.
    (
        "https://www.mongodb.com/docs/drivers/node/current/crud/bulk-write/",
        "resolved",
        "content/node/current/source/crud/bulk-write.txt",
    ),
    # Deliberate negatives: must not be guessed at.
    ("https://www.mongodb.com/docs/atlas/reference/api-resources-spec/", "unresolved", None),
    ("https://www.mongodb.com/docs/nonexistent-project/nope/", "unresolved", None),
    # A generated OpenAPI reference page has no RST source.
    (
        "https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/operation/"
        "operation-listcontrolplaneipaddresses",
        "unresolved",
        None,
    ),
    # Not a docs page at all -- must not fall through to a basename search.
    ("https://www.mongodb.com/resources/basics/backup-and-restore", "unresolved", None),
    # Page exists only in EOL manual versions, which are excluded by policy.
    ("https://www.mongodb.com/docs/manual/reference/method/js-bulk/", "ambiguous", None),
]


# (url, expected edit_target). A URL names the published page; these confirm the
# skill is redirected to the version directory the repo requires editing. Both
# were checked against where the real merged fix actually landed.
EDIT_TARGET_TESTS = [
    (
        "https://www.mongodb.com/docs/manual/reference/command/compact/",
        "content/manual/upcoming/source/reference/command/compact.txt",
    ),
    (
        "https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/",
        "content/manual/upcoming/source/reference/method/db.collection.insertMany.txt",
    ),
    # Unversioned docset: edit target is the resolved file itself.
    ("https://www.mongodb.com/docs/atlas/billing/", "content/atlas/source/billing.txt"),
]


def run_self_test():
    failures = 0
    for url, want_target in EDIT_TARGET_TESTS:
        got = resolve(url).get("edit_target")
        ok = got == want_target
        print("%-4s edit_target %s" % ("PASS" if ok else "FAIL", url))
        if not ok:
            failures += 1
            print("       expected %s" % want_target)
            print("       got      %s" % got)
    for url, want_status, want_file in SELF_TESTS:
        got = resolve(url)
        ok = got["status"] == want_status and (want_file is None or got.get("file") == want_file)
        print("%-4s %-10s %s" % ("PASS" if ok else "FAIL", got["status"], url))
        if not ok:
            failures += 1
            print("       expected %s %s" % (want_status, want_file or ""))
            print("       got      %s %s" % (got["status"], got.get("file") or got.get("reason")))
    print("\n%d/%d passed" % (len(SELF_TESTS) + len(EDIT_TARGET_TESTS) - failures, len(SELF_TESTS) + len(EDIT_TARGET_TESTS)))
    return 1 if failures else 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("urls", nargs="*")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    parser.add_argument("--self-test", action="store_true", help="verify the resolver")
    args = parser.parse_args()

    if args.self_test:
        return run_self_test()
    if not args.urls:
        parser.error("provide at least one URL, or --self-test")

    results = [resolve(u) for u in args.urls]
    if args.json:
        print(json.dumps(results, indent=2))
    else:
        for r in results:
            print("%-10s %s" % (r["status"].upper(), r["url"]))
            if r["status"] == "resolved":
                print("           -> %s  (%s)" % (r["file"], r["matched_by"]))
                if r.get("edit_target") and r["edit_target"] != r["file"]:
                    print("           EDIT %s" % r["edit_target"])
                if r.get("edit_target_note"):
                    print("           !  %s" % r["edit_target_note"])
            else:
                print("           %s" % r["reason"])
                for c in r.get("candidates", []):
                    print("           ?  %s" % c)

    return 0 if all(r["status"] == "resolved" for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
