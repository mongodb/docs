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
    echo '  -i <keyfile>                SSH identity file'
    echo '  -u <user>                   Username on the remote host'
    echo '  -h <hostsFile>              Output of Evergreen host.list'
}

while getopts 'i:h:g:u:a:b:' opt; do
  case ${opt} in
  i) keyfile="${OPTARG}" ;; # SSH identity file
  u) user="${OPTARG}" ;; # Username on the remote host
  h) hostsFile="${OPTARG}" ;; # Output of Evergreen host.list
  *) echo "invalid option for install-ops-manager-spawn-host $1" ; _print_usage "$@" ; exit 1 ;;
  esac
done

# Install ego
curl -sL https://raw.githubusercontent.com/mongodb-labs/ego/master/install.sh | bash
export EGO_DEBUG=1

export SSH_OPTS="-i ${keyfile} -o SendEnv=LC_GROUP_ID -o SendEnv=LC_AGENT_KEY"

hosts=$(
  cat <<EOF | python - "${hostsFile}"
import sys
import json
with open(sys.argv[1]) as hostsfile:
    hosts = json.load(hostsfile)
    for host in hosts:
        print(host["dns_name"])
EOF
)

for host in ${hosts}; do
ssh -i "$keyfile" -o ConnectTimeout=10  -o StrictHostKeyChecking=no -tt "${user}@${host}" ARCHIVE="${ARCHIVE:?}" 'bash -s' <<'ENDSSH'
  # commands to run on remote host

  #install ego
  curl -sL https://raw.githubusercontent.com/mongodb-labs/ego/master/install.sh | bash

  source ~/.bashrc

  #install mms
  ego ops_manager_install_from_link --archive "$ARCHIVE" --mongodb-version "4.4.10" --central-url "http://localhost:9080"
  exit

ENDSSH
done
