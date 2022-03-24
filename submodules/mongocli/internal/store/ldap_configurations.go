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

//go:generate mockgen -destination=../mocks/mock_ldap_configurations.go -package=mocks github.com/mongodb/mongocli/internal/store LDAPConfigurationVerifier,LDAPConfigurationDescriber,LDAPConfigurationSaver,LDAPConfigurationDeleter,LDAPConfigurationGetter

type LDAPConfigurationVerifier interface {
	VerifyLDAPConfiguration(string, *atlas.LDAP) (*atlas.LDAPConfiguration, error)
}

type LDAPConfigurationDescriber interface {
	GetStatusLDAPConfiguration(string, string) (*atlas.LDAPConfiguration, error)
}

type LDAPConfigurationDeleter interface {
	DeleteLDAPConfiguration(string) error
}

type LDAPConfigurationSaver interface {
	SaveLDAPConfiguration(string, *atlas.LDAPConfiguration) (*atlas.LDAPConfiguration, error)
}

type LDAPConfigurationGetter interface {
	GetLDAPConfiguration(string) (*atlas.LDAPConfiguration, error)
}

// VerifyLDAPConfiguration encapsulates the logic to manage different cloud providers.
func (s *Store) VerifyLDAPConfiguration(projectID string, ldap *atlas.LDAP) (*atlas.LDAPConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).LDAPConfigurations.Verify(s.ctx, projectID, ldap)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetStatusLDAPConfiguration encapsulates the logic to manage different cloud providers.
func (s *Store) GetStatusLDAPConfiguration(projectID, requestID string) (*atlas.LDAPConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).LDAPConfigurations.GetStatus(s.ctx, projectID, requestID)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// SaveLDAPConfiguration encapsulates the logic to manage different cloud providers.
func (s *Store) SaveLDAPConfiguration(projectID string, ldap *atlas.LDAPConfiguration) (*atlas.LDAPConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).LDAPConfigurations.Save(s.ctx, projectID, ldap)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteLDAPConfiguration encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteLDAPConfiguration(projectID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, _, err := s.client.(*atlas.Client).LDAPConfigurations.Delete(s.ctx, projectID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetLDAPConfiguration encapsulates the logic to manage different cloud providers.
func (s *Store) GetLDAPConfiguration(projectID string) (*atlas.LDAPConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).LDAPConfigurations.Get(s.ctx, projectID)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
