#!/usr/bin/env bash

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

set -Eeou pipefail

VERSION=$(git describe --abbrev=0 | cut -d "v" -f 2)

FILE_EXT=deb
if [[ "${image-}" =~ "rpm" ]]; then
  FILE_EXT=rpm
fi


URL=https://mongodb-mongocli-build.s3.amazonaws.com/mongocli-master/dist/${revision-}_${created_at-}/mongocli_${VERSION}-next_linux_x86_64.${FILE_EXT}
ENTRYPOINT=mongocli
if [[ "${tool_name:?}" == atlascli ]]; then
  URL=https://mongodb-mongocli-build.s3.amazonaws.com/mongocli-master/dist/${revision-}_${created_at-}/mongodb-atlas-cli_${VERSION}-next_linux_x86_64.${FILE_EXT}
  ENTRYPOINT=atlas
fi

docker build \
  --build-arg url="${URL-}" \
  --build-arg entrypoint="${ENTRYPOINT-}" \
  -t "${tool_name-}-${image-}" \
  -f "${image-}.Dockerfile" .
