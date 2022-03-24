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
	"io"

	"github.com/mongodb/mongocli/internal/config"
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_server_usage.go -package=mocks github.com/mongodb/mongocli/internal/store ProjectServerTypeGetter,ProjectServerTypeUpdater,OrganizationServerTypeGetter,OrganizationServerTypeUpdater,ProjectHostAssignmentLister,OrganizationHostAssignmentLister,SnapshotGenerator,ServerUsageReportDownloader

type ProjectServerTypeGetter interface {
	ProjectServerType(string) (*opsmngr.ServerType, error)
}

type ProjectServerTypeUpdater interface {
	UpdateProjectServerType(string, *opsmngr.ServerTypeRequest) error
}

type OrganizationServerTypeGetter interface {
	OrganizationServerType(string) (*opsmngr.ServerType, error)
}

type OrganizationServerTypeUpdater interface {
	UpdateOrganizationServerType(string, *opsmngr.ServerTypeRequest) error
}

type ProjectHostAssignmentLister interface {
	ProjectHostAssignments(string, *opsmngr.ServerTypeOptions) (*opsmngr.HostAssignments, error)
}

type OrganizationHostAssignmentLister interface {
	OrganizationHostAssignments(string, *opsmngr.ServerTypeOptions) (*opsmngr.HostAssignments, error)
}

type SnapshotGenerator interface {
	GenerateSnapshot() error
}

type ServerUsageReportDownloader interface {
	DownloadServerUsageReport(opts *opsmngr.ServerTypeOptions, out io.Writer) error
}

// ProjectServerType encapsulates the logic to manage different cloud providers.
func (s *Store) ProjectServerType(projectID string) (*opsmngr.ServerType, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).ServerUsage.GetServerTypeProject(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateProjectServerType encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateProjectServerType(projectID string, serverType *opsmngr.ServerTypeRequest) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).ServerUsage.UpdateProjectServerType(s.ctx, projectID, serverType)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationServerType encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationServerType(orgID string) (*opsmngr.ServerType, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).ServerUsage.GetServerTypeOrganization(s.ctx, orgID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateOrganizationServerType encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateOrganizationServerType(orgID string, serverType *opsmngr.ServerTypeRequest) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).ServerUsage.UpdateOrganizationServerType(s.ctx, orgID, serverType)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ProjectHostAssignments encapsulates the logic to manage different cloud providers.
func (s *Store) ProjectHostAssignments(projectID string, opts *opsmngr.ServerTypeOptions) (*opsmngr.HostAssignments, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).ServerUsage.ProjectHostAssignments(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationHostAssignments encapsulates the logic to manage different cloud providers.
func (s *Store) OrganizationHostAssignments(orgID string, opts *opsmngr.ServerTypeOptions) (*opsmngr.HostAssignments, error) {
	switch s.service {
	case config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).ServerUsage.OrganizationHostAssignments(s.ctx, orgID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// GenerateSnapshot encapsulates the logic to manage different cloud providers.
func (s *Store) GenerateSnapshot() error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).ServerUsage.GenerateDailyUsageSnapshot(s.ctx)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DownloadServerUsageReport encapsulate the logic to manage different cloud providers.
func (s *Store) DownloadServerUsageReport(opts *opsmngr.ServerTypeOptions, out io.Writer) error {
	switch s.service {
	case config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).ServerUsageReport.Download(s.ctx, opts, out)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
