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


set -Eeou pipefail

export GOPATH="${workdir:?}"
export PATH="$GOPATH/bin:$PATH"

go install github.com/google/go-licenses@latest

go-licenses save "github.com/mongodb/mongocli/cmd/mongocli" --save_path=third_party_notices
# For HCL, a dependency of viper, go-license adds the source code with restricted permissions, this is a problem for some linux users
sudo chmod -R 755 ./third_party_notices
