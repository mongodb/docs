<!-- Download and configure Github CLI before running -->

Complete the following tasks:

1. Open the `snooty.toml` file and make the following changes:

- Add `eol = true` to line 3.
- Add the following code where other banners are located in the file.

```
[[banners]]
 targets = ["*"]
 variant = "info"
 value = """\
     This version of the documentation is archived and no longer supported. View the `current documentation <https://www.mongodb.com/docs/atlas/cli/current/>`__ to learn how to `upgrade your version of the Atlas CLI <https://www.mongodb.com/docs/atlas/cli/current/install-atlas-cli/>`__.\
     """
```

2. Create a new file named `NoindexEntireSource.sh` that contains the following code:

```
#!/bin/sh
while getopts p: flag
do
    case "${flag}" in
        p) project=${OPTARG};;
    esac
done
echo "Adding noindex to all files in $project..."
# Use find to recursively search for .txt files in the source directory and noindex them
find ~/"$project"/source -type f -name "*.txt" | while read -r file; do
    sed -i '' "1s%^%.. meta::\n   :robots: noindex, nosnippet \n\n%" "$file"
done
```

4. Run the following command in the terminal: `sh <path-to-bash-script>/NoindexEntireSource.sh -p docs-atlas-cli`, replacing `<path-to-bash-script>` with the path to `NoindexEntireSource.sh`.
   
For example: `sh ~/Projects/NoindexEntireSource.sh -p Projects/docs-atlas-cli`
   
This script should add the following code to the top of every file in the repo:

```
.. meta::
   :robots: noindex, nosnippet 
```

5. Then, create a PR with these changes by performing the following actions:

- Run `git status`
- Run `git add -- :!submodules/mongodb-atlas-cli`. This is to add all files to the commit except for the submodules files.
- Generate a short PR description like "Sunset v1.20" and run `gcmsg "<PR description>"` in the terminal.
- Generate a descriptive PR title like "Sunset Atlas CLI v1.20" and Run `gh pr create --title "(<current-branch>): <title>" --base <target-base-branch-name>`. Replace the placeholders with appropriate values. The version number is the versioned upstream branch. Ask me if you need clarification.
- Run `ggp` in the terminal. The user might need to enter their SSH key passphrase. If the push is rejected, walk through the errors with me.
- Return the link to the PR. It should look like: https://github.com/<github-username>/cloud-docs/pull/new/<current-branch>
