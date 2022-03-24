#!/bin/bash

# Copyright 2021 MongoDB Inc
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail

_print_usage() {
    echo
    echo '  -h <hostsFile>                Output of Evergreen host.list'
}

while getopts 'h:' opt; do
  case ${opt} in
  h) hostsFile="${OPTARG}" ;; # Output of Evergreen host.list
  * ) echo "invalid option for set-up-ops-manager $1" ; _print_usage "$@" ; exit 1 ;;
  esac
done

host=$(
  cat <<EOF | python - "${hostsFile}"
import sys
import json
with open(sys.argv[1]) as hostsfile:
    hosts = json.load(hostsfile)
    print(hosts[0]["dns_name"])
EOF

)

pushd ../..

export MCLI_OPS_MANAGER_URL="http://${host}:9080/"
export MCLI_SERVICE="${ops_manager_service:?}"

echo "generate password for owner"
password=$(date +%s | sha256sum | base64 | head -c 8)0_

echo "generate email for owner"
email=$(date +%s | sha256sum | base64 | head -c 8)@ops-manager-team


echo "create first user"
cat <<EOF > credentials.tmpl
#!/bin/bash

set -euo pipefail

export MCLI_PUBLIC_API_KEY={{.ProgrammaticAPIKey.PublicKey}}
export MCLI_PRIVATE_API_KEY={{.ProgrammaticAPIKey.PrivateKey}}
EOF

./bin/mongocli om owner create --firstName evergreen --lastName evergreen --email "${email}" --password "${password}" --accessListIp "127.0.0.1/1" -o="go-template-file=credentials.tmpl" > credentials.sh

chmod +x credentials.sh

# shellcheck disable=SC1091
source credentials.sh

echo "create organization"
MCLI_ORG_ID=$(./bin/mongocli iam organizations create myOrg -o="go-template={{.ID}}")
export MCLI_ORG_ID
echo "create project"
AGENT_API_KEY=$(./bin/mongocli iam projects create myProj -o="go-template={{.AgentAPIKey}}")
MCLI_PROJECT_ID=$(./bin/mongocli iam project list -o="go-template={{ (index .Results 0).ID }}")

cat <<EOF > "${XDG_CONFIG_HOME}/mongocli.toml"
skip_update_check = true
[default]
  ops_manager_url = "${MCLI_OPS_MANAGER_URL}"
  service = "${MCLI_SERVICE}"
  public_api_key = "${MCLI_PUBLIC_API_KEY}"
  private_api_key = "${MCLI_PRIVATE_API_KEY}"
  org_id = "${MCLI_ORG_ID}"
  project_id = "${MCLI_PROJECT_ID}"

EOF

popd
cat <<EOF > automation_agent_settings.sh
export BASE_URL=${MCLI_OPS_MANAGER_URL}
export LC_AGENT_KEY=${AGENT_API_KEY}
export LC_GROUP_ID=${MCLI_PROJECT_ID}
export MCLI_SERVICE=ops-manager
EOF

