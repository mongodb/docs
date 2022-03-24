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

//go:build e2e || (remote && replica && (cloudmanager || om44 || om50))

package cloud_manager_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestAgents(t *testing.T) {
	cliPath, err := e2e.Bin()
	require.NoError(t, err)

	var hostname string
	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			agentsEntity,
			"list",
			"AUTOMATION",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)

		if a.NoError(err, string(resp)) {
			var servers *opsmngr.Agents
			err := json.Unmarshal(resp, &servers)
			require.NoError(t, err)
			a.NotZero(servers.TotalCount)
			hostname = servers.Results[0].Hostname
		}
	})

	t.Run("Version List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			agentsEntity,
			"version",
			"list",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)

		if a.NoError(err, string(resp)) {
			var agents *opsmngr.AgentVersions
			err := json.Unmarshal(resp, &agents)
			require.NoError(t, err)
			a.NotZero(agents.Count)
		}
	})

	t.Run("Enable backup", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			backupEntity,
			"enable",
			hostname,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})
	t.Run("Disable backup", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			backupEntity,
			"disable",
			hostname,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})

	t.Run("Enable monitoring", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			monitoringEntity,
			"enable",
			hostname,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})
	t.Run("Disable monitoring", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			monitoringEntity,
			"disable",
			hostname,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})
}
