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

//go:generate mockgen -destination=../mocks/mock_online_archives.go -package=mocks github.com/mongodb/mongocli/internal/store OnlineArchiveLister,OnlineArchiveDescriber,OnlineArchiveCreator,OnlineArchiveUpdater,OnlineArchiveDeleter

type OnlineArchiveLister interface {
	OnlineArchives(string, string, *atlas.ListOptions) (*atlas.OnlineArchives, error)
}

type OnlineArchiveDescriber interface {
	OnlineArchive(string, string, string) (*atlas.OnlineArchive, error)
}

type OnlineArchiveCreator interface {
	CreateOnlineArchive(string, string, *atlas.OnlineArchive) (*atlas.OnlineArchive, error)
}

type OnlineArchiveUpdater interface {
	UpdateOnlineArchive(string, string, *atlas.OnlineArchive) (*atlas.OnlineArchive, error)
}

type OnlineArchiveDeleter interface {
	DeleteOnlineArchive(string, string, string) error
}

// OnlineArchives encapsulate the logic to manage different cloud providers.
func (s *Store) OnlineArchives(projectID, clusterName string, lstOpt *atlas.ListOptions) (*atlas.OnlineArchives, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).OnlineArchives.List(s.ctx, projectID, clusterName, lstOpt)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OnlineArchive encapsulate the logic to manage different cloud providers.
func (s *Store) OnlineArchive(projectID, clusterName, archiveID string) (*atlas.OnlineArchive, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).OnlineArchives.Get(s.ctx, projectID, clusterName, archiveID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateOnlineArchive encapsulate the logic to manage different cloud providers.
func (s *Store) CreateOnlineArchive(projectID, clusterName string, archive *atlas.OnlineArchive) (*atlas.OnlineArchive, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).OnlineArchives.Create(s.ctx, projectID, clusterName, archive)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateOnlineArchive encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateOnlineArchive(projectID, clusterName string, archive *atlas.OnlineArchive) (*atlas.OnlineArchive, error) {
	switch s.service {
	case config.CloudService:
		result, _, err := s.client.(*atlas.Client).OnlineArchives.Update(s.ctx, projectID, clusterName, archive.ID, archive)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteOnlineArchive encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteOnlineArchive(projectID, clusterName, archiveID string) error {
	switch s.service {
	case config.CloudService:
		_, err := s.client.(*atlas.Client).OnlineArchives.Delete(s.ctx, projectID, clusterName, archiveID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
