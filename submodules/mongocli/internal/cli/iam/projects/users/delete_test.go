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

package users

import (
	"testing"

	"github.com/mongodb/mongocli/internal/cli"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
)

func TestDelete_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectUserDeleter(ctrl)
	defer ctrl.Finish()

	mockStore.
		EXPECT().
		DeleteUserFromProject(gomock.Eq("5a0a1e7e0f2912c554080adc"), gomock.Eq("213321ds12")).
		Return(nil).
		Times(1)

	opts := &DeleteOpts{
		store: mockStore,
		GlobalOpts: cli.GlobalOpts{
			ProjectID: "5a0a1e7e0f2912c554080adc",
		},
		DeleteOpts: &cli.DeleteOpts{
			Entry:   "213321ds12",
			Confirm: true,
		},
	}
	if err := opts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
