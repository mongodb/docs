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

func TestDescribe_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockCloudManagerClustersDescriber(ctrl)
	defer ctrl.Finish()

	t.Run("describe cluster simplified", func(t *testing.T) {
		descOpts := &DescribeOpts{
			store: mockStore,
			name:  "myReplicaSet",
		}
		expected := &opsmngr.Cluster{}
		mockStore.
			EXPECT().
			OpsManagerCluster(descOpts.ProjectID, descOpts.name).
			Return(expected, nil).
			Times(1)

		if err := descOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})

	t.Run("describe cluster for JSON", func(t *testing.T) {
		descOpts := &DescribeOpts{
			store: mockStore,
			name:  "myReplicaSet",
		}

		config.SetOutput(config.JSON)
		expected := fixture.AutomationConfig()
		mockStore.
			EXPECT().
			GetAutomationConfig(descOpts.ProjectID).
			Return(expected, nil).
			Times(1)

		if err := descOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
		config.SetOutput("")
	})
}
