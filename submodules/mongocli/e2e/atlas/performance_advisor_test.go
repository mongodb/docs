// Copyright 2021 MongoDB Inc
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
//go:build e2e || (atlas && performanceAdvisor)

package atlas_test

import (
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
)

func TestPerformanceAdvisor(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("performanceAdvisor")

	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	hostname, err := g.getHostnameAndPort()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("List namespaces", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			performanceAdvisorEntity,
			namespacesEntity,
			"list",
			"--processName", hostname,
			"--projectId", g.projectID,
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
	})

	t.Run("List slow query logs", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			performanceAdvisorEntity,
			slowQueryLogsEntity,
			"list",
			"--processName", hostname,
			"--projectId", g.projectID,
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
	})

	t.Run("List suggested indexes", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			performanceAdvisorEntity,
			suggestedIndexesEntity,
			"list",
			"--processName", hostname,
			"--projectId", g.projectID,
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
	})

	t.Run("Enable Managed Slow Operation Threshold", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			performanceAdvisorEntity,
			slowoperationThresholdEntity,
			"enable",
			"--projectId", g.projectID,
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
	})

	t.Run("Disable Managed Slow Operation Threshold", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			performanceAdvisorEntity,
			slowoperationThresholdEntity,
			"disable",
			"--projectId", g.projectID,
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
	})
}
