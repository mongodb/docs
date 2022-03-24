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
)

//go:generate mockgen -destination=../mocks/mock_x509_certificate_store.go -package=mocks github.com/mongodb/mongocli/internal/store X509CertificateConfDescriber,X509CertificateConfSaver,X509CertificateConfDisabler

type X509CertificateConfDescriber interface {
	X509Configuration(string) (*atlas.CustomerX509, error)
}

type X509CertificateConfSaver interface {
	SaveX509Configuration(string, string) (*atlas.CustomerX509, error)
}

type X509CertificateConfDisabler interface {
	DisableX509Configuration(string) error
}

type X509CertificateStore interface {
	X509CertificateConfDescriber
	X509CertificateConfSaver
	X509CertificateConfDisabler
}

// X509Configuration retrieves the current user managed certificates for a database user.
func (s *Store) X509Configuration(projectID string) (*atlas.CustomerX509, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).X509AuthDBUsers.GetCurrentX509Conf(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// SaveX509Configuration saves a customer-managed X.509 configuration for an Atlas project.
func (s *Store) SaveX509Configuration(projectID, certificate string) (*atlas.CustomerX509, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		userCertificate := &atlas.CustomerX509{Cas: certificate}
		result, _, err := s.client.(*atlas.Client).X509AuthDBUsers.SaveConfiguration(s.ctx, projectID, userCertificate)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DisableX509Configuration disables customer-managed X.509 configuration for an Atlas project.
func (s *Store) DisableX509Configuration(projectID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).X509AuthDBUsers.DisableCustomerX509(s.ctx, projectID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
