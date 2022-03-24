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

package create

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestAzureOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAzurePeeringConnectionCreator(ctrl)
	defer ctrl.Finish()

	opts := &AzureOpts{
		store:  mockStore,
		region: "TEST",
	}
	t.Run("container exists", func(t *testing.T) {
		containers := []mongodbatlas.Container{
			{
				ID:     "containerID",
				Region: opts.region,
			},
		}
		mockStore.
			EXPECT().
			AzureContainers(opts.ProjectID).
			Return(containers, nil).
			Times(1)

		request := opts.newPeer(containers[0].ID)
		mockStore.
			EXPECT().
			CreatePeeringConnection(opts.ProjectID, request).
			Return(&mongodbatlas.Peer{}, nil).
			Times(1)
		if err := opts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
	t.Run("container does not exist", func(t *testing.T) {
		mockStore.
			EXPECT().
			AzureContainers(opts.ProjectID).
			Return(nil, nil).
			Times(1)
		containerRequest := opts.newContainer()
		mockStore.
			EXPECT().
			CreateContainer(opts.ProjectID, containerRequest).
			Return(&mongodbatlas.Container{ID: "ID"}, nil).
			Times(1)

		request := opts.newPeer("ID")
		mockStore.
			EXPECT().
			CreatePeeringConnection(opts.ProjectID, request).
			Return(&mongodbatlas.Peer{}, nil).
			Times(1)
		if err := opts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}

func TestAzureBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		AzureBuilder(),
		0,
		[]string{flag.Output, flag.ProjectID, flag.ResourceGroup, flag.VNet, flag.AtlasCIDRBlock, flag.Region, flag.DirectoryID, flag.SubscriptionID},
	)
}
