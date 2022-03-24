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

//go:generate mockgen -destination=../mocks/mock_api_keys.go -package=mocks github.com/mongodb/mongocli/internal/store ProjectAPIKeyLister,ProjectAPIKeyCreator,OrganizationAPIKeyLister,OrganizationAPIKeyDescriber,OrganizationAPIKeyUpdater,OrganizationAPIKeyCreator,OrganizationAPIKeyDeleter,ProjectAPIKeyDeleter,ProjectAPIKeyAssigner

type ProjectAPIKeyLister interface {
	ProjectAPIKeys(string, *atlas.ListOptions) ([]atlas.APIKey, error)
}

type ProjectAPIKeyCreator interface {
	CreateProjectAPIKey(string, *atlas.APIKeyInput) (*atlas.APIKey, error)
}

type ProjectAPIKeyDeleter interface {
	DeleteProjectAPIKey(string, string) error
}

type ProjectAPIKeyAssigner interface {
	AssignProjectAPIKey(string, string, *atlas.AssignAPIKey) error
}

type OrganizationAPIKeyLister interface {
	OrganizationAPIKeys(string, *atlas.ListOptions) ([]atlas.APIKey, error)
}

type OrganizationAPIKeyDescriber interface {
	OrganizationAPIKey(string, string) (*atlas.APIKey, error)
}

type OrganizationAPIKeyUpdater interface {
	UpdateOrganizationAPIKey(string, string, *atlas.APIKeyInput) (*atlas.APIKey, error)
}

type OrganizationAPIKeyCreator interface {
	CreateOrganizationAPIKey(string, *atlas.APIKeyInput) (*atlas.APIKey, error)
}

type OrganizationAPIKeyDeleter interface {
	DeleteOrganizationAPIKey(string, string) error
}

// OrganizationAPIKeys encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationAPIKeys(orgID string, opts *atlas.ListOptions) ([]atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).APIKeys.List(s.ctx, orgID, opts)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).OrganizationAPIKeys.List(s.ctx, orgID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationAPIKey(orgID, apiKeyID string) (*atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).APIKeys.Get(s.ctx, orgID, apiKeyID)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).OrganizationAPIKeys.Get(s.ctx, orgID, apiKeyID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateOrganizationAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateOrganizationAPIKey(orgID, apiKeyID string, input *atlas.APIKeyInput) (*atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).APIKeys.Update(s.ctx, orgID, apiKeyID, input)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).OrganizationAPIKeys.Update(s.ctx, orgID, apiKeyID, input)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateOrganizationAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) CreateOrganizationAPIKey(orgID string, input *atlas.APIKeyInput) (*atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).APIKeys.Create(s.ctx, orgID, input)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).OrganizationAPIKeys.Create(s.ctx, orgID, input)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteOrganizationAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteOrganizationAPIKey(orgID, id string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).APIKeys.Delete(s.ctx, orgID, id)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).OrganizationAPIKeys.Delete(s.ctx, orgID, id)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ProjectAPIKeys returns the API Keys for a specific project.
func (s *Store) ProjectAPIKeys(projectID string, opts *atlas.ListOptions) ([]atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).ProjectAPIKeys.List(s.ctx, projectID, opts)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).ProjectAPIKeys.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateProjectAPIKey creates an API Keys for a project.
func (s *Store) CreateProjectAPIKey(projectID string, apiKeyInput *atlas.APIKeyInput) (*atlas.APIKey, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).ProjectAPIKeys.Create(s.ctx, projectID, apiKeyInput)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).ProjectAPIKeys.Create(s.ctx, projectID, apiKeyInput)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AssignProjectAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) AssignProjectAPIKey(projectID, apiKeyID string, input *atlas.AssignAPIKey) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).ProjectAPIKeys.Assign(s.ctx, projectID, apiKeyID, input)
		return err
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).ProjectAPIKeys.Assign(s.ctx, projectID, apiKeyID, input)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteProjectAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteProjectAPIKey(projectID, id string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).ProjectAPIKeys.Unassign(s.ctx, projectID, id)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).ProjectAPIKeys.Unassign(s.ctx, projectID, id)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
