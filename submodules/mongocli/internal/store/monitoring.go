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

//go:generate mockgen -destination=../mocks/mock_monitoring.go -package=mocks github.com/mongodb/mongocli/internal/store MonitoringStarter,MonitoringStopper

type MonitoringStarter interface {
	StartMonitoring(string, *opsmngr.Host) (*opsmngr.Host, error)
}

type MonitoringStopper interface {
	StopMonitoring(string, string) error
}

// StartMonitoring encapsulates the logic to manage different cloud providers.
func (s *Store) StartMonitoring(groupID string, host *opsmngr.Host) (*opsmngr.Host, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).Deployments.StartMonitoring(s.ctx, groupID, host)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// StopMonitoring encapsulates the logic to manage different cloud providers.
func (s *Store) StopMonitoring(groupID, hostID string) error {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).Deployments.StopMonitoring(s.ctx, groupID, hostID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
