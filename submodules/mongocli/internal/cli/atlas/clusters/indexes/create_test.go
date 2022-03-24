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

package indexes

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
)

func TestCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockIndexCreator(ctrl)
	defer ctrl.Finish()

	createOpts := &CreateOpts{
		name:        "ProjectBar",
		clusterName: "US",
		db:          "test",
		collection:  "test",
		keys:        []string{"name:1"},
		store:       mockStore,
	}

	index, _ := createOpts.newIndex()
	mockStore.
		EXPECT().
		CreateIndex(createOpts.ProjectID, createOpts.clusterName, index).
		Return(nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestCreateBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		CreateBuilder(),
		0,
		[]string{flag.ClusterName, flag.Database, flag.Collection, flag.Key, flag.Sparse, flag.ProjectID},
	)
}
