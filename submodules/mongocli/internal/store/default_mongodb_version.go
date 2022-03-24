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

package store

import (
	"fmt"

	"github.com/mongodb/mongocli/internal/config"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

//go:generate mockgen -destination=../mocks/mock_default_mongodb_version.go -package=mocks github.com/mongodb/mongocli/internal/store DefaultVersionGetter

type DefaultVersionGetter interface {
	DefaultMongoDBVersion() (string, error)
}

// CreateCloudProviderAccessRole encapsulates the logic to manage different cloud providers.
func (s *Store) DefaultMongoDBVersion() (string, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DefaultMongoDBMajorVersion.Get(s.ctx)
		return result, err
	default:
		return "", fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
