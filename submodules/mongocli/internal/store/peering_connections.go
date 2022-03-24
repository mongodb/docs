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

//go:generate mockgen -destination=../mocks/mock_peering_connections.go -package=mocks github.com/mongodb/mongocli/internal/store PeeringConnectionLister,PeeringConnectionDescriber,PeeringConnectionDeleter,AzurePeeringConnectionCreator,AWSPeeringConnectionCreator,GCPPeeringConnectionCreator,PeeringConnectionCreator

type PeeringConnectionLister interface {
	PeeringConnections(string, *atlas.ContainersListOptions) ([]atlas.Peer, error)
}

type PeeringConnectionDescriber interface {
	PeeringConnection(string, string) (*atlas.Peer, error)
}

type PeeringConnectionCreator interface {
	CreateContainer(string, *atlas.Container) (*atlas.Container, error)
	CreatePeeringConnection(string, *atlas.Peer) (*atlas.Peer, error)
}

type AzurePeeringConnectionCreator interface {
	AzureContainers(string) ([]atlas.Container, error)
	PeeringConnectionCreator
}

type AWSPeeringConnectionCreator interface {
	AWSContainers(string) ([]atlas.Container, error)
	PeeringConnectionCreator
}

type GCPPeeringConnectionCreator interface {
	GCPContainers(string) ([]atlas.Container, error)
	PeeringConnectionCreator
}

type PeeringConnectionDeleter interface {
	DeletePeeringConnection(string, string) error
}

// PeeringConnections encapsulates the logic to manage different cloud providers.
func (s *Store) PeeringConnections(projectID string, opts *atlas.ContainersListOptions) ([]atlas.Peer, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Peers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// PeeringConnections encapsulates the logic to manage different cloud providers.
func (s *Store) PeeringConnection(projectID, peerID string) (*atlas.Peer, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Peers.Get(s.ctx, projectID, peerID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeletePrivateEndpoint encapsulates the logic to manage different cloud providers.
func (s *Store) DeletePeeringConnection(projectID, peerID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Peers.Delete(s.ctx, projectID, peerID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreatePeeringConnection encapsulates the logic to manage different cloud providers.
func (s *Store) CreatePeeringConnection(projectID string, peer *atlas.Peer) (*atlas.Peer, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Peers.Create(s.ctx, projectID, peer)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
