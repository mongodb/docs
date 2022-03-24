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
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/spf13/afero"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestCreateOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockClusterCreator(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.AdvancedCluster{}

	t.Run("flags run", func(t *testing.T) {
		createOpts := &CreateOpts{
			name:       "ProjectBar",
			region:     "US",
			tier:       atlasM2,
			members:    3,
			diskSizeGB: 10,
			backup:     false,
			mdbVersion: "4.2",
			store:      mockStore,
		}

		cluster, _ := createOpts.newCluster()
		mockStore.
			EXPECT().
			CreateCluster(cluster).Return(expected, nil).
			Times(1)

		if err := createOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})

	t.Run("file run", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		// create test file
		fileYML := `
{
  "name": "ProjectBar",
  "diskSizeGB": 10,
  "numShards": 1,
  "providerSettings": {
    "providerName": "AWS",
    "instanceSizeName": "M2",
    "regionName": "US"
  },
  "clusterType" : "REPLICASET",
  "replicationFactor": 3,
  "replicationSpecs": [{
    "numShards": 1,
    "regionsConfig": {
      "US_EAST_1": {
        "analyticsNodes": 0,
        "electableNodes": 3,
        "priority": 7,
        "readOnlyNodes": 0
      }
    },
    "zoneName": "Zone 1"
  }],
  "backupEnabled": false,
  "providerBackupEnabled" : false
}`
		fileName := "atlas_cluster_create_test.json"
		_ = afero.WriteFile(appFS, fileName, []byte(fileYML), 0600)

		createOpts := &CreateOpts{
			filename: fileName,
			fs:       appFS,
			store:    mockStore,
		}

		cluster, _ := createOpts.newCluster()
		mockStore.
			EXPECT().
			CreateCluster(cluster).Return(expected, nil).
			Times(1)
		if err := createOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}

func TestCreateBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		CreateBuilder(),
		0,
		[]string{flag.Provider, flag.Region, flag.Members, flag.Tier, flag.DiskSizeGB, flag.MDBVersion, flag.Backup,
			flag.File, flag.Type, flag.Shards, flag.ProjectID, flag.Output},
	)
}
