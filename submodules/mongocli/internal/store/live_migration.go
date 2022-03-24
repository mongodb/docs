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

//go:generate mockgen -destination=../mocks/mock_live_migration_validations.go -package=mocks github.com/mongodb/mongocli/internal/store LiveMigrationValidationsCreator,LiveMigrationCutoverCreator,LiveMigrationValidationsDescriber

type LiveMigrationValidationsCreator interface {
	CreateValidation(string, *atlas.LiveMigration) (*atlas.Validation, error)
}

type LiveMigrationCutoverCreator interface {
	CreateLiveMigrationCutover(string, string) (*atlas.Validation, error)
}

type LiveMigrationValidationsDescriber interface {
	GetValidationStatus(string, string) (*atlas.Validation, error)
}

// CreateValidation encapsulate the logic to manage different cloud providers.
func (s *Store) CreateValidation(groupID string, liveMigration *atlas.LiveMigration) (*atlas.Validation, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.CreateValidation(s.ctx, groupID, liveMigration)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// StartLiveMigrationCutover encapsulate the logic to manage different cloud providers.
func (s *Store) CreateLiveMigrationCutover(groupID, liveMigrationID string) (*atlas.Validation, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.Start(s.ctx, groupID, liveMigrationID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetValidationStatus encapsulate the logic to manage different cloud providers.
func (s *Store) GetValidationStatus(groupID, liveMigrationID string) (*atlas.Validation, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.GetValidationStatus(context.Background(), groupID, liveMigrationID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
