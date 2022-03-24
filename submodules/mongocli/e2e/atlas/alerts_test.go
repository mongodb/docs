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
	"testing"
	"time"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

const (
	open                        = "OPEN"
	usersWithoutMultiFactorAuth = "USERS_WITHOUT_MULTI_FACTOR_AUTH"
)

func TestAlerts(t *testing.T) {
	var alertID string

	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	// This test should be run before all other tests to grab an alert ID for all other tests
	t.Run("List with no status", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"list",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alerts mongodbatlas.AlertsResponse
			err := json.Unmarshal(resp, &alerts)
			a.NoError(err)
			a.NotEmpty(alerts.Results)
			alertID = alerts.Results[0].ID
		}
	})

	t.Run("List with status OPEN", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"list",
			"--status",
			"OPEN",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})

	t.Run("List with status CLOSED", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"list",
			"--status",
			"CLOSED",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		assert.NoError(t, err, string(resp))
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"describe",
			alertID,
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.Alert
			err := json.Unmarshal(resp, &alert)
			a.NoError(err)
			a.Equal(alertID, alert.ID)
			a.Equal(open, alert.Status)
			a.Equal(usersWithoutMultiFactorAuth, alert.EventTypeName)
		}
	})

	t.Run("Acknowledge", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"ack",
			alertID,
			"--until",
			time.Now().Format(time.RFC3339),
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.Alert
			err := json.Unmarshal(resp, &alert)
			a.NoError(err)
			a.Equal(alertID, alert.ID)
		}
	})

	t.Run("Acknowledge Forever", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"ack",
			alertID,
			"--forever",
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.Alert
			err := json.Unmarshal(resp, &alert)
			a.NoError(err)
			a.Equal(alertID, alert.ID)
		}
	})

	t.Run("UnAcknowledge", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			alertsEntity,
			"unack",
			alertID,
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var alert mongodbatlas.Alert
			err := json.Unmarshal(resp, &alert)
			a.NoError(err)
			a.Equal(alertID, alert.ID)
		}
	})
}
