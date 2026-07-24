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
import time
import json
import requests
import anthropic

REPO = "10gen/docs-mongodb-internal"
JIRA_BASE = os.environ["JIRA_BASE_URL"]
ISSUE_KEY = os.environ["ISSUE_KEY"]

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


def search_repo_files(query, max_results=5):
    """Return candidate file paths in the docs repo matching the query."""
    params = {
        "q": f"{query} repo:{REPO}",
        "per_page": max_results,
    }
    r = requests.get(
        "https://api.github.com/search/code",
        headers=github_headers,
        params=params,
        timeout=TIMEOUT,
    )
    if r.status_code != 200:
        return []
    return [item["path"] for item in r.json().get("items", [])]


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


def enrich(summary, description):
    """Call Claude to produce a sage-ready brief and candidate file paths."""
    client = anthropic.Anthropic(
        base_url=GROVE_ANTHROPIC_BASE_URL,
        api_key="unused",  # SDK requires a value; Grove reads the api-key header
        default_headers={"api-key": os.environ["GROVE_SAGE_PREP_API_KEY"]},
    )

    # Strip filler words to improve code search signal
    stop_words = {"typo", "on", "the", "a", "an", "page", "there", "is", "has",
                  "fix", "update", "wrong", "error", "issue", "problem", "in", "of"}
    search_terms = [w for w in summary.lower().split() if w not in stop_words]
    search_query = " ".join(search_terms) if search_terms else summary
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
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text if message.content else ""
    # Strip markdown code fence if present
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Claude returned non-JSON output: {e}\nRaw: {raw[:500]}")


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

    reporter_name = fields["reporter"]["name"]

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

    full_description = "\n".join(lines)

    print("Updating ticket...")
    jira_put(
        f"/issue/{ISSUE_KEY}",
        {
            "fields": {
                "summary": title,
                "description": full_description,
                "assignee": {"name": reporter_name},
            }
        },
    )

    print("Applying repo label...")
    add_label(ISSUE_KEY, "repo:10gen/docs-mongodb-internal")

    # sage-bot-beta validates the repo label at trigger time — wait before adding
    time.sleep(10)

    print("Applying sage-bot-beta label...")
    add_label(ISSUE_KEY, "sage-bot-beta")

    print("Done. sage-bot-beta will open a PR within ~10–20 minutes.")


if __name__ == "__main__":
    main()
