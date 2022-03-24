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

//go:generate mockgen -destination=../mocks/mock_backup_snapshot_schedule.go -package=mocks github.com/mongodb/mongocli/internal/store SnapshotScheduleDescriber,SnapshotScheduleUpdater

type SnapshotScheduleDescriber interface {
	GetSnapshotSchedule(string, string) (*opsmngr.SnapshotSchedule, error)
}

type SnapshotScheduleUpdater interface {
	UpdateSnapshotSchedule(string, string, *opsmngr.SnapshotSchedule) (*opsmngr.SnapshotSchedule, error)
}

// GetSnapshotSchedule encapsulates the logic to manage different cloud providers.
func (s *Store) GetSnapshotSchedule(projectID, clusterID string) (*opsmngr.SnapshotSchedule, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).SnapshotSchedule.Get(s.ctx, projectID, clusterID)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateSnapshotSchedule encapsulates the logic to manage different cloud providers.
func (s *Store) UpdateSnapshotSchedule(projectID, clusterID string, snapshotSchedule *opsmngr.SnapshotSchedule) (*opsmngr.SnapshotSchedule, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).SnapshotSchedule.Update(s.ctx, projectID, clusterID, snapshotSchedule)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
