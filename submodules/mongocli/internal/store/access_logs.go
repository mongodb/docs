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

//go:generate mockgen -destination=../mocks/mock_access_logs.go -package=mocks github.com/mongodb/mongocli/internal/store AccessLogsListerByClusterName,AccessLogsListerByHostname,AccessLogsLister

type AccessLogsListerByClusterName interface {
	AccessLogsByClusterName(string, string, *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error)
}

type AccessLogsListerByHostname interface {
	AccessLogsByHostname(string, string, *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error)
}

type AccessLogsLister interface {
	AccessLogsByHostname(string, string, *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error)
	AccessLogsByClusterName(string, string, *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error)
}

// AccessLogsByHostname encapsulates the logic to manage different cloud providers.
func (s *Store) AccessLogsByHostname(groupID, hostname string, opts *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AccessTracking.ListByHostname(s.ctx, groupID, hostname, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// AccessLogsByClusterName encapsulates the logic to manage different cloud providers.
func (s *Store) AccessLogsByClusterName(groupID, clusterName string, opts *atlas.AccessLogOptions) (*atlas.AccessLogSettings, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).AccessTracking.ListByCluster(s.ctx, groupID, clusterName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
