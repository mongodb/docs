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
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_owners.go -package=mocks github.com/mongodb/mongocli/internal/store OwnerCreator

type OwnerCreator interface {
	CreateOwner(*opsmngr.User, []string) (*opsmngr.CreateUserResponse, error)
}

// CreateOwner encapsulate the logic to manage different cloud providers.
func (s *Store) CreateOwner(u *opsmngr.User, ips []string) (*opsmngr.CreateUserResponse, error) {
	switch s.service {
	case config.OpsManagerService:
		var opts *opsmngr.WhitelistOpts
		if len(ips) > 0 {
			opts = &opsmngr.WhitelistOpts{Whitelist: ips}
		}

		result, _, err := s.client.(*opsmngr.Client).UnauthUsers.CreateFirstUser(s.ctx, u, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
