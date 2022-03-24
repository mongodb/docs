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

//go:generate mockgen -destination=../mocks/mock_users.go -package=mocks github.com/mongodb/mongocli/internal/store UserCreator,UserDescriber,UserDeleter,UserLister,TeamUserLister

type UserCreator interface {
	CreateUser(*UserRequest) (interface{}, error)
}

type UserDeleter interface {
	DeleteUser(string) error
}

type UserLister interface {
	OrganizationUsers(string, *atlas.ListOptions) (interface{}, error)
}

type TeamUserLister interface {
	TeamUsers(string, string) (interface{}, error)
}

type UserDescriber interface {
	UserByID(string) (interface{}, error)
	UserByName(string) (interface{}, error)
}

type UserRequest struct {
	*opsmngr.User
	AtlasRoles []atlas.AtlasRole
}

// CreateUser encapsulates the logic to manage different cloud providers.
func (s *Store) CreateUser(user *UserRequest) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		atlasUser := &atlas.AtlasUser{
			EmailAddress: user.EmailAddress,
			FirstName:    user.FirstName,
			LastName:     user.LastName,
			Roles:        user.AtlasRoles,
			Username:     user.Username,
			MobileNumber: user.MobileNumber,
			Password:     user.Password,
			Country:      user.Country,
		}
		result, _, err := s.client.(*atlas.Client).AtlasUsers.Create(s.ctx, atlasUser)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Users.Create(s.ctx, user.User)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UserByID encapsulates the logic to manage different cloud providers.
func (s *Store) UserByID(userID string) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AtlasUsers.Get(s.ctx, userID)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Users.Get(s.ctx, userID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UserByName encapsulates the logic to manage different cloud providers.
func (s *Store) UserByName(username string) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AtlasUsers.GetByName(s.ctx, username)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Users.GetByName(s.ctx, username)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteUser encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteUser(userID string) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Users.Delete(s.ctx, userID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationUsers encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationUsers(organizationID string, opts *atlas.ListOptions) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Organizations.Users(s.ctx, organizationID, opts)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Organizations.ListUsers(s.ctx, organizationID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// TeamUsers encapsulates the logic to manage different cloud providers.
func (s *Store) TeamUsers(orgID, teamID string) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Teams.GetTeamUsersAssigned(s.ctx, orgID, teamID)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Teams.GetTeamUsersAssigned(s.ctx, orgID, teamID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
