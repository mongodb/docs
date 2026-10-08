---
name: grove-debug
internal: true
description: "Debug failures in MongoDB code example tests: environment and setup problems, invalid syntax or missing imports, missing or incorrect output files, comparison utility issues, and GitHub Actions/CI failures in the Grove test infrastructure. Use when a code example test fails or a writer asks for help debugging test infrastructure."
---

# Debug Code Example Testing Issues

Help technical writers debug code example testing issues, escalating infrastructure problems to the Grove team.

Start by reproducing the failure: collect the exact error message, the files involved (example, test, and output files), and what the writer already attempted. Then read the Quick Decision Framework (READ FIRST) section at the top of `references/code-example-testing-debug-guide.md` to classify the problem before diagnosing. That guide contains the full diagnostic process, writer-issue remediation steps, and the escalation template for tooling issues that belong with the Grove team.

For GitHub Actions / CI-side failures in the code example test workflows, follow `references/github-action-local-debug-guide.md`, which covers reproducing and debugging workflow runs locally with `act`.
