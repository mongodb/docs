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

//go:generate mockgen -destination=../mocks/mock_global_api_keys_access_list.go -package=mocks github.com/mongodb/mongocli/internal/store GlobalAPIKeyWhitelistLister,GlobalAPIKeyWhitelistDescriber,GlobalAPIKeyWhitelistCreator,GlobalAPIKeyWhitelistDeleter

type GlobalAPIKeyWhitelistLister interface {
	GlobalAPIKeyWhitelists(*atlas.ListOptions) (*opsmngr.GlobalWhitelistAPIKeys, error)
}

type GlobalAPIKeyWhitelistDescriber interface {
	GlobalAPIKeyWhitelist(string) (*opsmngr.GlobalWhitelistAPIKey, error)
}

type GlobalAPIKeyWhitelistCreator interface {
	CreateGlobalAPIKeyWhitelist(*opsmngr.WhitelistAPIKeysReq) (*opsmngr.GlobalWhitelistAPIKey, error)
}

type GlobalAPIKeyWhitelistDeleter interface {
	DeleteGlobalAPIKeyWhitelist(string) error
}

// GlobalAPIKeyWhitelists encapsulates the logic to manage different cloud providers.
func (s *Store) GlobalAPIKeyWhitelists(opts *atlas.ListOptions) (*opsmngr.GlobalWhitelistAPIKeys, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeysWhitelist.List(s.ctx, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GlobalAPIKeyWhitelist encapsulates the logic to manage different cloud providers.
func (s *Store) GlobalAPIKeyWhitelist(id string) (*opsmngr.GlobalWhitelistAPIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeysWhitelist.Get(s.ctx, id)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateGlobalAPIKeyWhitelist encapsulates the logic to manage different cloud providers.
func (s *Store) CreateGlobalAPIKeyWhitelist(opts *opsmngr.WhitelistAPIKeysReq) (*opsmngr.GlobalWhitelistAPIKey, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).GlobalAPIKeysWhitelist.Create(s.ctx, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteGlobalAPIKeyWhitelist encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteGlobalAPIKeyWhitelist(id string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).GlobalAPIKeysWhitelist.Delete(s.ctx, id)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
