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

package quickstart

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestQuickstartOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAtlasClusterQuickStarter(ctrl)
	defer ctrl.Finish()

	expectedCluster := &mongodbatlas.AdvancedCluster{
		StateName: "IDLE",
		ConnectionStrings: &mongodbatlas.ConnectionStrings{
			StandardSrv: "",
		},
	}

	expectedDBUser := &mongodbatlas.DatabaseUser{}

	var expectedProjectAccessLists *mongodbatlas.ProjectIPAccessLists

	opts := &Opts{
		ClusterName:    "ProjectBar",
		Region:         "US",
		store:          mockStore,
		IPAddresses:    []string{"0.0.0.0"},
		DBUsername:     "user",
		DBUserPassword: "test",
		Provider:       "AWS",
		SkipMongosh:    true,
		SkipSampleData: true,
		Confirm:        true,
	}

	projectIPAccessList := opts.newProjectIPAccessList()

	mockStore.
		EXPECT().
		CreateCluster(opts.newCluster()).Return(expectedCluster, nil).
		Times(1)

	mockStore.
		EXPECT().
		CreateProjectIPAccessList(projectIPAccessList).Return(expectedProjectAccessLists, nil).
		Times(1)

	mockStore.
		EXPECT().
		AtlasCluster(opts.ConfigProjectID(), opts.ClusterName).Return(expectedCluster, nil).
		Times(2)

	mockStore.
		EXPECT().
		CreateDatabaseUser(opts.newDatabaseUser()).Return(expectedDBUser, nil).
		Times(1)

	if err := opts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		0,
		[]string{flag.ProjectID, flag.Region, flag.ClusterName, flag.Provider, flag.AccessListIP, flag.Username, flag.Password, flag.SkipMongosh, flag.SkipSampleData},
	)
}
