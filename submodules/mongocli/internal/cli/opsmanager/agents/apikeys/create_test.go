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
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAgentAPIKeyCreator(ctrl)
	defer ctrl.Finish()

	createOpts := &CreateOpts{
		store: mockStore,
	}

	expected := &opsmngr.AgentAPIKey{}

	mockStore.
		EXPECT().
		CreateAgentAPIKey(createOpts.OrgID, createOpts.newAgentAPIKeysRequest()).
		Return(expected, nil).
		Times(1)

	assert.NoError(t, createOpts.Run())
}
