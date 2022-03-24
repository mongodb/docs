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

//go:generate mockgen -destination=../mocks/mock_deployments.go -package=mocks github.com/mongodb/mongocli/internal/store HostLister,HostDescriber,HostDatabaseLister,HostDisksLister,HostByHostnameDescriber

type HostLister interface {
	Hosts(string, *opsmngr.HostListOptions) (*opsmngr.Hosts, error)
}

type HostDescriber interface {
	Host(string, string) (*opsmngr.Host, error)
}
type HostByHostnameDescriber interface {
	HostByHostname(string, string, int) (*opsmngr.Host, error)
}

type HostDatabaseLister interface {
	HostDatabases(string, string, *atlas.ListOptions) (*atlas.ProcessDatabasesResponse, error)
}

type HostDisksLister interface {
	HostDisks(string, string, *atlas.ListOptions) (*atlas.ProcessDisksResponse, error)
}

// HostDatabases encapsulate the logic to manage different cloud providers.
func (s *Store) HostDatabases(groupID, hostID string, opts *atlas.ListOptions) (*atlas.ProcessDatabasesResponse, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.ListDatabases(s.ctx, groupID, hostID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// HostDisks encapsulate the logic to manage different cloud providers.
func (s *Store) HostDisks(groupID, hostID string, opts *atlas.ListOptions) (*atlas.ProcessDisksResponse, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.ListPartitions(s.ctx, groupID, hostID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Hosts encapsulate the logic to manage different cloud providers.
func (s *Store) Hosts(groupID string, opts *opsmngr.HostListOptions) (*opsmngr.Hosts, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.ListHosts(s.ctx, groupID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Host encapsulate the logic to manage different cloud providers.
func (s *Store) Host(groupID, hostID string) (*opsmngr.Host, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.GetHost(s.ctx, groupID, hostID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// HostByHostname encapsulate the logic to manage different cloud providers.
func (s *Store) HostByHostname(groupID, hostname string, port int) (*opsmngr.Host, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.GetHostByHostname(s.ctx, groupID, hostname, port)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
