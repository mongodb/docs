Populate the AKO CRD reference docs with current output from the AKO source repo. 

This process clones the AKO source at a specific tagged version (as specified by the user)

## Prereqs

You'll need to gather the following variables to pass to the process command as demonstrated below.

- AKO repo url: `git@github.com:mongodb/mongodb-atlas-kubernetes.git`
- AKO release version tag: `v2.11.1` (example)

## Run the tool

```
python3 main.py --repo-url git@github.com:mongodb/mongodb-atlas-kubernetes.git --version v2.11.1 --manual-crds
```

In the above, the repo url and release version are set with the flags `--repo-url` and `--version` respectively, and the `--manual-crds` flag indicates that the target for this process are the reference entries for the manually created CRs (as opposed to those 
created via the automated pipeline, which will be available in the future).
