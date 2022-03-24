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

//go:generate mockgen -destination=../mocks/mock_custom_dns.go -package=mocks github.com/mongodb/mongocli/internal/store CustomDNSEnabler,CustomDNSDisabler,CustomDNSDescriber

import (
	"fmt"

	"github.com/mongodb/mongocli/internal/config"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type CustomDNSEnabler interface {
	EnableCustomDNS(string) (*atlas.AWSCustomDNSSetting, error)
}

type CustomDNSDisabler interface {
	DisableCustomDNS(string) (*atlas.AWSCustomDNSSetting, error)
}

type CustomDNSDescriber interface {
	DescribeCustomDNS(string) (*atlas.AWSCustomDNSSetting, error)
}

// EnableCustomDNS encapsulates the logic to manage different cloud providers.
func (s *Store) EnableCustomDNS(projectID string) (*atlas.AWSCustomDNSSetting, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		customDNSSetting := &atlas.AWSCustomDNSSetting{
			Enabled: true,
		}
		result, _, err := s.client.(*atlas.Client).CustomAWSDNS.Update(s.ctx, projectID, customDNSSetting)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DisableCustomDNS encapsulates the logic to manage different cloud providers.
func (s *Store) DisableCustomDNS(projectID string) (*atlas.AWSCustomDNSSetting, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		customDNSSetting := &atlas.AWSCustomDNSSetting{
			Enabled: false,
		}
		result, _, err := s.client.(*atlas.Client).CustomAWSDNS.Update(s.ctx, projectID, customDNSSetting)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DescribeCustomDNS encapsulates the logic to manage different cloud providers.
func (s *Store) DescribeCustomDNS(projectID string) (*atlas.AWSCustomDNSSetting, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CustomAWSDNS.Get(s.ctx, projectID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
