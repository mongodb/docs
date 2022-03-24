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

func TestVictorOpsOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockIntegrationCreator(ctrl)
	defer ctrl.Finish()

	opts := &VictorOpsOpts{
		store: mockStore,
	}

	expected := &mongodbatlas.ThirdPartyIntegrations{}
	mockStore.
		EXPECT().
		CreateIntegration(opts.ProjectID, victorOpsIntegrationType, opts.newVictorOpsIntegration()).
		Return(expected, nil).
		Times(1)

	if err := opts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestVictorOpsBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		VictorOpsBuilder(),
		0,
		[]string{flag.APIKey, flag.RoutingKey, flag.ProjectID},
	)
}
