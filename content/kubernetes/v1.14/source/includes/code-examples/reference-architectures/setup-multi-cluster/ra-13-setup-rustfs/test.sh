#!/usr/bin/env bash

set -eou pipefail

script_name=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "${script_name}")
repo_root=$(cd "${script_dir}/../../../.." && pwd)

source "${repo_root}/scripts/code_snippets/sample_test_runner.sh"

pushd "${script_dir}"

source env_variables.sh

require_env() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    echo "Missing required env var: ${name}. Declare ${name} in the consuming snippet module's env_variables.sh and source it before running this snippet module" >&2
    exit 1
  fi
}

require_env S3_ENDPOINT
require_env S3_ACCESS_KEY
require_env S3_SECRET_KEY
require_env S3_OPLOG_BUCKET_NAME
require_env S3_SNAPSHOT_BUCKET_NAME

prepare_snippets

run ra-13_0100_install_rustfs_s3.sh
run ra-13_0200_prepare_s3_backup_secrets.sh

popd
