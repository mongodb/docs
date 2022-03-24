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
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_live_migration_orgs_connection.go -package=mocks github.com/mongodb/mongocli/internal/store OrganizationsConnector,OrganizationsDescriber

type OrganizationsConnector interface {
	ConnectOrganizations(string, *atlas.LinkToken) (*opsmngr.ConnectionStatus, error)
}

type OrganizationsDescriber interface {
	OrganizationConnectionStatus(string) (*opsmngr.ConnectionStatus, error)
}

// CreateLinkConnection encapsulate the logic to manage different cloud providers.
func (s *Store) ConnectOrganizations(orgID string, linkToken *atlas.LinkToken) (*opsmngr.ConnectionStatus, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).LiveMigration.ConnectOrganizations(s.ctx, orgID, linkToken)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationsLinkStatus encapsulate the logic to manage different cloud providers.
func (s *Store) OrganizationConnectionStatus(orgID string) (*opsmngr.ConnectionStatus, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).LiveMigration.ConnectionStatus(s.ctx, orgID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
