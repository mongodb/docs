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

//go:generate mockgen -destination=../mocks/mock_database_roles.go -package=mocks github.com/mongodb/mongocli/internal/store DatabaseRoleLister,DatabaseRoleCreator,DatabaseRoleDeleter,DatabaseRoleUpdater,DatabaseRoleDescriber

type DatabaseRoleLister interface {
	DatabaseRoles(string, *atlas.ListOptions) (*[]atlas.CustomDBRole, error)
}

type DatabaseRoleCreator interface {
	CreateDatabaseRole(string, *atlas.CustomDBRole) (*atlas.CustomDBRole, error)
}

type DatabaseRoleDeleter interface {
	DeleteDatabaseRole(string, string) error
}

type DatabaseRoleUpdater interface {
	UpdateDatabaseRole(string, string, *atlas.CustomDBRole) (*atlas.CustomDBRole, error)
	DatabaseRole(string, string) (*atlas.CustomDBRole, error)
}

type DatabaseRoleDescriber interface {
	DatabaseRole(string, string) (*atlas.CustomDBRole, error)
}

// CreateDatabaseRole encapsulate the logic to manage different cloud providers.
func (s *Store) CreateDatabaseRole(groupID string, role *atlas.CustomDBRole) (*atlas.CustomDBRole, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CustomDBRoles.Create(s.ctx, groupID, role)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteDatabaseRole encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteDatabaseRole(groupID, roleName string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).CustomDBRoles.Delete(s.ctx, groupID, roleName)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DatabaseRoles encapsulate the logic to manage different cloud providers.
func (s *Store) DatabaseRoles(projectID string, opts *atlas.ListOptions) (*[]atlas.CustomDBRole, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CustomDBRoles.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateDatabaseRole encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateDatabaseRole(groupID, roleName string, role *atlas.CustomDBRole) (*atlas.CustomDBRole, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CustomDBRoles.Update(s.ctx, groupID, roleName, role)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DatabaseRole encapsulate the logic to manage different cloud providers.
func (s *Store) DatabaseRole(groupID, roleName string) (*atlas.CustomDBRole, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CustomDBRoles.Get(s.ctx, groupID, roleName)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
