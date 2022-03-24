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

//go:generate mockgen -destination=../mocks/mock_private_endpoints.go -package=mocks github.com/mongodb/mongocli/internal/store PrivateEndpointLister,PrivateEndpointDescriber,PrivateEndpointCreator,PrivateEndpointDeleter,InterfaceEndpointDescriber,InterfaceEndpointCreator,InterfaceEndpointDeleter,RegionalizedPrivateEndpointSettingUpdater,RegionalizedPrivateEndpointSettingDescriber,DataLakePrivateEndpointLister,DataLakePrivateEndpointCreator,DataLakePrivateEndpointDeleter,DataLakePrivateEndpointDescriber

type PrivateEndpointLister interface {
	PrivateEndpoints(string, string, *atlas.ListOptions) ([]atlas.PrivateEndpointConnection, error)
}

type DataLakePrivateEndpointLister interface {
	DataLakePrivateEndpoints(string) (*atlas.PrivateLinkEndpointDataLakeResponse, error)
}

type PrivateEndpointDescriber interface {
	PrivateEndpoint(string, string, string) (*atlas.PrivateEndpointConnection, error)
}

type DataLakePrivateEndpointDescriber interface {
	DataLakePrivateEndpoint(string, string) (*atlas.PrivateLinkEndpointDataLake, error)
}

type PrivateEndpointCreator interface {
	CreatePrivateEndpoint(string, *atlas.PrivateEndpointConnection) (*atlas.PrivateEndpointConnection, error)
}

type DataLakePrivateEndpointCreator interface {
	DataLakeCreatePrivateEndpoint(string, *atlas.PrivateLinkEndpointDataLake) (*atlas.PrivateLinkEndpointDataLakeResponse, error)
}

type PrivateEndpointDeleter interface {
	DeletePrivateEndpoint(string, string, string) error
}

type DataLakePrivateEndpointDeleter interface {
	DataLakeDeletePrivateEndpoint(string, string) error
}

type InterfaceEndpointDescriber interface {
	InterfaceEndpoint(string, string, string, string) (*atlas.InterfaceEndpointConnection, error)
}

type InterfaceEndpointCreator interface {
	CreateInterfaceEndpoint(string, string, string, *atlas.InterfaceEndpointConnection) (*atlas.InterfaceEndpointConnection, error)
}

type InterfaceEndpointDeleter interface {
	DeleteInterfaceEndpoint(string, string, string, string) error
}

type RegionalizedPrivateEndpointSettingUpdater interface {
	UpdateRegionalizedPrivateEndpointSetting(string, bool) (*atlas.RegionalizedPrivateEndpointSetting, error)
}

type RegionalizedPrivateEndpointSettingDescriber interface {
	RegionalizedPrivateEndpointSetting(string) (*atlas.RegionalizedPrivateEndpointSetting, error)
}

// PrivateEndpoints encapsulates the logic to manage different cloud providers.
func (s *Store) PrivateEndpoints(projectID, provider string, opts *atlas.ListOptions) ([]atlas.PrivateEndpointConnection, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.List(s.ctx, projectID, provider, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DataLakePrivateEndpoints encapsulates the logic to manage different cloud providers.
func (s *Store) DataLakePrivateEndpoints(projectID string) (*atlas.PrivateLinkEndpointDataLakeResponse, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DataLakes.ListPrivateLinkEndpoint(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// PrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) PrivateEndpoint(projectID, provider, privateLinkID string) (*atlas.PrivateEndpointConnection, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.Get(s.ctx, projectID, provider, privateLinkID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DataLakePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DataLakePrivateEndpoint(projectID, privateLinkID string) (*atlas.PrivateLinkEndpointDataLake, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DataLakes.GetPrivateLinkEndpoint(s.ctx, projectID, privateLinkID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreatePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) CreatePrivateEndpoint(projectID string, r *atlas.PrivateEndpointConnection) (*atlas.PrivateEndpointConnection, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.Create(s.ctx, projectID, r)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DataLakeCreatePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DataLakeCreatePrivateEndpoint(projectID string, r *atlas.PrivateLinkEndpointDataLake) (*atlas.PrivateLinkEndpointDataLakeResponse, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DataLakes.CreatePrivateLinkEndpoint(s.ctx, projectID, r)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeletePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DeletePrivateEndpoint(projectID, provider, privateLinkID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).PrivateEndpoints.Delete(s.ctx, projectID, provider, privateLinkID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DataLakeDeletePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DataLakeDeletePrivateEndpoint(projectID, endpointID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).DataLakes.DeletePrivateLinkEndpoint(s.ctx, projectID, endpointID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateInterfaceEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) CreateInterfaceEndpoint(projectID, provider, endpointServiceID string, createRequest *atlas.InterfaceEndpointConnection) (*atlas.InterfaceEndpointConnection, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.AddOnePrivateEndpoint(s.ctx, projectID, provider, endpointServiceID, createRequest)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// InterfaceEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) InterfaceEndpoint(projectID, cloudProvider, endpointServiceID, privateEndpointID string) (*atlas.InterfaceEndpointConnection, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.GetOnePrivateEndpoint(s.ctx, projectID, cloudProvider, endpointServiceID, privateEndpointID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteInterfaceEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteInterfaceEndpoint(projectID, provider, endpointServiceID, privateEndpointID string) error {
	switch s.service {
	case config.CloudService:
		_, err := s.client.(*atlas.Client).PrivateEndpoints.DeleteOnePrivateEndpoint(s.ctx, projectID, provider, endpointServiceID, privateEndpointID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateRegionalizedPrivateEndpointSetting encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateRegionalizedPrivateEndpointSetting(projectID string, enabled bool) (*atlas.RegionalizedPrivateEndpointSetting, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.UpdateRegionalizedPrivateEndpointSetting(s.ctx, projectID, enabled)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// RegionalizedPrivateEndpointSetting encapsulates the logic to manage different cloud providers.
func (s *Store) RegionalizedPrivateEndpointSetting(projectID string) (*atlas.RegionalizedPrivateEndpointSetting, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).PrivateEndpoints.GetRegionalizedPrivateEndpointSetting(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
