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

//go:generate mockgen -destination=../mocks/mock_agents.go -package=mocks github.com/mongodb/mongocli/internal/store AgentLister,AgentUpgrader,AgentAPIKeyLister,AgentAPIKeyCreator,AgentAPIKeyDeleter,AgentGlobalVersionsLister,AgentProjectVersionsLister

type AgentLister interface {
	Agents(string, string, *atlas.ListOptions) (*opsmngr.Agents, error)
}

type AgentGlobalVersionsLister interface {
	AgentGlobalVersions() (*opsmngr.SoftwareVersions, error)
}

type AgentProjectVersionsLister interface {
	AgentProjectVersions(string) (*opsmngr.AgentVersions, error)
}

type AgentUpgrader interface {
	UpgradeAgent(string) (*opsmngr.AutomationConfigAgent, error)
}

type AgentAPIKeyLister interface {
	AgentAPIKeys(string) ([]*opsmngr.AgentAPIKey, error)
}

type AgentAPIKeyCreator interface {
	CreateAgentAPIKey(string, *opsmngr.AgentAPIKeysRequest) (*opsmngr.AgentAPIKey, error)
}

type AgentAPIKeyDeleter interface {
	DeleteAgentAPIKey(string, string) error
}

// Agents encapsulates the logic to manage different cloud providers.
func (s *Store) Agents(projectID, agentType string, opts *atlas.ListOptions) (*opsmngr.Agents, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Agents.ListAgentsByType(s.ctx, projectID, agentType, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpgradeAgent encapsulates the logic to manage different cloud providers.
func (s *Store) UpgradeAgent(projectID string) (*opsmngr.AutomationConfigAgent, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Automation.UpdateAgentVersion(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AgentAPIKeys encapsulates the logic to manage different cloud providers.
func (s *Store) AgentAPIKeys(projectID string) ([]*opsmngr.AgentAPIKey, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Agents.ListAgentAPIKeys(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateAgentAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) CreateAgentAPIKey(projectID string, r *opsmngr.AgentAPIKeysRequest) (*opsmngr.AgentAPIKey, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Agents.CreateAgentAPIKey(s.ctx, projectID, r)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteAgentAPIKey encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteAgentAPIKey(projectID, keyID string) error {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).Agents.DeleteAgentAPIKey(s.ctx, projectID, keyID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Agents encapsulates the logic to manage different cloud providers.
func (s *Store) AgentGlobalVersions() (*opsmngr.SoftwareVersions, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Agents.GlobalVersions(s.ctx)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Agents encapsulates the logic to manage different cloud providers.
func (s *Store) AgentProjectVersions(projectID string) (*opsmngr.AgentVersions, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Agents.ProjectVersions(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
