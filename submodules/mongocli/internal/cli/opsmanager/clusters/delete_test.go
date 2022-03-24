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
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/mongodb/mongocli/internal/test/fixture"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestDeleteReplicaSet_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockCloudManagerClustersDeleter(ctrl)

	defer ctrl.Finish()

	expected := fixture.AutomationConfig()
	watchExpected := fixture.AutomationStatus()
	host0 := &opsmngr.Host{
		Hostname: "host0",
		ID:       "0",
	}
	host1 := &opsmngr.Host{
		Hostname: "host1",
		ID:       "1",
	}

	deleteOpts := &DeleteOpts{
		store: mockStore,
		DeleteOpts: &cli.DeleteOpts{
			Confirm: true,
			Entry:   "myReplicaSet",
		},
	}

	mockStore.
		EXPECT().
		GetAutomationConfig(deleteOpts.ProjectID).
		Return(expected, nil).
		Times(3)

	mockStore.
		EXPECT().
		UpdateAutomationConfig(deleteOpts.ProjectID, expected).
		Return(nil).
		Times(2)

	mockStore.EXPECT().
		GetAutomationStatus(deleteOpts.ProjectID).
		Return(watchExpected, nil).
		Times(2)

	mockStore.
		EXPECT().
		StopMonitoring(deleteOpts.ProjectID, "0").
		Return(nil).
		Times(2)

	mockStore.
		EXPECT().
		StopMonitoring(deleteOpts.ProjectID, "1").
		Return(nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "host0", 27000).
		Return(host0, nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "host1", 27010).
		Return(host1, nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "host0", 27020).
		Return(host0, nil).
		Times(1)

	if err := deleteOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestDeleteShardedCluster_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockCloudManagerClustersDeleter(ctrl)

	defer ctrl.Finish()

	expected := fixture.AutomationConfigWithOneShardedCluster("MyCluster", false)
	watchExpected := fixture.AutomationStatus()
	host0 := &opsmngr.Host{
		Hostname: "example",
		ID:       "0",
	}

	host1 := &opsmngr.Host{
		Hostname: "example",
		ID:       "1",
	}

	host2 := &opsmngr.Host{
		Hostname: "example",
		ID:       "2",
	}

	deleteOpts := &DeleteOpts{
		store: mockStore,
		DeleteOpts: &cli.DeleteOpts{
			Confirm: true,
			Entry:   "MyCluster",
		},
	}

	mockStore.
		EXPECT().
		GetAutomationConfig(deleteOpts.ProjectID).
		Return(expected, nil).
		Times(3)

	mockStore.
		EXPECT().
		UpdateAutomationConfig(deleteOpts.ProjectID, expected).
		Return(nil).
		Times(2)

	mockStore.EXPECT().
		GetAutomationStatus(deleteOpts.ProjectID).
		Return(watchExpected, nil).
		Times(2)

	mockStore.
		EXPECT().
		StopMonitoring(deleteOpts.ProjectID, "0").
		Return(nil).
		Times(1)

	mockStore.
		EXPECT().
		StopMonitoring(deleteOpts.ProjectID, "1").
		Return(nil).
		Times(1)

	mockStore.
		EXPECT().
		StopMonitoring(deleteOpts.ProjectID, "2").
		Return(nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "example", 1).
		Return(host0, nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "example", 2).
		Return(host1, nil).
		Times(1)

	mockStore.
		EXPECT().
		HostByHostname(deleteOpts.ProjectID, "example", 3).
		Return(host2, nil).
		Times(1)

	if err := deleteOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestDeleteBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		DeleteBuilder(),
		0,
		[]string{flag.ProjectID, flag.Force},
	)
}
