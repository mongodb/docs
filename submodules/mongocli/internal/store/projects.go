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

//go:generate mockgen -destination=../mocks/mock_projects.go -package=mocks github.com/mongodb/mongocli/internal/store ProjectLister,OrgProjectLister,ProjectCreator,ProjectDeleter,ProjectDescriber,ProjectUsersLister,ProjectUserDeleter,ProjectTeamLister,ProjectTeamAdder,ProjectTeamDeleter

type ProjectLister interface {
	Projects(*atlas.ListOptions) (interface{}, error)
	GetOrgProjects(string, *atlas.ListOptions) (interface{}, error)
}

type OrgProjectLister interface {
	GetOrgProjects(string) (interface{}, error)
}

type ProjectCreator interface {
	CreateProject(string, string, string, *bool, *atlas.CreateProjectOptions) (interface{}, error)
	ServiceVersionDescriber
}

type ProjectDeleter interface {
	DeleteProject(string) error
}

type ProjectDescriber interface {
	Project(string) (interface{}, error)
}

type ProjectUsersLister interface {
	ProjectUsers(string, *atlas.ListOptions) (interface{}, error)
}

type ProjectUserDeleter interface {
	DeleteUserFromProject(string, string) error
}

type ProjectTeamLister interface {
	ProjectTeams(string) (interface{}, error)
}

type ProjectTeamAdder interface {
	AddTeamsToProject(string, []*atlas.ProjectTeam) (*atlas.TeamsAssigned, error)
}

type ProjectTeamDeleter interface {
	DeleteTeamFromProject(string, string) error
}

// Projects encapsulates the logic to manage different cloud providers.
func (s *Store) Projects(opts *atlas.ListOptions) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Projects.GetAllProjects(s.ctx, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Projects.List(s.ctx, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GetOrgProjects encapsulates the logic to manage different cloud providers.
func (s *Store) GetOrgProjects(orgID string, opts *atlas.ListOptions) (interface{}, error) {
	switch s.service {
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Organizations.Projects(s.ctx, orgID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Project encapsulates the logic to manage different cloud providers.
func (s *Store) Project(id string) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Projects.GetOneProject(s.ctx, id)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Projects.Get(s.ctx, id)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateProject encapsulates the logic to manage different cloud providers.
func (s *Store) CreateProject(name, orgID, regionUsageRestrictions string, defaultAlertSettings *bool, opts *atlas.CreateProjectOptions) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		project := &atlas.Project{Name: name, OrgID: orgID, RegionUsageRestrictions: regionUsageRestrictions, WithDefaultAlertsSettings: defaultAlertSettings}
		result, _, err := s.client.(*atlas.Client).Projects.Create(s.ctx, project, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		project := &opsmngr.Project{Name: name, OrgID: orgID, WithDefaultAlertsSettings: defaultAlertSettings}
		result, _, err := s.client.(*opsmngr.Client).Projects.Create(s.ctx, project, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteProject encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteProject(projectID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Projects.Delete(s.ctx, projectID)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Projects.Delete(s.ctx, projectID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ProjectUsers lists all IAM users in a project.
func (s *Store) ProjectUsers(projectID string, opts *atlas.ListOptions) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AtlasUsers.List(s.ctx, projectID, opts)
		return result, err
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Projects.ListUsers(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteProject encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteUserFromProject(projectID, userID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Projects.RemoveUserFromProject(s.ctx, projectID, userID)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Projects.RemoveUser(s.ctx, projectID, userID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ProjectTeams encapsulates the logic to manage different cloud providers.
func (s *Store) ProjectTeams(projectID string) (interface{}, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Projects.GetProjectTeamsAssigned(s.ctx, projectID)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Projects.GetTeams(s.ctx, projectID, nil)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AddTeamsToProject encapsulates the logic to manage different cloud providers.
func (s *Store) AddTeamsToProject(projectID string, teams []*atlas.ProjectTeam) (*atlas.TeamsAssigned, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Projects.AddTeamsToProject(s.ctx, projectID, teams)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Projects.AddTeamsToProject(s.ctx, projectID, teams)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteTeamFromProject encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteTeamFromProject(projectID, teamID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Teams.RemoveTeamFromProject(s.ctx, projectID, teamID)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Teams.RemoveTeamFromProject(s.ctx, projectID, teamID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
