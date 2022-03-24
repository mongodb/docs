// Copyright 2020 MongoDB Inc
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

//go:generate mockgen -destination=../mocks/mock_process_databases.go -package=mocks github.com/mongodb/mongocli/internal/store ProcessDatabaseLister

type ProcessDatabaseLister interface {
	ProcessDatabases(string, string, int, *atlas.ListOptions) (*atlas.ProcessDatabasesResponse, error)
}

// ProcessDatabases encapsulate the logic to manage different cloud providers.
func (s *Store) ProcessDatabases(groupID, host string, port int, opts *atlas.ListOptions) (*atlas.ProcessDatabasesResponse, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).ProcessDatabases.List(s.ctx, groupID, host, port, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
