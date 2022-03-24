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
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/config"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

//go:generate mockgen -destination=../mocks/mock_live_migrations.go -package=mocks github.com/mongodb/mongocli/internal/store LiveMigrationCreator,LiveMigrationDescriber

type LiveMigrationCreator interface {
	LiveMigrationCreate(string, *atlas.LiveMigration) (*atlas.LiveMigration, error)
}

type LiveMigrationDescriber interface {
	LiveMigrationDescribe(string, string) (*atlas.LiveMigration, error)
}

// LiveMigrationCreate encapsulate the logic to manage different cloud providers.
func (s *Store) LiveMigrationCreate(groupID string, liveMigration *atlas.LiveMigration) (*atlas.LiveMigration, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.Create(s.ctx, groupID, liveMigration)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// LiveMigrationCreate encapsulate the logic to manage different cloud providers.
func (s *Store) LiveMigrationDescribe(groupID, migrationID string) (*atlas.LiveMigration, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.Get(context.Background(), groupID, migrationID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
