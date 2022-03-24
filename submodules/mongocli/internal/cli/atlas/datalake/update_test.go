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

package datalake

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestUpdate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockDataLakeUpdater(ctrl)
	defer ctrl.Finish()

	expected := mongodbatlas.DataLake{}

	createOpts := &UpdateOpts{
		store:      mockStore,
		name:       "new_data_lake",
		region:     "some_region",
		role:       "some::arn",
		testBucket: "some_bucket",
	}

	updateRequest := &mongodbatlas.DataLakeUpdateRequest{
		CloudProviderConfig: &mongodbatlas.CloudProviderConfig{
			AWSConfig: mongodbatlas.AwsCloudProviderConfig{
				IAMAssumedRoleARN: "some::arn",
				TestS3Bucket:      "some_bucket",
			},
		},
		DataProcessRegion: &mongodbatlas.DataProcessRegion{
			CloudProvider: aws,
			Region:        "some_region",
		},
	}

	mockStore.
		EXPECT().
		UpdateDataLake(createOpts.ProjectID, createOpts.name, updateRequest).
		Return(&expected, nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
