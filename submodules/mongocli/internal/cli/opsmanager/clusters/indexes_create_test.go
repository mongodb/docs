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

package clusters

import (
	"testing"

	"github.com/mongodb/mongocli/internal/cli"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test/fixture"
)

func TestIndexesCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAutomationPatcher(ctrl)
	defer ctrl.Finish()

	expected := fixture.AutomationConfig()

	createOpts := &IndexesCreateOpts{
		GlobalOpts:      cli.GlobalOpts{},
		name:            "index",
		db:              "db",
		collection:      "db",
		rsName:          "rsName",
		locale:          "locale",
		caseFirst:       "test",
		alternate:       "alternate",
		maxVariable:     "max",
		strength:        0,
		caseLevel:       false,
		numericOrdering: false,
		normalization:   false,
		backwards:       false,
		keys:            []string{"field:key", "field:key", "field:key"},
		store:           mockStore,
	}

	mockStore.
		EXPECT().
		GetAutomationConfig(createOpts.ProjectID).
		Return(expected, nil).
		Times(1)

	mockStore.
		EXPECT().
		UpdateAutomationConfig(createOpts.ProjectID, expected).
		Return(nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
