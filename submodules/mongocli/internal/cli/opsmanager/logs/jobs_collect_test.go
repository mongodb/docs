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

package logs

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestLogsCollectOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockLogCollector(ctrl)
	defer ctrl.Finish()

	expected := &opsmngr.LogCollectionJob{ID: "1"}

	listOpts := &JobsCollectOpts{
		redacted:                  false,
		sizeRequestedPerFileBytes: 64,
		resourceType:              "CLUSTER",
		resourceName:              "",
		logTypes:                  []string{"AUTOMATION_AGENT"},
		store:                     mockStore,
	}

	mockStore.
		EXPECT().Collect(listOpts.ProjectID, listOpts.newLog()).
		Return(expected, nil).
		Times(1)

	if err := listOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
