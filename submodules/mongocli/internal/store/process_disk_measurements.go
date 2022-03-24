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

//go:generate mockgen  -destination=../mocks/mock_process_disk_measurements.go -package=mocks github.com/mongodb/mongocli/internal/store ProcessDiskMeasurementsLister,ProcessDatabaseMeasurementsLister

type ProcessDiskMeasurementsLister interface {
	ProcessDiskMeasurements(string, string, int, string, *atlas.ProcessMeasurementListOptions) (*atlas.ProcessDiskMeasurements, error)
}

type ProcessDatabaseMeasurementsLister interface {
	ProcessDatabaseMeasurements(string, string, int, string, *atlas.ProcessMeasurementListOptions) (*atlas.ProcessDatabaseMeasurements, error)
}

// ProcessDiskMeasurements encapsulate the logic to manage different cloud providers.
func (s *Store) ProcessDiskMeasurements(groupID, host string, port int, partitionName string, opts *atlas.ProcessMeasurementListOptions) (*atlas.ProcessDiskMeasurements, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).ProcessDiskMeasurements.List(s.ctx, groupID, host, port, partitionName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// ProcessDiskMeasurements encapsulate the logic to manage different cloud providers.
func (s *Store) ProcessDatabaseMeasurements(groupID, host string, port int, dbName string, opts *atlas.ProcessMeasurementListOptions) (*atlas.ProcessDatabaseMeasurements, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).ProcessDatabaseMeasurements.List(s.ctx, groupID, host, port, dbName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
