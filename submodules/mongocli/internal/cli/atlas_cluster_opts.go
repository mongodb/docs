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
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/store"
)

var defaultMongoDBMajorVersion string

func DefaultMongoDBMajorVersion() (string, error) {
	if defaultMongoDBMajorVersion != "" {
		return defaultMongoDBMajorVersion, nil
	}
	s, err := store.New(store.UnauthenticatedPreset(config.Default()))
	if err != nil {
		return "", err
	}
	defaultMongoDBMajorVersion, _ = s.DefaultMongoDBVersion()

	return defaultMongoDBMajorVersion, nil
}
