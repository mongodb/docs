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

//go:generate mockgen -destination=../mocks/mock_integrations.go -package=mocks github.com/mongodb/mongocli/internal/store IntegrationCreator,IntegrationLister,IntegrationDeleter,IntegrationDescriber

type IntegrationCreator interface {
	CreateIntegration(string, string, *atlas.ThirdPartyIntegration) (*atlas.ThirdPartyIntegrations, error)
}

type IntegrationLister interface {
	Integrations(string) (*atlas.ThirdPartyIntegrations, error)
}

type IntegrationDeleter interface {
	DeleteIntegration(string, string) error
}

type IntegrationDescriber interface {
	Integration(string, string) (*atlas.ThirdPartyIntegration, error)
}

// CreateIntegration encapsulates the logic to manage different cloud providers.
func (s *Store) CreateIntegration(projectID, integrationType string, integration *atlas.ThirdPartyIntegration) (*atlas.ThirdPartyIntegrations, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).Integrations.Replace(s.ctx, projectID, integrationType, integration)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Integrations encapsulates the logic to manage different cloud providers.
func (s *Store) Integrations(projectID string) (*atlas.ThirdPartyIntegrations, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).Integrations.List(s.ctx, projectID)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteIntegration encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteIntegration(projectID, integrationType string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Integrations.Delete(s.ctx, projectID, integrationType)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Integration encapsulates the logic to manage different cloud providers.
func (s *Store) Integration(projectID, integrationType string) (*atlas.ThirdPartyIntegration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).Integrations.Get(s.ctx, projectID, integrationType)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
