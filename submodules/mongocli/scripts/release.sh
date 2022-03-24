#!/usr/bin/env bash

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

VERSION="${1-}"

if [[ -z "${VERSION}" ]]; then
    echo "Please provide a tag version in the format 'mongocli/vX.Y.Z' or 'atlascli/vX.Y.Z'"
    exit 1
fi

if [[ "${VERSION}" != mongocli/v* ]] && [[ "${VERSION}" != atlascli/v* ]]; then
    echo "Please provide a tag version in the format 'mongocli/vX.Y.Z' or 'atlascli/vX.Y.Z'"
    exit 1
fi

read -p "Are you sure to release ${VERSION}? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

git tag -a -s "${VERSION}" -m "${VERSION}"
git push origin "${VERSION}"
