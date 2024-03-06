import subprocess
import os
import shutil

# Use a local path for testing
# source_repo = "/Users/alexander.neben/workspace/mongo4"
# destination_repo = "/Users/alexander.neben/workspace/mongo3"

source_repo = "git@github.com:10gen/docs-mongodb-internal.git"
destination_repo = "git@github.com:mongodb/docs.git"
branches_to_sync = ["master", "v7.0", "v6.0"] # TODO: add all branches you want to sync

# TODO: deal with creds

# Delete folder if it was there
shutil.rmtree("docs-mongodb-internal", ignore_errors=True)

# Clone the repo
# TODO: if run in evergreen this might need to be changed to a fetch
subprocess.run(["git", "clone", source_repo, "docs-mongodb-internal"], check=True)

# cd into new cloned directory
os.chdir("docs-mongodb-internal")

# Add the destination repo and name it upstream
subprocess.run(["git", "remote", "add", "upstream", destination_repo], check=True)

for branch in branches_to_sync:
    subprocess.run(["git", "checkout", branch], check=True)
    subprocess.run(["git", "push", "upstream", branch], check=True)
