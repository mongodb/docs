#!/bin/bash

# Copyright 2020 MongoDB Inc
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

declare -i attempts
declare -i connection_attempts
declare -ri timeout=10

while getopts 'i:h:t:u:' opt; do
    case ${opt} in
        i) keyfile="${OPTARG}";;              # SSH identity file
        u) user="${OPTARG}";;                 # Username on the remote host
        h) hostsfile="${OPTARG}";;            # Output of Evergreen host.list
        t) connection_attempts="${OPTARG}";;  # How many times to attempt to connect via SSH
        *) echo "Invalid option"; exit 1;;
    esac
done

hosts=$(cat << EOF | python - "$hostsfile"
import sys
import json
with open(sys.argv[1]) as hostsfile:
    hosts = json.load(hostsfile)
    for host in hosts:
        print(host["dns_name"])
EOF
)

attempts=0
connection_attempts=${connection_attempts:-60} # Total timeout = timeout * timeout_attempts

for host in $hosts; do
    set +e
    echo "Waiting for $host to become available..."
    while ! ssh -i "$keyfile" -o ConnectTimeout=10 -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -tt "${user}@${host}" exit 2> /dev/null; do
        if [[ "${attempts}" -ge "${connection_attempts}" ]]; then
            echo 'Connect to spawn host failed'
            exit 1
        fi
        ((attempts++))

        echo "SSH connection attempt $attempts/$connection_attempts failed. Retrying ($host)..."
        # sleep for Permission denied (publickey) errors
        sleep "$timeout"
    done
    set -e
done
