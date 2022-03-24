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

//go:generate mockgen -destination=../mocks/mock_backup_sync.go -package=mocks github.com/mongodb/mongocli/internal/store SyncsLister,SyncsDescriber,SyncsCreator,SyncsUpdater,SyncsDeleter

type SyncsLister interface {
	ListSyncs(*atlas.ListOptions) (*opsmngr.BackupStores, error)
}

type SyncsDescriber interface {
	GetSync(string) (*opsmngr.BackupStore, error)
}

type SyncsCreator interface {
	CreateSync(*opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type SyncsUpdater interface {
	UpdateSync(string, *opsmngr.BackupStore) (*opsmngr.BackupStore, error)
}

type SyncsDeleter interface {
	DeleteSync(string) error
}

// ListSyncs encapsulates the logic to manage different cloud providers.
func (s *Store) ListSyncs(options *atlas.ListOptions) (*opsmngr.BackupStores, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).SyncStoreConfig.List(s.ctx, options)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetSync encapsulates the logic to manage different cloud providers.
func (s *Store) GetSync(syncID string) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).SyncStoreConfig.Get(s.ctx, syncID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateSync encapsulates the logic to manage different cloud providers.
func (s *Store) CreateSync(sync *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).SyncStoreConfig.Create(s.ctx, sync)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateSync encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateSync(syncID string, sync *opsmngr.BackupStore) (*opsmngr.BackupStore, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).SyncStoreConfig.Update(s.ctx, syncID, sync)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteSync encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteSync(syncID string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).SyncStoreConfig.Delete(s.ctx, syncID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
