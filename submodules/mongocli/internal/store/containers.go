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

//go:generate mockgen -destination=../mocks/mock_containers.go -package=mocks github.com/mongodb/mongocli/internal/store ContainersLister,ContainersDeleter

type ContainersLister interface {
	ContainersByProvider(string, *atlas.ContainersListOptions) ([]atlas.Container, error)
	AllContainers(string, *atlas.ListOptions) ([]atlas.Container, error)
}

type ContainersDeleter interface {
	DeleteContainer(string, string) error
}

// ContainersByProvider encapsulates the logic to manage different cloud providers.
func (s *Store) ContainersByProvider(projectID string, opts *atlas.ContainersListOptions) ([]atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Containers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

const maxPerPage = 100

// AzureContainers encapsulates the logic to manage different cloud providers.
func (s *Store) AzureContainers(projectID string) ([]atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		opts := &atlas.ContainersListOptions{
			ProviderName: "Azure",
			ListOptions: atlas.ListOptions{
				PageNum:      0,
				ItemsPerPage: maxPerPage,
			},
		}
		result, _, err := s.client.(*atlas.Client).Containers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AWSContainers encapsulates the logic to manage different cloud providers.
func (s *Store) AWSContainers(projectID string) ([]atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		opts := &atlas.ContainersListOptions{
			ProviderName: "AWS",
			ListOptions: atlas.ListOptions{
				PageNum:      0,
				ItemsPerPage: maxPerPage,
			},
		}
		result, _, err := s.client.(*atlas.Client).Containers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GCPContainers encapsulates the logic to manage different cloud providers.
func (s *Store) GCPContainers(projectID string) ([]atlas.Container, error) {
	switch s.service {
	case config.CloudService:
		opts := &atlas.ContainersListOptions{
			ProviderName: "GCP",
			ListOptions: atlas.ListOptions{
				PageNum:      0,
				ItemsPerPage: maxPerPage,
			},
		}
		result, _, err := s.client.(*atlas.Client).Containers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AllContainers encapsulates the logic to manage different cloud providers.
func (s *Store) AllContainers(projectID string, opts *atlas.ListOptions) ([]atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Containers.ListAll(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteContainer encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteContainer(projectID, containerID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Containers.Delete(s.ctx, projectID, containerID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Container encapsulates the logic to manage different cloud providers.
func (s *Store) Container(projectID, containerID string) (*atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Containers.Get(s.ctx, projectID, containerID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateContainer encapsulates the logic to manage different cloud providers.
func (s *Store) CreateContainer(projectID string, container *atlas.Container) (*atlas.Container, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Containers.Create(s.ctx, projectID, container)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
