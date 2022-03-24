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

//go:build unit
// +build unit

package clusters

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test/fixture"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestList_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockCloudManagerClustersLister(ctrl)
	defer ctrl.Finish()

	t.Run("clusters for project simple view", func(t *testing.T) {
		expected := &opsmngr.Clusters{}

		listOpts := &ListOpts{
			store: mockStore,
		}

		listOpts.ProjectID = "1"
		mockStore.
			EXPECT().
			ProjectClusters(listOpts.ProjectID, nil).
			Return(expected, nil).
			Times(1)

		if err := listOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})

	t.Run("clusters for project json view", func(t *testing.T) {
		expected := fixture.AutomationConfig()
		config.SetOutput(config.JSON)

		listOpts := &ListOpts{
			store: mockStore,
		}

		listOpts.ProjectID = "1"
		mockStore.
			EXPECT().
			GetAutomationConfig(listOpts.ProjectID).
			Return(expected, nil).
			Times(1)

		if err := listOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
		config.SetOutput("")
	})

	t.Run("list all clusters the (no project id)", func(t *testing.T) {
		expected := fixture.AllClusters()
		config.SetService(config.OpsManagerService)
		mockStore.
			EXPECT().
			ListAllProjectClusters().
			Return(expected, nil).
			Times(1)

		listOpts := &ListOpts{
			store: mockStore,
		}

		if err := listOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}
