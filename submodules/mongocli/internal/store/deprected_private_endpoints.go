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

//go:generate mockgen -destination=../mocks/mock_deprecated_private_endpoints.go -package=mocks github.com/mongodb/mongocli/internal/store PrivateEndpointListerDeprecated,PrivateEndpointDescriberDeprecated,PrivateEndpointCreatorDeprecated,PrivateEndpointDeleterDeprecated,InterfaceEndpointCreatorDeprecated,InterfaceEndpointDescriberDeprecated,InterfaceEndpointDeleterDeprecated

type PrivateEndpointListerDeprecated interface {
	PrivateEndpointsDeprecated(string, *atlas.ListOptions) ([]atlas.PrivateEndpointConnectionDeprecated, error)
}

type PrivateEndpointDescriberDeprecated interface {
	PrivateEndpointDeprecated(string, string) (*atlas.PrivateEndpointConnectionDeprecated, error)
}

type PrivateEndpointDeleterDeprecated interface {
	DeletePrivateEndpointDeprecated(string, string) error
}

type InterfaceEndpointDescriberDeprecated interface {
	InterfaceEndpointDeprecated(string, string, string) (*atlas.InterfaceEndpointConnectionDeprecated, error)
}

type InterfaceEndpointCreatorDeprecated interface {
	CreateInterfaceEndpointDeprecated(string, string, string) (*atlas.InterfaceEndpointConnectionDeprecated, error)
}

type PrivateEndpointCreatorDeprecated interface {
	CreatePrivateEndpointDeprecated(string, *atlas.PrivateEndpointConnectionDeprecated) (*atlas.PrivateEndpointConnectionDeprecated, error)
}

type InterfaceEndpointDeleterDeprecated interface {
	DeleteInterfaceEndpointDeprecated(string, string, string) error
}

// PrivateEndpointsDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) PrivateEndpointsDeprecated(projectID string, opts *atlas.ListOptions) ([]atlas.PrivateEndpointConnectionDeprecated, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// PrivateEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) PrivateEndpointDeprecated(projectID, privateLinkID string) (*atlas.PrivateEndpointConnectionDeprecated, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.Get(s.ctx, projectID, privateLinkID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeletePrivateEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) DeletePrivateEndpointDeprecated(projectID, privateLinkID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.Delete(s.ctx, projectID, privateLinkID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateInterfaceEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) CreateInterfaceEndpointDeprecated(projectID, privateLinkID, interfaceEndpointID string) (*atlas.InterfaceEndpointConnectionDeprecated, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.AddOneInterfaceEndpoint(s.ctx, projectID, privateLinkID, interfaceEndpointID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreatePrivateEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) CreatePrivateEndpointDeprecated(projectID string, r *atlas.PrivateEndpointConnectionDeprecated) (*atlas.PrivateEndpointConnectionDeprecated, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.Create(s.ctx, projectID, r)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// InterfaceEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) InterfaceEndpointDeprecated(projectID, privateLinkID, interfaceEndpointID string) (*atlas.InterfaceEndpointConnectionDeprecated, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.GetOneInterfaceEndpoint(s.ctx, projectID, privateLinkID, interfaceEndpointID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteInterfaceEndpointDeprecated encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteInterfaceEndpointDeprecated(projectID, privateLinkID, interfaceEndpointID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).PrivateEndpointsDeprecated.DeleteOneInterfaceEndpoint(s.ctx, projectID, privateLinkID, interfaceEndpointID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
