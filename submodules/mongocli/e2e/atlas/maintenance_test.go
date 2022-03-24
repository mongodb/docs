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

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestMaintenanceWindows(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("maintenance")

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	t.Run("update", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			maintenanceEntity,
			"update",
			"--dayOfWeek",
			"1",
			"--hourOfDay",
			"1",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := "Maintenance window updated.\n"
			a.Equal(expected, string(resp))
		}
	})

	t.Run("describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			maintenanceEntity,
			"describe",
			"-o",
			"json",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var maintenanceWindow mongodbatlas.MaintenanceWindow
		if err := json.Unmarshal(resp, &maintenanceWindow); a.NoError(err) {
			a.Equal(1, maintenanceWindow.DayOfWeek)
			a.Equal(1, *maintenanceWindow.HourOfDay)
		}
	})

	t.Run("clear", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			maintenanceEntity,
			"clear",
			"--force",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := "Maintenance window removed.\n"
			a.Equal(expected, string(resp))
		}
	})
}
