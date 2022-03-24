// Copyright 2021 MongoDB Inc
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

package aws

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
)

func TestDeauthorizeOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockCloudProviderAccessRoleDeauthorizer(ctrl)
	defer ctrl.Finish()

	opts := &DeauthorizeOpts{
		store: mockStore,
		DeleteOpts: &cli.DeleteOpts{
			Entry:   "to_delete",
			Confirm: true,
		},
	}

	mockStore.
		EXPECT().
		DeauthorizeCloudProviderAccessRoles(opts.newCloudProviderDeauthorizationRequest()).
		Return(nil).
		Times(1)

	if err := opts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestDeauthorizeBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		DeauthorizeBuilder(),
		0,
		[]string{flag.ProjectID, flag.Force},
	)
}
