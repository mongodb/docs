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

VERSION=$(git describe | cut -d "v" -f 2)
TOOL_NAME_MESSAGE="MongoDB CLI"

if [[ "${TOOL_NAME:?}" == atlascli ]]; then
  TOOL_NAME_MESSAGE="MongoDB Atlas CLI"
fi

curl --header "Api-User:${evergreen_user:?}" \
     --header "Api-Key:${evergreen_api_key:?}" \
     --request POST "https://evergreen.mongodb.com/rest/v2/notifications/slack" \
     --data '
     {
       "target" : "'"${release_slack_channel:?}"'",
       "msg" : ":mcli: '"${TOOL_NAME_MESSAGE}"' v'"${VERSION}"' has been released! :tada:",
       "attachments" : [
       {
       	"title": "v'"${VERSION}"'",
       	"title_link": "https://github.com/mongodb/mongocli/releases",
       	"author_name": "Release Page",
       	"fallback": "new release",
	      "author_icon": "https://camo.githubusercontent.com/0e10b56a03b056a6e5fcf82a3cb3603188549a02c234b8e5426aaa11853e3069/68747470733a2f2f7261772e6769746875622e636f6d2f6d6f6e676f64622f6d6f6e676f636c692f6d61737465722f6d6f6e676f636c692e706e67"
       }]
     }'
