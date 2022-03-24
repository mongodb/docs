// Copyright 2022 MongoDB Inc
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

package gcp

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestWatch_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockPrivateEndpointDescriber(ctrl)
	defer ctrl.Finish()

	describeOpts := &WatchOpts{
		id:    "test",
		store: mockStore,
	}

	expected := &mongodbatlas.PrivateEndpointConnection{Status: "AVAILABLE"}

	mockStore.
		EXPECT().
		PrivateEndpoint(describeOpts.ProjectID, provider, describeOpts.id).
		Return(expected, nil).
		Times(1)

	if err := describeOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestWatchBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		WatchBuilder(),
		0,
		[]string{flag.ProjectID},
	)
}
