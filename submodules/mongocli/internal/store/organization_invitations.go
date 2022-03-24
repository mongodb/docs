// Copyright 2021 MongoDB Inc
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

//go:generate mockgen -destination=../mocks/mock_organization_invitations.go -package=mocks github.com/mongodb/mongocli/internal/store OrganizationInvitationLister,OrganizationInvitationDeleter,OrganizationInvitationDescriber,OrganizationInvitationUpdater,OrganizationInviter

type OrganizationInvitationLister interface {
	OrganizationInvitations(string, *atlas.InvitationOptions) ([]*atlas.Invitation, error)
}

type OrganizationInvitationDescriber interface {
	OrganizationInvitation(string, string) (*atlas.Invitation, error)
}

type OrganizationInviter interface {
	InviteUser(string, *atlas.Invitation) (*atlas.Invitation, error)
}

type OrganizationInvitationDeleter interface {
	DeleteInvitation(string, string) error
}

type OrganizationInvitationUpdater interface {
	UpdateOrganizationInvitation(string, string, *atlas.Invitation) (*atlas.Invitation, error)
}

// OrganizationInvitations encapsulate the logic to manage different cloud providers.
func (s *Store) OrganizationInvitations(orgID string, opts *atlas.InvitationOptions) ([]*atlas.Invitation, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Organizations.Invitations(s.ctx, orgID, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Organizations.Invitations(s.ctx, orgID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationInvitation encapsulate the logic to manage different cloud providers.
func (s *Store) OrganizationInvitation(orgID, invitationID string) (*atlas.Invitation, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Organizations.Invitation(s.ctx, orgID, invitationID)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Organizations.Invitation(s.ctx, orgID, invitationID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteInvitation encapsulate the logic to manage different cloud providers.
func (s *Store) DeleteInvitation(orgID, invitationID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).Organizations.DeleteInvitation(s.ctx, orgID, invitationID)
		return err
	case config.CloudManagerService, config.OpsManagerService:
		_, err := s.client.(*opsmngr.Client).Organizations.DeleteInvitation(s.ctx, orgID, invitationID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// OrganizationInvitations encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateOrganizationInvitation(orgID, invitationID string, invitation *atlas.Invitation) (*atlas.Invitation, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		if invitationID != "" {
			result, _, err := s.client.(*atlas.Client).Organizations.UpdateInvitationByID(s.ctx, orgID, invitationID, invitation)
			return result, err
		}
		result, _, err := s.client.(*atlas.Client).Organizations.UpdateInvitation(s.ctx, orgID, invitation)
		return result, err

	case config.CloudManagerService, config.OpsManagerService:
		if invitationID != "" {
			result, _, err := s.client.(*opsmngr.Client).Organizations.UpdateInvitationByID(s.ctx, orgID, invitationID, invitation)
			return result, err
		}
		result, _, err := s.client.(*opsmngr.Client).Organizations.UpdateInvitation(s.ctx, orgID, invitation)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// InviteUser encapsulate the logic to manage different cloud providers.
func (s *Store) InviteUser(orgID string, invitation *atlas.Invitation) (*atlas.Invitation, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).Organizations.InviteUser(s.ctx, orgID, invitation)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).Organizations.InviteUser(s.ctx, orgID, invitation)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
