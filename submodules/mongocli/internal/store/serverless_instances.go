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

//go:generate mockgen -destination=../mocks/mock_serverless_instances.go -package=mocks github.com/mongodb/mongocli/internal/store ServerlessInstanceLister,ServerlessInstanceDescriber,ServerlessInstanceDeleter,ServerlessInstanceCreator

type ServerlessInstanceLister interface {
	ServerlessInstances(string, *atlas.ListOptions) (*atlas.ClustersResponse, error)
}

type ServerlessInstanceDescriber interface {
	ServerlessInstance(string, string) (*atlas.Cluster, error)
}

type ServerlessInstanceDeleter interface {
	DeleteServerlessInstance(string, string) error
}

type ServerlessInstanceCreator interface {
	CreateServerlessInstance(string, *atlas.ServerlessCreateRequestParams) (*atlas.Cluster, error)
}

// ServerlessInstances encapsulates the logic to manage different cloud providers.
func (s *Store) ServerlessInstances(projectID string, listOps *atlas.ListOptions) (*atlas.ClustersResponse, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).ServerlessInstances.List(s.ctx, projectID, listOps)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ServerlessInstance encapsulates the logic to manage different cloud providers.
func (s *Store) ServerlessInstance(projectID, clusterName string) (*atlas.Cluster, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).ServerlessInstances.Get(s.ctx, projectID, clusterName)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteServerlessInstance encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteServerlessInstance(projectID, name string) error {
	switch s.service {
	case config.CloudService:
		_, err := s.client.(*atlas.Client).ServerlessInstances.Delete(s.ctx, projectID, name)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateServerlessInstance encapsulate the logic to manage different cloud providers.
func (s *Store) CreateServerlessInstance(projectID string, cluster *atlas.ServerlessCreateRequestParams) (*atlas.Cluster, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).ServerlessInstances.Create(s.ctx, projectID, cluster)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
