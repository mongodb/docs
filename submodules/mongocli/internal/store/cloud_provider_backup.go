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

//go:generate mockgen -destination=../mocks/mock_cloud_provider_backup.go -package=mocks github.com/mongodb/mongocli/internal/store RestoreJobsLister,RestoreJobsCreator,SnapshotsLister,SnapshotsCreator,SnapshotsDescriber,SnapshotsDeleter

type RestoreJobsLister interface {
	RestoreJobs(string, string, *atlas.ListOptions) (*atlas.CloudProviderSnapshotRestoreJobs, error)
}

type RestoreJobsCreator interface {
	CreateRestoreJobs(string, string, *atlas.CloudProviderSnapshotRestoreJob) (*atlas.CloudProviderSnapshotRestoreJob, error)
}

type SnapshotsLister interface {
	Snapshots(string, string, *atlas.ListOptions) (*atlas.CloudProviderSnapshots, error)
}

type SnapshotsDescriber interface {
	Snapshot(string, string, string) (*atlas.CloudProviderSnapshot, error)
}

type SnapshotsCreator interface {
	CreateSnapshot(string, string, *atlas.CloudProviderSnapshot) (*atlas.CloudProviderSnapshot, error)
}

type SnapshotsDeleter interface {
	DeleteSnapshot(string, string, string) error
}

// SnapshotRestoreJobs encapsulates the logic to manage different cloud providers.
func (s *Store) RestoreJobs(projectID, clusterName string, opts *atlas.ListOptions) (*atlas.CloudProviderSnapshotRestoreJobs, error) {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		ClusterName: clusterName,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CloudProviderSnapshotRestoreJobs.List(s.ctx, o, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateSnapshotRestoreJobs encapsulates the logic to manage different cloud providers.
func (s *Store) CreateRestoreJobs(projectID, clusterName string, request *atlas.CloudProviderSnapshotRestoreJob) (*atlas.CloudProviderSnapshotRestoreJob, error) {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		ClusterName: clusterName,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CloudProviderSnapshotRestoreJobs.Create(s.ctx, o, request)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// CreateSnapshot encapsulates the logic to manage different cloud providers.
func (s *Store) CreateSnapshot(projectID, clusterName string, request *atlas.CloudProviderSnapshot) (*atlas.CloudProviderSnapshot, error) {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		ClusterName: clusterName,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CloudProviderSnapshots.Create(s.ctx, o, request)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Snapshots encapsulates the logic to manage different cloud providers.
func (s *Store) Snapshots(projectID, clusterName string, opts *atlas.ListOptions) (*atlas.CloudProviderSnapshots, error) {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		ClusterName: clusterName,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CloudProviderSnapshots.GetAllCloudProviderSnapshots(s.ctx, o, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// Snapshot encapsulates the logic to manage different cloud providers.
func (s *Store) Snapshot(projectID, clusterName, snapshotID string) (*atlas.CloudProviderSnapshot, error) {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		SnapshotID:  snapshotID,
		ClusterName: clusterName,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).CloudProviderSnapshots.GetOneCloudProviderSnapshot(s.ctx, o)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DeleteSnapshot encapsulates the logic to manage different cloud providers.
func (s *Store) DeleteSnapshot(projectID, clusterName, snapshotID string) error {
	o := &atlas.SnapshotReqPathParameters{
		GroupID:     projectID,
		ClusterName: clusterName,
		SnapshotID:  snapshotID,
	}
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).CloudProviderSnapshots.Delete(s.ctx, o)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
