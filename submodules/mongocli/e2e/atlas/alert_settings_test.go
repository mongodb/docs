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
//go:build e2e || (atlas && generic)

package atlas_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"strconv"
	"testing"

	"github.com/go-test/deep"
	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

const (
	group         = "GROUP"
	eventTypeName = "NO_PRIMARY"
	intervalMin   = 5
	delayMin      = 0
)

func TestAlertConfig(t *testing.T) {
	var alertID string

	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			configEntity,
			"create",
			"--event",
			eventTypeName,
			"--enabled=true",
			"--notificationType",
			group,
			"--notificationIntervalMin",
			strconv.Itoa(intervalMin),
			"--notificationDelayMin",
			strconv.Itoa(delayMin),
			"--notificationSmsEnabled=false",
			"--notificationEmailEnabled=true",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.AlertConfiguration
			if err := json.Unmarshal(resp, &alert); a.NoError(err) {
				a.Equal(eventTypeName, alert.EventTypeName)
				a.NotEmpty(alert.Notifications)
				a.Equal(delayMin, *alert.Notifications[0].DelayMin)
				a.Equal(group, alert.Notifications[0].TypeName)
				a.Equal(intervalMin, alert.Notifications[0].IntervalMin)
				a.False(*alert.Notifications[0].SMSEnabled)
				alertID = alert.ID
			}
		}
	})
	if alertID == "" {
		assert.FailNow(t, "Failed to create alert setting")
	}

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			configEntity,
			"ls",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})

	t.Run("Update", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			configEntity,
			"update",
			alertID,
			"--event",
			eventTypeName,
			"--notificationType",
			group,
			"--notificationIntervalMin",
			strconv.Itoa(intervalMin),
			"--notificationDelayMin",
			strconv.Itoa(delayMin),
			"--notificationSmsEnabled=true",
			"--notificationEmailEnabled=true",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.AlertConfiguration
			if err := json.Unmarshal(resp, &alert); a.NoError(err) {
				a.False(*alert.Enabled)
				a.NotEmpty(alert.Notifications)
				a.True(*alert.Notifications[0].SMSEnabled)
				a.True(*alert.Notifications[0].EmailEnabled)
			}
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath, alertsEntity, configEntity, "delete", alertID, "--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		assert.NoError(t, err, string(resp))
	})

	t.Run("List Matcher Fields", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			configEntity,
			"fields",
			"type",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var fields []string
		if err := json.Unmarshal(resp, &fields); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		expected := []string{
			"TYPE_NAME",
			"HOSTNAME",
			"PORT",
			"HOSTNAME_AND_PORT",
			"REPLICA_SET_NAME",
			"SHARD_NAME",
			"CLUSTER_NAME",
		}
		if diff := deep.Equal(fields, expected); diff != nil {
			t.Error(diff)
		}
	})
}
