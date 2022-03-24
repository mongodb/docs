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

//go:generate mockgen -destination=../mocks/mock_backup_oplogs.go -package=mocks github.com/mongodb/mongocli/internal/store OplogsLister,OplogsDescriber,OplogsCreator,OplogsUpdater,OplogsDeleter

type OplogsLister interface {
	ListOplogs(*atlas.ListOptions) (*opsmngr.BackupStores, error)
}

type OplogsDescriber interface {
	GetOplog(string) (*opsmngr.BackupStore, error)
}

type OplogsCreator interface {
	CreateOplog(*opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type OplogsUpdater interface {
	UpdateOplog(string, *opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type OplogsDeleter interface {
	DeleteOplog(string) error
}

// ListOplogs encapsulates the logic to manage different cloud providers.
func (s *Store) ListOplogs(options *atlas.ListOptions) (*opsmngr.BackupStores, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).OplogStoreConfig.List(s.ctx, options)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetOplog encapsulates the logic to manage different cloud providers.
func (s *Store) GetOplog(oplogID string) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).OplogStoreConfig.Get(s.ctx, oplogID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateOplog encapsulates the logic to manage different cloud providers.
func (s *Store) CreateOplog(oplog *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).OplogStoreConfig.Create(s.ctx, oplog)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateOplog encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateOplog(oplogID string, oplog *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).OplogStoreConfig.Update(s.ctx, oplogID, oplog)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteOplog encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteOplog(oplogID string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).OplogStoreConfig.Delete(s.ctx, oplogID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
