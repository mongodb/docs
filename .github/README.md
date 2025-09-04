# Github Actions

These GH Actions are meant for the private repo, and will not be copied over to the public repo. This is meant for security and vulnerability issues, to prevent malicious code from being run. There is also an added security measure in the public repo to disable actions completely.

## Omitted Actions

See the workflow for repo-sync that instructs the action to copy over to the public repo. This action specifically omits any github workflows from being copied. See [example ticket](https://jira.mongodb.org/browse/SECBUG-503)