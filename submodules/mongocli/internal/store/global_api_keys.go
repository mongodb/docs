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

//go:generate mockgen -destination=../mocks/mock_global_api_keys.go -package=mocks github.com/mongodb/mongocli/internal/store GlobalAPIKeyLister,GlobalAPIKeyDescriber,GlobalAPIKeyUpdater,GlobalAPIKeyCreator,GlobalAPIKeyDeleter

type GlobalAPIKeyLister interface {
	GlobalAPIKeys(*atlas.ListOptions) ([]atlas.APIKey, error)
}

type GlobalAPIKeyDescriber interface {
	GlobalAPIKey(string) (*atlas.APIKey, error)
}

type GlobalAPIKeyUpdater interface {
	UpdateGlobalAPIKey(string, *atlas.APIKeyInput) (*atlas.APIKey, error)
}

type GlobalAPIKeyCreator interface {
	CreateGlobalAPIKey(*atlas.APIKeyInput) (*atlas.APIKey, error)
}

type GlobalAPIKeyDeleter interface {
	DeleteGlobalAPIKey(string) error
}

// GlobalAPIKeys encapsulates the logic to manage different cloud providers.
func (s *Store) GlobalAPIKeys(opts *atlas.ListOptions) ([]atlas.APIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeys.List(s.ctx, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GlobalAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) GlobalAPIKey(apiKeyID string) (*atlas.APIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeys.Get(s.ctx, apiKeyID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateGlobalAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateGlobalAPIKey(apiKeyID string, input *atlas.APIKeyInput) (*atlas.APIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeys.Update(s.ctx, apiKeyID, input)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateGlobalAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) CreateGlobalAPIKey(input *atlas.APIKeyInput) (*atlas.APIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeys.Create(s.ctx, input)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteGlobalAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteGlobalAPIKey(id string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).GlobalAPIKeys.Delete(s.ctx, id)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
