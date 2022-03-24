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

//go:generate mockgen -destination=../mocks/mock_search.go -package=mocks github.com/mongodb/mongocli/internal/store SearchIndexLister,SearchIndexCreator,SearchIndexDescriber,SearchIndexUpdater,SearchIndexDeleter

type SearchIndexLister interface {
	SearchIndexes(string, string, string, string, *atlas.ListOptions) ([]*atlas.SearchIndex, error)
}

type SearchIndexCreator interface {
	CreateSearchIndexes(string, string, *atlas.SearchIndex) (*atlas.SearchIndex, error)
}

type SearchIndexDescriber interface {
	SearchIndex(string, string, string) (*atlas.SearchIndex, error)
}

type SearchIndexUpdater interface {
	UpdateSearchIndexes(string, string, string, *atlas.SearchIndex) (*atlas.SearchIndex, error)
}

type SearchIndexDeleter interface {
	DeleteSearchIndex(string, string, string) error
}

// SearchIndexes encapsulate the logic to manage different cloud providers.
func (s *Store) SearchIndexes(projectID, clusterName, dbName, collName string, opts *atlas.ListOptions) ([]*atlas.SearchIndex, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Search.ListIndexes(s.ctx, projectID, clusterName, dbName, collName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateSearchIndexes encapsulate the logic to manage different cloud providers.
func (s *Store) CreateSearchIndexes(projectID, clusterName string, index *atlas.SearchIndex) (*atlas.SearchIndex, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Search.CreateIndex(s.ctx, projectID, clusterName, index)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// SearchIndex encapsulate the logic to manage different cloud providers.
func (s *Store) SearchIndex(projectID, clusterName, indexID string) (*atlas.SearchIndex, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		index, _, err := s.client.(*atlas.Client).Search.GetIndex(s.ctx, projectID, clusterName, indexID)
		return index, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateSearchIndexes encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateSearchIndexes(projectID, clusterName, indexID string, index *atlas.SearchIndex) (*atlas.SearchIndex, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Search.UpdateIndex(s.ctx, projectID, clusterName, indexID, index)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteSearchIndex encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteSearchIndex(projectID, clusterName, indexID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Search.DeleteIndex(s.ctx, projectID, clusterName, indexID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
