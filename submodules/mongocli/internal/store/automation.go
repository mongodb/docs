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

//go:generate mockgen -destination=../mocks/mock_automation.go -package=mocks github.com/mongodb/mongocli/internal/store AutomationGetter,AutomationUpdater,AutomationStatusGetter,AutomationPatcher,CloudManagerClustersLister,CloudManagerClustersDescriber,CloudManagerClustersDeleter

type AutomationGetter interface {
	GetAutomationConfig(string) (*opsmngr.AutomationConfig, error)
}

type AutomationUpdater interface {
	UpdateAutomationConfig(string, *opsmngr.AutomationConfig) error
}

type AutomationStatusGetter interface {
	GetAutomationStatus(string) (*opsmngr.AutomationStatus, error)
}

type AutomationPatcher interface {
	AutomationGetter
	AutomationUpdater
}

type AllClusterLister interface {
	ListAllProjectClusters() (*opsmngr.AllClustersProjects, error)
}

type CloudManagerClustersLister interface {
	AutomationGetter
	ClusterLister
	AllClusterLister
}

type CloudManagerClustersDescriber interface {
	AutomationGetter
	OpsManagerClusterDescriber
}

type CloudManagerClustersDeleter interface {
	AutomationStatusGetter
	MonitoringStopper
	HostByHostnameDescriber
	AutomationPatcher
}

func (s *Store) GetAutomationStatus(projectID string) (*opsmngr.AutomationStatus, error) {
	switch s.service {
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Automation.GetStatus(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetAutomationConfig encapsulate the logic to manage different cloud providers.
func (s *Store) GetAutomationConfig(projectID string) (*opsmngr.AutomationConfig, error) {
	switch s.service {
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Automation.GetConfig(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateAutomationConfig encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateAutomationConfig(projectID string, automationConfig *opsmngr.AutomationConfig) error {
	switch s.service {
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Automation.UpdateConfig(s.ctx, projectID, automationConfig)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
