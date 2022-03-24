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

//go:generate mockgen -destination=../mocks/mock_backup_blockstores.go -package=mocks github.com/mongodb/mongocli/internal/store BlockstoresLister,BlockstoresDescriber,BlockstoresCreator,BlockstoresUpdater,BlockstoresDeleter

type BlockstoresLister interface {
	ListBlockstores(*atlas.ListOptions) (*opsmngr.BackupStores, error)
}

type BlockstoresDescriber interface {
	DescribeBlockstore(string) (*opsmngr.BackupStore, error)
}

type BlockstoresCreator interface {
	CreateBlockstore(*opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type BlockstoresUpdater interface {
	UpdateBlockstore(*opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type BlockstoresDeleter interface {
	DeleteBlockstore(string) error
}

// ListBlockstore encapsulates the logic to manage different cloud providers.
func (s *Store) ListBlockstores(options *atlas.ListOptions) (*opsmngr.BackupStores, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).BlockstoreConfig.List(s.ctx, options)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DescribeBlockstore encapsulates the logic to manage different cloud providers.
func (s *Store) DescribeBlockstore(blockstoreID string) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).BlockstoreConfig.Get(s.ctx, blockstoreID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateBlockstore encapsulates the logic to manage different cloud providers.
func (s *Store) CreateBlockstore(blockstore *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).BlockstoreConfig.Create(s.ctx, blockstore)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateBlockstore encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateBlockstore(blockstore *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).BlockstoreConfig.Update(s.ctx, blockstore.ID, blockstore)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteBlockstore encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteBlockstore(blockstoreID string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).BlockstoreConfig.Delete(s.ctx, blockstoreID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
