"""
sage_prep.py — prepares a slack-request DOCSP ticket for sage-bot-beta.

Reads a thin Jira ticket created by JIP Quick Create, rewrites it into a
sage-ready brief, resolves target file paths via GitHub search, sets the
assignee to the reacting user, and applies the two sage-bot-beta labels in
the required order.

Required env vars:
  ISSUE_KEY         - e.g. DOCSP-61382
  JIRA_BASE_URL     - repo secret JIRA_BASE_URL
  JIRA_API_TOKEN    - repo secret JIRA_API_TOKEN
  GROVE_SAGE_PREP_API_KEY - repo secret; Grove gateway key for this service
  GITHUB_TOKEN      - provided automatically by Actions
"""

import base64
import os
import re
import time
import json
import requests
import anthropic

REPO = "10gen/docs-mongodb-internal"
# Tolerate a trailing slash in the secret: "https://host/" + "/rest/api/2" would
# otherwise produce a double slash, which Jira answers with a 404.
JIRA_BASE = os.environ["JIRA_BASE_URL"].rstrip("/")
ISSUE_KEY = os.environ["ISSUE_KEY"]
PROJECT_KEY = ISSUE_KEY.split("-")[0]

# Grove is MongoDB's internal LLM gateway. Its Anthropic endpoint is
# API-compatible with the anthropic SDK: the SDK appends "/v1/messages" to
# the base URL, so GROVE_ANTHROPIC_BASE_URL must NOT include a "/v1" suffix.
# Grove authenticates with an "api-key" header rather than the SDK default.
GROVE_ANTHROPIC_BASE_URL = (
    "https://grove-gateway-prod.azure-api.net/grove-foundry-prod/anthropic"
)

jira_headers = {
    "Authorization": f"Bearer {os.environ['JIRA_API_TOKEN']}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

github_headers = {
    "Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


TIMEOUT = 15


def jira_get(path):
    r = requests.get(f"{JIRA_BASE}/rest/api/2{path}", headers=jira_headers, timeout=TIMEOUT)
    r.raise_for_status()
    return r.json()


def jira_put(path, body):
    r = requests.put(
        f"{JIRA_BASE}/rest/api/2{path}",
        headers=jira_headers,
        json=body,
        timeout=TIMEOUT,
    )
    r.raise_for_status()


# Versioned copies of a page live alongside the current one (content/manual/v6.0/...).
# A docs fix almost always belongs in the unversioned/current file, so prefer those.
VERSIONED_PATH_RE = re.compile(r"/v\d+\.\d+/")

# EOL versions must never be edited. This check is deliberately scoped to the
# database manual: the pre-7.0 cutoff is a *server* version boundary, and a
# driver docset's "v1.12" is a current driver version, not an EOL server one.
MANUAL_VERSION_RE = re.compile(r"^content/manual/v(\d+)\.(\d+)/")
OLDEST_SUPPORTED_MANUAL = (7, 0)


def is_eol_path(path):
    """True if path is in an end-of-life database manual version directory."""
    match = MANUAL_VERSION_RE.match(path or "")
    if not match:
        return False
    return (int(match.group(1)), int(match.group(2))) < OLDEST_SUPPORTED_MANUAL


def search_repo_files(query, max_results=5):
    """Return candidate file paths in the docs repo matching the query.

    Failures are logged rather than swallowed: an empty result and a rejected
    query are very different problems and used to look identical from outside.
    """
    if not (query or "").strip():
        print("  No usable search terms; skipping code search.")
        return []

    params = {
        "q": f"{query} repo:{REPO}",
        # Over-fetch so the current-version preference below has something to
        # choose from; versioned duplicates otherwise fill the whole page.
        "per_page": max_results * 4,
    }
    r = requests.get(
        "https://api.github.com/search/code",
        headers=github_headers,
        params=params,
        timeout=TIMEOUT,
    )
    if r.status_code != 200:
        print(f"  Code search failed (HTTP {r.status_code}): {r.text[:200]}")
        return []

    paths = [item["path"] for item in r.json().get("items", [])]
    if not paths:
        print(f"  Code search matched nothing for query: {query!r}")
        return []

    # Drop EOL candidates before the model ever sees them; a path it is shown is
    # a path it may name.
    paths = [p for p in paths if not is_eol_path(p)]
    if not paths:
        print(f"  Code search matched only EOL paths for query: {query!r}")
        return []

    # Stable sort: current-version paths first, original relevance order within.
    paths.sort(key=lambda p: bool(VERSIONED_PATH_RE.search(p)))
    return paths[:max_results]


_contents_cache = {}


def _fetch_contents(path):
    """GET path via the GitHub Contents API. Cached for the run, so a path
    fetched for its content (a search candidate) and later checked for
    existence (a target file) only costs one request when it's the same path.

    Only 200/404 are cached: a rate-limit or other transient status isn't
    evidence of anything, so a later call for the same path gets another
    chance at a conclusive answer instead of being stuck with whatever the
    transient failure produced.

    Returns (status_code, decoded_content_or_None).
    """
    if path in _contents_cache:
        return _contents_cache[path]
    r = requests.get(
        f"https://api.github.com/repos/{REPO}/contents/{path}",
        headers=github_headers,
        timeout=TIMEOUT,
    )
    content = None
    if r.status_code == 200:
        encoded = r.json().get("content", "")
        content = base64.b64decode(encoded).decode("utf-8", errors="replace")
    if r.status_code in (200, 404):
        _contents_cache[path] = (r.status_code, content)
    return r.status_code, content


def fetch_file_content(path, max_chars=8000):
    """Fetch raw file content from the default branch via GitHub API."""
    _, content = _fetch_contents(path)
    return content[:max_chars] if content is not None else None


def repo_path_exists(path):
    """True if path exists on the repo's default branch.

    A rate limit or permissions error is not evidence of absence, so an
    inconclusive answer keeps the path rather than deleting a valid one.
    """
    status, _ = _fetch_contents(path)
    if status not in (200, 404):
        print(f"  Path check inconclusive for {path} (HTTP {status}); keeping it.")
        return True
    return status == 200


def validate_target_files(paths):
    """Keep only paths that exist in the repo and are not EOL.

    The model is told to name only confirmed paths, but a hallucinated path in
    this list is handed straight to the coding agent as fact, so verify rather
    than trust.
    """
    kept = []
    for raw in paths:
        path = (raw or "").strip().lstrip("/")
        if not path:
            continue
        if is_eol_path(path):
            print(f"  Dropping EOL target file: {path}")
            continue
        if not repo_path_exists(path):
            print(f"  Dropping target file not found in {REPO}: {path}")
            continue
        kept.append(path)
    return kept


URL_RE = re.compile(r"https?://\S+")

# Repo-style paths named in prose: rooted at a known top-level directory, or
# carrying a docs-repo file extension with at least one real path separator.
# The extension alternative requires a "/" so a bare filename mentioned in
# prose without its directory ("the b.rst file", "connection-string.txt")
# isn't checked as if it were a repo-root-relative path — it almost never is,
# and that mismatch was flagging real, existing, merely-nested files as
# hallucinated. URLs are stripped before matching so a docs URL's path
# segments don't read as a file path.
PROSE_PATH_ROOTED_RE = re.compile(
    r"(?<![\w/.-])(?:"
    r"(?:content|platform|source|includes)/[\w./-]+"
    r"|(?:[\w-]+/)+[\w.-]+\.(?:txt|rst|ya?ml|json|toml)\b"
    r")"
)

# A bare slash-separated pair, with neither a real root nor an extension —
# this is what catches an invented path like "raptor/redirects". But that
# shape is indistinguishable from ordinary English ("icon/type", "link/text",
# "paragraph/section"), and a fixed allowlist can never keep up with every
# legitimate compound phrase a model might write. So only apply this
# alternative when the description also uses language that signals it's
# naming a mechanism/config location in the first place — that co-occurrence,
# not the slash shape alone, is the actual signal.
# The leading lookbehind is required: without it this matches from inside a
# word, turning "Enable/disable" into a "nable/disable" path.
PROSE_PATH_GENERIC_RE = re.compile(r"(?<![\w/.-])[A-Za-z][A-Za-z\d-]*(?:/[A-Za-z\d-]+)+")
MECHANISM_SIGNAL_RE = re.compile(
    r"config(?:uration)?|redirect|alias(?:es)?|\bmapping\b|netlify|htaccess", re.I
)

# Slash pairs that are English, not paths — kept as a second line of defense
# even with the mechanism-signal gate above.
PROSE_PATH_ALLOWLIST = {
    "and/or", "read/write", "input/output", "on/off", "yes/no", "true/false",
    "either/or", "he/she", "she/her", "he/him", "they/them", "km/h", "n/a",
    "client/server", "key/value", "pass/fail", "before/after", "add/remove",
    "enable/disable", "start/stop", "create/update", "read/only",
}


def unverified_prose_paths(text):
    """Return repo-style paths named in the description that don't check out.

    Reported, not edited: rewriting generated prose risks mangling it, and a
    named-but-nonexistent file is also a signal the description is prescribing
    mechanics it was told to leave alone.
    """
    stripped = URL_RE.sub(" ", text or "")
    found = {m.group(0).rstrip(".,;:)") for m in PROSE_PATH_ROOTED_RE.finditer(stripped)}
    if MECHANISM_SIGNAL_RE.search(stripped):
        found |= {
            m.group(0).rstrip(".,;:)") for m in PROSE_PATH_GENERIC_RE.finditer(stripped)
        }
    found = {p for p in found if p.lower() not in PROSE_PATH_ALLOWLIST}
    return sorted(p for p in found if is_eol_path(p) or not repo_path_exists(p))


DOCS_URL_RE = re.compile(r"https?://(?:www\.)?mongodb\.com/docs/([^\s\)\]|>]+)")

STOP_WORDS = {
    "typo", "on", "the", "a", "an", "page", "there", "is", "has", "fix",
    "update", "wrong", "error", "issue", "problem", "in", "of", "i", "noticed",
    "this", "that", "s", "it", "to", "and", "for", "we", "should", "docs", "doc",
    "please", "can", "could", "would", "when", "why", "but", "or", "be", "are",
    "was", "were", "because", "seems", "looks", "think", "maybe",
}

# GitHub code search ANDs every term, so each extra word shrinks the result set.
# A full ticket summary reliably matches nothing at all; a few nouns match well.
MAX_SEARCH_TERMS = 4


def docs_url_slug(text):
    """Return the page slug from the first mongodb.com/docs URL in text, if any."""
    match = DOCS_URL_RE.search(text or "")
    if not match:
        return None
    segments = [s for s in match.group(1).strip("/").split("/") if s]
    return segments[-1] if segments else None


def build_search_query(summary, description):
    """Build a GitHub code search query for the page this ticket is about.

    Prefers the docs URL: source files are named after the page slug, so a
    filename search on it is far more precise than free-text matching. Falls
    back to a few sanitized keywords when the ticket has no URL.
    """
    # The URL is usually in the description (JIP captures the Slack message
    # body), which is why searching the summary alone found so little.
    slug = docs_url_slug(description) or docs_url_slug(summary)
    if slug:
        return f"filename:{slug}"

    # Punctuation must go before anything else: code search reads "tutorial:" as
    # a qualifier and a stray quote as a phrase delimiter, either of which
    # silently returns zero results.
    cleaned = re.sub(r"[^a-z0-9\-\s]", " ", (summary or "").lower())
    terms = [w for w in cleaned.split() if w and w not in STOP_WORDS]
    if not terms:
        return re.sub(r"[^a-z0-9\-\s]", " ", (summary or "").lower()).strip()
    return " ".join(terms[:MAX_SEARCH_TERMS])


def enrich(summary, description, guidance=None):
    """Call Claude to produce a sage-ready brief and candidate file paths.

    `guidance` is human text — prior writer guidance and ticket comments — that
    outranks both the raw message and the model's own inference.
    """
    client = anthropic.Anthropic(
        base_url=GROVE_ANTHROPIC_BASE_URL,
        api_key="unused",  # SDK requires a value; Grove reads the api-key header
        default_headers={"api-key": os.environ["GROVE_SAGE_PREP_API_KEY"]},
    )

    search_query = build_search_query(summary, description)
    print(f"  Search query: {search_query}")
    candidate_files = search_repo_files(search_query)

    # Fetch content of top candidate files to ground the description
    file_excerpts = []
    for path in candidate_files[:2]:
        content = fetch_file_content(path)
        if content:
            file_excerpts.append(f"### {path}\n{content}")

    file_hint = (
        "\n".join(candidate_files)
        if candidate_files
        else "No candidate files found via search."
    )
    file_content_block = (
        "\n\n".join(file_excerpts)
        if file_excerpts
        else "No file content available."
    )
    guidance_block = guidance or "None. Nobody has commented on this ticket yet."

    prompt = f"""You are a MongoDB docs triage agent. A MongoDB employee reacted to a Slack \
message with an emoji to file a docs update request. The raw message has been transposed into \
a Jira ticket. Your job is to rewrite it into a clear, actionable brief for an AI coding agent \
that will open a GitHub PR against the MongoDB documentation repo.

That agent works inside the repo and already knows its conventions and tooling. Your job is to \
define the problem precisely, not to solve it. It has context you do not have; a solution \
prescribed from out here is the single most likely thing to send it in the wrong direction.

Raw ticket summary: {summary}
Raw ticket description: {description}

## Human guidance (highest authority)
{guidance_block}

This is what actual people said about this ticket: the requester, or a writer who
reviewed it. It outranks the raw message, the file content below, and anything you
would otherwise conclude on your own. If it contradicts the raw message, the humans
are right and the raw message is stale. If it names an approach, treat that approach
as decided and do not argue with it, soften it, or offer an alternative. Never
produce a description whose instructions conflict with this section.

Candidate file paths found via repo search:
{file_hint}

Content of top candidate files (use this to confirm the problem is real and to quote the \
current wording accurately):
{file_content_block}

## Repository conventions
These are facts about this repo. Do not contradict them, and do not substitute a
guess for them.

How pages and URLs work:
- A page's public URL derives from the path of its source .txt file under
  content/<project>/[<version>/]source/. Changing a page's URL therefore means
  renaming or moving that .txt file. A redirect alone never changes a page's URL.
- Redirects keep a retired URL working. They always point FROM the old or
  removed path TO the new or canonical path, never the reverse. If a slug is
  misspelled, the fix is to rename the file to the correct slug and redirect the
  old misspelled slug to it — never to point the correct slug at the wrong one.
- Redirects live in more than one place depending on the project's build type,
  and a dedicated agent skill already knows which files to edit. Never name a
  redirect file, config file, or directory in the description.
- Pages are .txt. Reusable includes are .rst. An include path ending in
  includes/extracts/<name>.rst is not a file: it resolves to a "ref: <name>"
  entry inside a YAML file under source/includes/. Do not describe such a path
  as a file to edit.

Which version to target:
- Most projects are versioned, with one directory per version under
  content/<project>/. If the project has an "upcoming" directory, the edit
  belongs there. Otherwise it belongs in the unversioned or current directory.
- Never name a path in an end-of-life version directory (anything before v7.0,
  such as v4.4, v5.0, or v6.0). Those versions are not maintained.
- Never ask for a backport to other version directories.

Scope and precision:
- Only name file paths that appear in the candidate list or file content above.
  Do not construct a path from a URL, and do not invent one. If you cannot
  confirm a path, say which page is affected in prose and leave target_files
  empty.
- Do not invent a cross-reference label, anchor, or ref name.
- Do not add a constraint the source message did not ask for. In particular, do
  not instruct the agent to preserve existing wrong content, URLs, or behavior
  "to avoid breaking links" unless the message explicitly asks for that.
- Do not enumerate mechanical follow-up work such as adding redirects or
  updating the table of contents. The repo's own agent instructions cover those,
  and a partial list reads as an exhaustive one.

## Unactionable ticket check
If the message is too vague to act on (e.g. no product, page, or change identified), return:
{{"unactionable": true, "reason": "<one sentence explaining why>"}}
Do not produce the full output below for unactionable tickets.

## Request classification
Classify the request as one of:
- "bug"      — something is wrong or inaccurate in the docs
- "request"  — a stakeholder or user is asking for new or additional content
- "feature"  — documenting a new product feature or behavior change
- "proactive" — an internally-identified improvement with no external driver

## URL extraction
If the message contains an explicit mongodb.com/docs/ URL, extract it and use it to confirm \
the target page. Do not construct or guess URLs.

## Output
Produce a JSON object with exactly these keys:
  "title"        - Rewritten ticket title. Imperative verb, specific to the page or feature. \
Max 60 characters.
  "description"  - The problem and the desired end state, in that order and nothing else:
                   1. What is wrong or missing, as concretely as the message and the file \
content allow. For a wording error, quote the current text verbatim and the corrected text \
verbatim, and name the page it appears on.
                   2. What a reader should see on that page once the work is done.
                   Write 2-5 sentences. Do not prescribe how to make the change: no numbered \
steps, no edit sequence, no "locate X and add Y", no acceptance-criteria checklist, no naming of \
config files. Choosing the mechanism is the coding agent's job and it is better placed to do it.
                   If the source message itself proposes an approach, include it as a final \
sentence attributed to the requester ("The requester suggests ..."), quoting them rather than \
restating it as your own conclusion. Never invent an approach the message did not propose.
  "type"         - One of: bug, request, feature, proactive.
  "target_files" - List of file paths in 10gen/docs-mongodb-internal most likely to need \
editing. Use only confirmed paths from the candidate list or file content above.
  "source_url"   - The mongodb.com/docs/ URL from the message if present, otherwise null.

Return only the JSON object, no other text."""

    message = client.messages.create(
        model="claude-sonnet-5",
        # Thinking is on by default on this model and thinking tokens count
        # against max_tokens, so leave headroom for both or the JSON gets cut off.
        # The Human guidance section (comments quoted into the prompt) can push
        # response length past 4096 on tickets with several comments; 8192 held
        # with headroom to spare across 17 replay runs including a guidance case.
        max_tokens=8192,
        messages=[{"role": "user", "content": prompt}],
    )

    if message.stop_reason == "max_tokens":
        raise RuntimeError(
            "Claude response hit max_tokens; the JSON is truncated. Raise max_tokens."
        )

    # content is a list of blocks and the first one is not necessarily the text:
    # with thinking enabled it's a ThinkingBlock, which has no .text.
    raw = next((b.text for b in message.content if b.type == "text"), "")
    # Strip markdown code fence if present
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Claude returned non-JSON output: {e}\nRaw: {raw[:500]}")


# Accounts whose comments are workflow chatter, not instructions: run IDs, PR
# links, Honeycomb URLs. Feeding them to the model is noise, and echoing them
# into the brief would bury the human guidance the section exists to surface.
BOT_COMMENT_AUTHORS = {"sage bot", "education bot", "edu.bot"}


def human_comments(issue_key):
    """Return [(author, body)] for human comments, oldest first.

    Prep used to read only the description, so a writer who replied in a comment
    — the natural place to correct a ticket — was talking to nobody.
    """
    try:
        data = jira_get(f"/issue/{issue_key}/comment")
    except requests.HTTPError as e:
        print(f"  Could not read comments ({e}); continuing without them.")
        return []

    out = []
    for comment in data.get("comments", []):
        author = (comment.get("author") or {}).get("displayName", "").strip()
        name = (comment.get("author") or {}).get("name", "").strip()
        if author.lower() in BOT_COMMENT_AUTHORS or name.lower() in BOT_COMMENT_AUTHORS:
            continue
        body = (comment.get("body") or "").strip()
        if body:
            out.append((author or name or "unknown", body))
    return out


# The privileged section at the top of the description. Human text goes here and
# prep must never rewrite it: it is carried across runs verbatim so that a
# correction cannot end up underneath the machine's version of the story, which
# is exactly how DOCSP-63424 shipped a redirect pointing the wrong way.
# A Jira {panel} rather than a heading, because the block needs an unambiguous
# CLOSING delimiter. With an "h3." heading and no heading after it, extraction
# swallows the rest of the description and replays prep's own output back as
# human guidance, compounding on every run.
GUIDANCE_PANEL_OPEN = "{panel:title=Human guidance|borderColor=#d04437}"
GUIDANCE_PANEL_CLOSE = "{panel}"
GUIDANCE_NOTE = (
    "_Authoritative. If anything below this panel conflicts with it, "
    "this panel wins._"
)
# The closing lookbehind matters: an escaped "\{panel}" inside quoted human text
# is literal content, not the end of the panel, and matching it truncates the
# section mid-sentence.
GUIDANCE_SECTION_RE = re.compile(
    r"\{panel:title=Human guidance[^}]*\}(.*?)(?<!\\)\{panel\}", re.S
)


def extract_guidance(description):
    """Return the body of an existing Human guidance section, or None.

    Lets prep run again without destroying what a person wrote.
    """
    match = GUIDANCE_SECTION_RE.search(description or "")
    if not match:
        return None
    body = match.group(1).replace(GUIDANCE_NOTE, "").strip()
    return body or None


def build_guidance_section(preserved, comments):
    """Assemble the privileged panel from preserved text and human comments.

    Returns (lines, body): the wiki-markup lines for the description, and the
    same human text without scaffolding, for the prompt. Comments are copied
    verbatim rather than summarized — the point is that a person's own words
    survive the rewrite intact.
    """
    parts = []
    if preserved:
        parts.append(preserved)
    for author, body in comments:
        # A comment that happens to contain "{panel}" would close the panel early
        # and truncate everything after it on the next extract. Escape so Jira
        # still renders the brace literally. This happens before the dedupe check
        # because what is already stored is the escaped form, and comparing the
        # raw body against it would re-add the comment on every run.
        safe = body.replace("{panel", "\\{panel")
        if preserved and safe in preserved:
            continue
        parts.append(f"*{author} commented:*\n{{quote}}\n{safe}\n{{quote}}")
    if not parts:
        return [], None
    body = "\n\n".join(parts)
    lines = [
        GUIDANCE_PANEL_OPEN,
        GUIDANCE_NOTE,
        "",
        body,
        GUIDANCE_PANEL_CLOSE,
        "",
    ]
    return lines, body


# JIP Quick Create appends a provenance line to the description naming the person
# who reacted in Slack, e.g.:
#   Created with [Jira Integration+](https://mongodb.slack.com/...) for jane.doe (jane.doe@mongodb.com)
# The reporter on these tickets is always the edu.bot service account, so this
# line is the only record of who actually asked for the work.
REQUESTER_RE = re.compile(r"Created with .*?for\s+(\S+)\s+\(([^)\s]+@[^)\s]+)\)")


def assignable_name(username):
    """Return the Jira username if it can be assigned issues in this project."""
    if not username:
        return None
    r = requests.get(
        f"{JIRA_BASE}/rest/api/2/user/assignable/search",
        headers=jira_headers,
        params={"project": PROJECT_KEY, "username": username},
        timeout=TIMEOUT,
    )
    if r.status_code != 200:
        return None
    users = r.json()
    return users[0]["name"] if users else None


def resolve_requester(description):
    """Resolve the Slack requester from the description's JIP provenance line.

    Returns (assignee_name, display) where assignee_name is a username validated
    as assignable in this project, or None if it could not be resolved.
    """
    match = REQUESTER_RE.search(description or "")
    if not match:
        return None, None
    username, email = match.group(1), match.group(2)
    # The username in the stamp is sometimes the short name and sometimes the
    # full email, and the two are not interchangeable as assignee values.
    for candidate in (username, email):
        resolved = assignable_name(candidate)
        if resolved:
            return resolved, email
    return None, email


def add_label(issue_key, new_label):
    """Add a single label to the ticket, re-fetching current labels first."""
    current = jira_get(f"/issue/{issue_key}?fields=labels")
    existing = current["fields"].get("labels", [])
    if new_label not in existing:
        jira_put(f"/issue/{issue_key}", {"fields": {"labels": existing + [new_label]}})


def main():
    print(f"Fetching {ISSUE_KEY}...")
    issue = jira_get(f"/issue/{ISSUE_KEY}")
    fields = issue["fields"]

    summary = fields.get("summary", "")
    # API v2 returns description as plain text (not ADF)
    description_text = fields.get("description") or ""

    # Resolve the requester before enrich() replaces the description — the JIP
    # provenance line is the only place the reacting user is recorded, and the
    # rewrite discards it.
    requester_name, requester_email = resolve_requester(description_text)
    if requester_name:
        print(f"  Requester: {requester_name}")
    else:
        print(
            "  Requester: could not resolve from description; "
            "leaving assignee unchanged"
        )

    # Human text, gathered before the rewrite so it can both steer the rewrite
    # and be replayed above it afterwards.
    preserved_guidance = extract_guidance(description_text)
    comments = human_comments(ISSUE_KEY)
    print(f"  Human comments: {len(comments)}")
    if preserved_guidance:
        print("  Preserving existing Human guidance section")
    guidance_section, guidance_for_model = build_guidance_section(
        preserved_guidance, comments
    )

    print("Enriching ticket...")
    enriched = enrich(summary, description_text.strip(), guidance_for_model)

    if enriched.get("unactionable"):
        print(f"Ticket is unactionable: {enriched.get('reason', '(no reason given)')}")
        print("Skipping sage labels — manual follow-up required.")
        return

    title = enriched.get("title") or ""
    description = enriched.get("description") or ""
    target_files = validate_target_files(enriched.get("target_files") or [])
    source_url = enriched.get("source_url")

    if not title or not description:
        raise RuntimeError(f"Claude response missing required fields: {enriched}")

    unverified = unverified_prose_paths(description)
    if unverified:
        print(
            "  WARNING: description names paths that do not exist or are EOL: "
            + ", ".join(unverified)
        )

    print(f"  Type: {enriched.get('type')}")
    print(f"  Title: {title}")
    print(f"  Target files: {target_files}")
    print(f"  Source URL: {source_url}")

    # Build wiki-markup description for readable Jira rendering. The human
    # guidance section goes first: a correction placed underneath a detailed
    # machine-written brief reads as an afterthought and loses.
    lines = guidance_section + [
        f"*Type:* {enriched.get('type', 'unknown')}",
        "",
        description,
    ]
    if source_url:
        lines += ["", f"*Source URL:* {source_url}"]
    if target_files:
        lines += ["", "*Likely target files:*"]
        lines += [f"* {p}" for p in target_files]
    if requester_email:
        # Carry the provenance forward; the rewrite drops JIP's original line.
        lines += ["", f"*Requested by:* {requester_email}"]

    full_description = "\n".join(lines)

    print("Updating ticket...")
    update_fields = {
        "summary": title,
        "description": full_description,
    }
    if requester_name:
        update_fields["assignee"] = {"name": requester_name}
    jira_put(f"/issue/{ISSUE_KEY}", {"fields": update_fields})

    print("Applying repo label...")
    add_label(ISSUE_KEY, "repo:10gen/docs-mongodb-internal")

    # sage-bot-beta validates the repo label at trigger time — wait before adding
    time.sleep(10)

    print("Applying sage-bot-beta label...")
    add_label(ISSUE_KEY, "sage-bot-beta")

    print("Done. sage-bot-beta will open a PR within ~10–20 minutes.")


if __name__ == "__main__":
    main()
