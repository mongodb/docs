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

//go:generate mockgen -destination=../mocks/mock_alert_configuration.go -package=mocks github.com/mongodb/mongocli/internal/store AlertConfigurationLister,AlertConfigurationCreator,AlertConfigurationDeleter,AlertConfigurationUpdater,MatcherFieldsLister

type AlertConfigurationLister interface {
	AlertConfigurations(string, *atlas.ListOptions) ([]atlas.AlertConfiguration, error)
}

type AlertConfigurationCreator interface {
	CreateAlertConfiguration(*atlas.AlertConfiguration) (*atlas.AlertConfiguration, error)
}

type AlertConfigurationDeleter interface {
	DeleteAlertConfiguration(string, string) error
}

type AlertConfigurationUpdater interface {
	UpdateAlertConfiguration(*atlas.AlertConfiguration) (*atlas.AlertConfiguration, error)
}

type MatcherFieldsLister interface {
	MatcherFields() ([]string, error)
}

// AlertConfigurations encapsulate the logic to manage different cloud providers.
func (s *Store) AlertConfigurations(projectID string, opts *atlas.ListOptions) ([]atlas.AlertConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AlertConfigurations.List(s.ctx, projectID, opts)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).AlertConfigurations.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateAlertConfiguration encapsulate the logic to manage different cloud providers.
func (s *Store) CreateAlertConfiguration(alertConfig *atlas.AlertConfiguration) (*atlas.AlertConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AlertConfigurations.Create(s.ctx, alertConfig.GroupID, alertConfig)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).AlertConfigurations.Create(s.ctx, alertConfig.GroupID, alertConfig)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteAlertConfiguration encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteAlertConfiguration(projectID, id string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).AlertConfigurations.Delete(s.ctx, projectID, id)
		return err
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).AlertConfigurations.Delete(s.ctx, projectID, id)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// MatcherFields encapsulate the logic to manage different cloud providers.
func (s *Store) MatcherFields() ([]string, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AlertConfigurations.ListMatcherFields(s.ctx)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).AlertConfigurations.ListMatcherFields(s.ctx)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

func (s *Store) UpdateAlertConfiguration(alertConfig *atlas.AlertConfiguration) (*atlas.AlertConfiguration, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AlertConfigurations.Update(s.ctx, alertConfig.GroupID, alertConfig.ID, alertConfig)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).AlertConfigurations.Update(s.ctx, alertConfig.GroupID, alertConfig.ID, alertConfig)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
