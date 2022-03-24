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

package apikeys

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectAPIKeyCreator(ctrl)
	defer ctrl.Finish()

	createOpts := &CreateOpts{
		store:       mockStore,
		description: "desc",
		roles:       []string{},
	}

	createOpts.ProjectID = "5a0a1e7e0f2912c554080adc"

	apiKey := &mongodbatlas.APIKeyInput{
		Desc:  createOpts.description,
		Roles: []string{},
	}
	expected := &mongodbatlas.APIKey{}

	mockStore.
		EXPECT().
		CreateProjectAPIKey(createOpts.ProjectID, apiKey).Return(expected, nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
