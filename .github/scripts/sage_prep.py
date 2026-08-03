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

    # Stable sort: current-version paths first, original relevance order within.
    paths.sort(key=lambda p: bool(VERSIONED_PATH_RE.search(p)))
    return paths[:max_results]


def fetch_file_content(path, max_chars=8000):
    """Fetch raw file content from the default branch via GitHub API."""
    r = requests.get(
        f"https://api.github.com/repos/{REPO}/contents/{path}",
        headers=github_headers,
        timeout=TIMEOUT,
    )
    if r.status_code != 200:
        return None
    encoded = r.json().get("content", "")
    content = base64.b64decode(encoded).decode("utf-8", errors="replace")
    return content[:max_chars]


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


def enrich(summary, description):
    """Call Claude to produce a sage-ready brief and candidate file paths."""
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

    prompt = f"""You are a MongoDB docs triage agent. A MongoDB employee reacted to a Slack \
message with an emoji to file a docs update request. The raw message has been transposed into \
a Jira ticket. Your job is to rewrite it into a clear, actionable brief for an AI coding agent \
that will open a GitHub PR against the MongoDB documentation repo.

Raw ticket summary: {summary}
Raw ticket description: {description}

Candidate file paths found via repo search:
{file_hint}

Content of top candidate files (use this to write a precise, surgical description):
{file_content_block}

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
  "description"  - For bug fixes: identify the exact string to find and replace, quoting the \
current text and the corrected text, and name the file. For other types: 3–5 sentences covering \
what is wrong or missing, what the correct content should be, and acceptance criteria.
  "type"         - One of: bug, request, feature, proactive.
  "target_files" - List of file paths in 10gen/docs-mongodb-internal most likely to need \
editing. Use only confirmed paths from the candidate list or file content above.
  "source_url"   - The mongodb.com/docs/ URL from the message if present, otherwise null.

Return only the JSON object, no other text."""

    message = client.messages.create(
        model="claude-sonnet-5",
        # Thinking is on by default on this model and thinking tokens count
        # against max_tokens, so leave headroom for both or the JSON gets cut off.
        max_tokens=4096,
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

    print("Enriching ticket...")
    enriched = enrich(summary, description_text.strip())

    if enriched.get("unactionable"):
        print(f"Ticket is unactionable: {enriched.get('reason', '(no reason given)')}")
        print("Skipping sage labels — manual follow-up required.")
        return

    title = enriched.get("title") or ""
    description = enriched.get("description") or ""
    target_files = enriched.get("target_files") or []
    source_url = enriched.get("source_url")

    if not title or not description:
        raise RuntimeError(f"Claude response missing required fields: {enriched}")

    print(f"  Type: {enriched.get('type')}")
    print(f"  Title: {title}")
    print(f"  Target files: {target_files}")
    print(f"  Source URL: {source_url}")

    # Build wiki-markup description for readable Jira rendering
    lines = [
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
