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

//go:generate mockgen -destination=../mocks/mock_feature_control_policy.go -package=mocks github.com/mongodb/mongocli/internal/store FeatureControlPoliciesLister,FeatureControlPoliciesUpdater

type FeatureControlPoliciesLister interface {
	FeatureControlPolicies(string, *atlas.ListOptions) (*opsmngr.FeaturePolicy, error)
}

type FeatureControlPoliciesUpdater interface {
	UpdateFeatureControlPolicy(string, *opsmngr.FeaturePolicy) (*opsmngr.FeaturePolicy, error)
}

// FeatureControlPolicies encapsulate the logic to manage different cloud providers.
func (s *Store) FeatureControlPolicies(projectID string, opts *atlas.ListOptions) (*opsmngr.FeaturePolicy, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).FeatureControlPolicies.List(s.ctx, projectID, opts)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}

// UpdateFeatureControlPolicy encapsulate the logic to manage different cloud providers.
func (s *Store) UpdateFeatureControlPolicy(projectID string, policy *opsmngr.FeaturePolicy) (*opsmngr.FeaturePolicy, error) {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		result, _, err := s.client.(*opsmngr.Client).FeatureControlPolicies.Update(s.ctx, projectID, policy)
		return result, err
	default:
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
