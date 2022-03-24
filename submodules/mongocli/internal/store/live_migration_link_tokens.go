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
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_live_migration_link_tokens.go -package=mocks github.com/mongodb/mongocli/internal/store LinkTokenCreator,LinkTokenDeleter

type LinkTokenCreator interface {
	CreateLinkToken(string, *atlas.TokenCreateRequest) (*atlas.LinkToken, error)
}

type LinkTokenDeleter interface {
	DeleteLinkToken(string) error
}

type LinkTokenStore interface {
	LinkTokenCreator
	LinkTokenDeleter
}

// CreateLinkToken encapsulate the logic to manage different cloud providers.
func (s *Store) CreateLinkToken(orgID string, linkToken *atlas.TokenCreateRequest) (*atlas.LinkToken, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).LiveMigration.CreateLinkToken(s.ctx, orgID, linkToken)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteLinkToken encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteLinkToken(orgID string) error {
	switch s.service {
	case config.CloudService:
		_, err := s.client.(*atlas.Client).LiveMigration.DeleteLinkToken(s.ctx, orgID)
		return err
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).LiveMigration.DeleteConnection(s.ctx, orgID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
