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

export MCLI_SERVICE="${cloud_manager_service:?}"

cat <<EOF > "${XDG_CONFIG_HOME}/mongocli.toml"
skip_update_check = true
[default]
  service = "${MCLI_SERVICE}"
  public_api_key = "${MCLI_PUBLIC_API_KEY}"
  private_api_key = "${MCLI_PRIVATE_API_KEY}"
  org_id = "${MCLI_ORG_ID}"
  ops_manager_url = "${MCLI_OPS_MANAGER_URL}"

EOF


echo "create project"

cat <<EOF > project.tmpl
#!/bin/bash

set -euo pipefail

export AGENT_API_KEY="{{.AgentAPIKey}}"
export MCLI_PROJECT_ID="{{.ID}}"
EOF

# shellcheck disable=SC2154
GROUP_NAME="cloudManager-e2e-$((1 + RANDOM % 1000))-$revision"
mongocli iam projects create "$GROUP_NAME" -o="go-template-file=project.tmpl" > project.sh

chmod +x project.sh

# shellcheck disable=SC1091
source project.sh

mongocli config set project_id "$MCLI_PROJECT_ID"

cat <<EOF > automation_agent_settings.sh
export BASE_URL=${MCLI_OPS_MANAGER_URL}
export LC_AGENT_KEY=${AGENT_API_KEY}
export LC_GROUP_ID=${MCLI_PROJECT_ID}
export MCLI_SERVICE=${MCLI_SERVICE}
EOF
