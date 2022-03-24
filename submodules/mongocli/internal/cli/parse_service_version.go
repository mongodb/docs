// Copyright 2021 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cli

import (
	"strings"

	"github.com/Masterminds/semver/v3"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

// ParseServiceVersion parses service version into semver.Version.
func ParseServiceVersion(v *atlas.ServiceVersion) (*semver.Version, error) {
	versionParts := strings.Split(v.Version, ".")

	const maxVersionParts = 2

	if len(versionParts) > maxVersionParts {
		versionParts = versionParts[0:maxVersionParts] // ops manager versions are not semantic this is converting it to x.y
	}

	newVersion := strings.Join(versionParts, ".")

	return semver.NewVersion(newVersion)
}
