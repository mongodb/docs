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

//go:generate mockgen -destination=../mocks/mock_backup_file_systems.go -package=mocks github.com/mongodb/mongocli/internal/store FileSystemsLister,FileSystemsDescriber,FileSystemsDeleter,FileSystemsCreator,FileSystemsUpdater

type FileSystemsLister interface {
	ListFileSystems(*atlas.ListOptions) (*opsmngr.FileSystemStoreConfigurations, error)
}

type FileSystemsDescriber interface {
	DescribeFileSystem(string) (*opsmngr.FileSystemStoreConfiguration, error)
}

type FileSystemsDeleter interface {
	DeleteFileSystem(string) error
}

type FileSystemsCreator interface {
	CreateFileSystems(*opsmngr.FileSystemStoreConfiguration) (*opsmngr.FileSystemStoreConfiguration, error)
}

type FileSystemsUpdater interface {
	UpdateFileSystems(*opsmngr.FileSystemStoreConfiguration) (*opsmngr.FileSystemStoreConfiguration, error)
}

// ListFileSystems encapsulates the logic to manage different cloud providers.
func (s *Store) ListFileSystems(options *atlas.ListOptions) (*opsmngr.FileSystemStoreConfigurations, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).FileSystemStoreConfig.List(s.ctx, options)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DescribeFileSystem encapsulates the logic to manage different cloud providers.
func (s *Store) DescribeFileSystem(fileSystemID string) (*opsmngr.FileSystemStoreConfiguration, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).FileSystemStoreConfig.Get(s.ctx, fileSystemID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteFileSystem encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteFileSystem(fileSystemID string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).FileSystemStoreConfig.Delete(s.ctx, fileSystemID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateFileSystems encapsulates the logic to manage different cloud providers.
func (s *Store) CreateFileSystems(fileSystem *opsmngr.FileSystemStoreConfiguration) (*opsmngr.FileSystemStoreConfiguration, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).FileSystemStoreConfig.Create(s.ctx, fileSystem)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateFileSystems encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateFileSystems(fileSystem *opsmngr.FileSystemStoreConfiguration) (*opsmngr.FileSystemStoreConfiguration, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).FileSystemStoreConfig.Update(s.ctx, fileSystem.ID, fileSystem)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
