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
)

type IPInfoDescriber interface {
	IPInfo() (*atlas.IPInfo, error)
}

// IPInfo encapsulates the logic to manage different cloud providers.
func (s *Store) IPInfo() (*atlas.IPInfo, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		resp, _, err := s.client.(*atlas.Client).IPInfo.Get(s.ctx)
		return resp, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// IPAddress gets the client's public ip by calling the atlas private endpoint.
func IPAddress() string {
	s, err := New(AuthenticatedPreset(config.Default()))
	if err != nil {
		return ""
	}

	ip, err := s.IPInfo()
	if err != nil {
		return ""
	}
	return ip.CurrentIPv4Address
}
