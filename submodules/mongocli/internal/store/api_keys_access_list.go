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

//go:generate mockgen -destination=../mocks/mock_api_keys_access_list.go -package=mocks github.com/mongodb/mongocli/internal/store OrganizationAPIKeyAccessListCreator,OrganizationAPIKeyAccessListDeleter,OrganizationAPIKeyAccessListLister,OrganizationAPIKeyWhitelistLister,OrganizationAPIKeyWhitelistDeleter,OrganizationAPIKeyWhitelistCreator,OrganizationAPIKeyAccessListWhitelistLister,OrganizationAPIKeyAccessListWhitelistDeleter,OrganizationAPIKeyAccessListWhitelistCreator

type OrganizationAPIKeyAccessListLister interface {
	OrganizationAPIKeyAccessLists(string, string, *atlas.ListOptions) (*atlas.AccessListAPIKeys, error)
}

type OrganizationAPIKeyAccessListDeleter interface {
	DeleteOrganizationAPIKeyAccessList(string, string, string) error
}

type OrganizationAPIKeyAccessListCreator interface {
	CreateOrganizationAPIKeyAccessList(string, string, []*atlas.AccessListAPIKeysReq) (*atlas.AccessListAPIKeys, error)
}

type OrganizationAPIKeyWhitelistLister interface {
	OrganizationAPIKeyWhitelists(string, string, *atlas.ListOptions) (*atlas.WhitelistAPIKeys, error)
}

type OrganizationAPIKeyWhitelistDeleter interface {
	DeleteOrganizationAPIKeyWhitelist(string, string, string) error
}

type OrganizationAPIKeyWhitelistCreator interface {
	CreateOrganizationAPIKeyWhitelist(string, string, []*atlas.WhitelistAPIKeysReq) (*atlas.WhitelistAPIKeys, error)
}

type OrganizationAPIKeyAccessListWhitelistLister interface {
	OrganizationAPIKeyAccessListLister
	OrganizationAPIKeyWhitelistLister
	ServiceVersionDescriber
}

type OrganizationAPIKeyAccessListWhitelistDeleter interface {
	OrganizationAPIKeyAccessListDeleter
	OrganizationAPIKeyWhitelistDeleter
	ServiceVersionDescriber
}

type OrganizationAPIKeyAccessListWhitelistCreator interface {
	OrganizationAPIKeyAccessListCreator
	OrganizationAPIKeyWhitelistCreator
	ServiceVersionDescriber
}

// CreateOrganizationAPIKeyAccessList encapsulates the logic to manage different cloud providers.
func (s *Store) CreateOrganizationAPIKeyAccessList(orgID, apiKeyID string, opts []*atlas.AccessListAPIKeysReq) (*atlas.AccessListAPIKeys, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AccessListAPIKeys.Create(s.ctx, orgID, apiKeyID, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).AccessListAPIKeys.Create(s.ctx, orgID, apiKeyID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteOrganizationAPIKeyAccessList encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteOrganizationAPIKeyAccessList(orgID, apiKeyID, ipAddress string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).AccessListAPIKeys.Delete(s.ctx, orgID, apiKeyID, ipAddress)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).AccessListAPIKeys.Delete(s.ctx, orgID, apiKeyID, ipAddress)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationAPIKeyAccessLists encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationAPIKeyAccessLists(orgID, apiKeyID string, opts *atlas.ListOptions) (*atlas.AccessListAPIKeys, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AccessListAPIKeys.List(s.ctx, orgID, apiKeyID, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).AccessListAPIKeys.List(s.ctx, orgID, apiKeyID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateOrganizationAPIKeyWhitelist encapsulates the logic to manage different cloud providers.
//
// Deprecated: kept until Ops Manager 4.4 reaches EOL.
func (s *Store) CreateOrganizationAPIKeyWhitelist(orgID, apiKeyID string, opts []*atlas.WhitelistAPIKeysReq) (*atlas.WhitelistAPIKeys, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).WhitelistAPIKeys.Create(s.ctx, orgID, apiKeyID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteOrganizationAPIKeyWhitelist encapsulates the logic to manage different cloud providers.
//
// Deprecated: kept until Ops Manager 4.4 reaches EOL.
func (s *Store) DeleteOrganizationAPIKeyWhitelist(orgID, apiKeyID, ipAddress string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).AccessListAPIKeys.Delete(s.ctx, orgID, apiKeyID, ipAddress)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationAPIKeyWhitelists encapsulates the logic to manage different cloud providers.
//
// Deprecated: kept until Ops Manager 4.4 reaches EOL.
func (s *Store) OrganizationAPIKeyWhitelists(orgID, apiKeyID string, opts *atlas.ListOptions) (*atlas.WhitelistAPIKeys, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, e := s.client.(*opsmngr.Client).WhitelistAPIKeys.List(s.ctx, orgID, apiKeyID, opts)
		return result, e
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
