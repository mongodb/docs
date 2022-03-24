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

package maintenance

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockOpsManagerMaintenanceWindowCreator(ctrl)
	defer ctrl.Finish()

	expected := &opsmngr.MaintenanceWindow{}

	t.Run("no access list", func(t *testing.T) {
		createOpts := &CreateOpts{
			store: mockStore,
		}

		mockStore.
			EXPECT().
			CreateOpsManagerMaintenanceWindow(createOpts.ProjectID, createOpts.newMaintenanceWindow()).
			Return(expected, nil).
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
		[]string{flag.ProjectID, flag.StartDate, flag.EndDate, flag.Description},
	)
}
