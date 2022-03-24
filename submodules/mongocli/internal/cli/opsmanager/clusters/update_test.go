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

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test/fixture"
	"github.com/spf13/afero"
)

func TestUpdate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAutomationPatcher(ctrl)
	defer ctrl.Finish()

	expected := fixture.AutomationConfig()
	appFS := afero.NewMemMapFs()
	// create test file
	fileYML := `
---
name: "myReplicaSet"
version: 4.2.2
featureCompatibilityVersion: 4.0
processes:
  - hostname: host0
    dbPath: /data/myReplicaSet/rs1
    logPath: /data/myReplicaSet/rs1/mongodb.log
    priority: 1
    votes: 1
    port: 29010
  - hostname: host1
    dbPath: /data/myReplicaSet/rs2
    logPath: /data/myReplicaSet/rs2/mongodb.log
    priority: 1
    votes: 1
    port: 29020
  - hostname: host2
    dbPath: /data/myReplicaSet/rs3
    logPath: /data/myReplicaSet/rs3/mongodb.log
    priority: 1
    votes: 1
    port: 29030`
	fileName := "test_om_update.yml"
	_ = afero.WriteFile(appFS, fileName, []byte(fileYML), 0600)
	createOpts := &UpdateOpts{
		store:    mockStore,
		fs:       appFS,
		filename: fileName,
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
