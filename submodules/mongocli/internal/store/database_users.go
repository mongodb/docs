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
	"net/url"

	"github.com/mongodb/mongocli/internal/config"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

//go:generate mockgen -destination=../mocks/mock_database_users.go -package=mocks github.com/mongodb/mongocli/internal/store DatabaseUserLister,DatabaseUserCreator,DatabaseUserDeleter,DatabaseUserUpdater,DatabaseUserDescriber,DBUserCertificateLister,DBUserCertificateCreator

type DatabaseUserLister interface {
	DatabaseUsers(groupID string, opts *atlas.ListOptions) ([]atlas.DatabaseUser, error)
}

type DatabaseUserCreator interface {
	CreateDatabaseUser(*atlas.DatabaseUser) (*atlas.DatabaseUser, error)
}

type DatabaseUserDeleter interface {
	DeleteDatabaseUser(string, string, string) error
}

type DatabaseUserUpdater interface {
	UpdateDatabaseUser(*atlas.DatabaseUser) (*atlas.DatabaseUser, error)
}

type DatabaseUserDescriber interface {
	DatabaseUser(string, string, string) (*atlas.DatabaseUser, error)
}

type DBUserCertificateLister interface {
	DBUserCertificates(string, string) ([]atlas.UserCertificate, error)
}

type DBUserCertificateCreator interface {
	CreateDBUserCertificate(string, string, int) (*atlas.UserCertificate, error)
}

// CreateDatabaseUser encapsulate the logic to manage different cloud providers.
func (s *Store) CreateDatabaseUser(user *atlas.DatabaseUser) (*atlas.DatabaseUser, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DatabaseUsers.Create(s.ctx, user.GroupID, user)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

func (s *Store) DeleteDatabaseUser(authDB, groupID, username string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).DatabaseUsers.Delete(s.ctx, authDB, groupID, username)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

func (s *Store) DatabaseUsers(projectID string, opts *atlas.ListOptions) ([]atlas.DatabaseUser, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DatabaseUsers.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

func (s *Store) UpdateDatabaseUser(user *atlas.DatabaseUser) (*atlas.DatabaseUser, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).DatabaseUsers.Update(s.ctx, user.GroupID, user.Username, user)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

func (s *Store) DatabaseUser(authDB, groupID, username string) (*atlas.DatabaseUser, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		escapedUsername := url.PathEscape(username)
		result, _, err := s.client.(*atlas.Client).DatabaseUsers.Get(s.ctx, authDB, groupID, escapedUsername)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DBUserCertificates retrieves the current Atlas managed certificates for a database user.
func (s *Store) DBUserCertificates(projectID, username string) ([]atlas.UserCertificate, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).X509AuthDBUsers.GetUserCertificates(s.ctx, projectID, username)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateDBUserCertificate creates a new Atlas managed certificates for a database user.
func (s *Store) CreateDBUserCertificate(projectID, username string, monthsUntilExpiration int) (*atlas.UserCertificate, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).X509AuthDBUsers.CreateUserCertificate(s.ctx, projectID, username, monthsUntilExpiration)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
