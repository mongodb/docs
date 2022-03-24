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

package backup

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestRestoresStart_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockRestoreJobsCreator(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.CloudProviderSnapshotRestoreJob{}

	t.Run(automatedRestore, func(t *testing.T) {
		listOpts := &RestoresStartOpts{
			store:       mockStore,
			method:      automatedRestore,
			clusterName: "Cluster0",
		}

		mockStore.
			EXPECT().
			CreateRestoreJobs(listOpts.ProjectID, "Cluster0", listOpts.newCloudProviderSnapshotRestoreJob()).
			Return(expected, nil).
			Times(1)

		if err := listOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})

	t.Run(downloadRestore, func(t *testing.T) {
		listOpts := &RestoresStartOpts{
			store:       mockStore,
			method:      downloadRestore,
			clusterName: "Cluster0",
		}

		mockStore.
			EXPECT().
			CreateRestoreJobs(listOpts.ProjectID, "Cluster0", listOpts.newCloudProviderSnapshotRestoreJob()).
			Return(expected, nil).
			Times(1)

		if err := listOpts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}
