#!/usr/bin/env python3
# Usage: update-staging-links.py <PR_NUMBER> <staging_links>
import re, subprocess, sys

pr_number = sys.argv[1]
links = sys.argv[2]

body = subprocess.check_output([
    "gh", "api", f"repos/10gen/docs-mongodb-internal/pulls/{pr_number}",
    "--jq", ".body"
]).decode()

replacement = f"## STAGING\n\n{links}\n\n"
if re.search(r"## STAGING", body):
    new_body = re.sub(r"## STAGING\n+.*?(?=##)", replacement, body, flags=re.DOTALL)
else:
    new_body = body.rstrip() + f"\n\n{replacement}"

subprocess.run([
    "gh", "api", f"repos/10gen/docs-mongodb-internal/pulls/{pr_number}",
    "-X", "PATCH", "-f", f"body={new_body}", "--jq", ".number"
], check=True)
