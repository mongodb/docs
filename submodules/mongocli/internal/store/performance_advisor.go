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
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_performance_advisor.go -package=mocks github.com/mongodb/mongocli/internal/store PerformanceAdvisorNamespacesLister,PerformanceAdvisorSlowQueriesLister,PerformanceAdvisorIndexesLister,PerformanceAdvisorSlowOperationThresholdEnabler,PerformanceAdvisorSlowOperationThresholdDisabler
type PerformanceAdvisorNamespacesLister interface {
	PerformanceAdvisorNamespaces(string, string, *atlas.NamespaceOptions) (*atlas.Namespaces, error)
}

type PerformanceAdvisorSlowQueriesLister interface {
	PerformanceAdvisorSlowQueries(string, string, *atlas.SlowQueryOptions) (*atlas.SlowQueries, error)
}

type PerformanceAdvisorIndexesLister interface {
	PerformanceAdvisorIndexes(string, string, *atlas.SuggestedIndexOptions) (*atlas.SuggestedIndexes, error)
}

type PerformanceAdvisorSlowOperationThresholdEnabler interface {
	EnablePerformanceAdvisorSlowOperationThreshold(string) error
}

type PerformanceAdvisorSlowOperationThresholdDisabler interface {
	DisablePerformanceAdvisorSlowOperationThreshold(string) error
}

// PerformanceAdvisorNamespaces encapsulates the logic to manage different cloud providers.
func (s *Store) PerformanceAdvisorNamespaces(projectID, processName string, opts *atlas.NamespaceOptions) (*atlas.Namespaces, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PerformanceAdvisor.GetNamespaces(s.ctx, projectID, processName, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).PerformanceAdvisor.GetNamespaces(s.ctx, projectID, processName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// PerformanceAdvisorSlowQueries encapsulates the logic to manage different cloud providers.
func (s *Store) PerformanceAdvisorSlowQueries(projectID, processName string, opts *atlas.SlowQueryOptions) (*atlas.SlowQueries, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PerformanceAdvisor.GetSlowQueries(s.ctx, projectID, processName, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).PerformanceAdvisor.GetSlowQueries(s.ctx, projectID, processName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// PerformanceAdvisorIndexes encapsulates the logic to manage different cloud providers.
func (s *Store) PerformanceAdvisorIndexes(projectID, processName string, opts *atlas.SuggestedIndexOptions) (*atlas.SuggestedIndexes, error) {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		result, _, err := s.client.(*atlas.Client).PerformanceAdvisor.GetSuggestedIndexes(s.ctx, projectID, processName, opts)
		return result, err
	case config.CloudManagerService, config.OpsManagerService:
		result, _, err := s.client.(*opsmngr.Client).PerformanceAdvisor.GetSuggestedIndexes(s.ctx, projectID, processName, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// EnablePerformanceAdvisorSlowOperationThreshold encapsulates the logic to manage different cloud providers.
func (s *Store) EnablePerformanceAdvisorSlowOperationThreshold(projectID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).PerformanceAdvisor.EnableManagedSlowOperationThreshold(s.ctx, projectID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// DisablePerformanceAdvisorSlowOperationThreshold encapsulates the logic to manage different cloud providers.
func (s *Store) DisablePerformanceAdvisorSlowOperationThreshold(projectID string) error {
	switch s.service {
	case config.CloudService, config.CloudGovService:
		_, err := s.client.(*atlas.Client).PerformanceAdvisor.DisableManagedSlowOperationThreshold(s.ctx, projectID)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
