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
//go:build e2e || (atlas && metrics)

package atlas_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestMetrics(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("metrics")

	hostname, err := g.getHostnameAndPort()
	require.NoError(t, err)

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	t.Run("processes", func(t *testing.T) {
		process(t, cliPath, hostname, g.projectID)
	})

	t.Run("databases", func(t *testing.T) {
		databases(t, cliPath, hostname, g.projectID)
	})

	t.Run("disks", func(t *testing.T) {
		disks(t, cliPath, hostname, g.projectID)
	})
}

func process(t *testing.T, cliPath, hostname, projectID string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		metricsEntity,
		"processes",
		hostname,
		"--granularity=PT30M",
		"--period=P1DT12H",
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()

	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}

	metrics := &mongodbatlas.ProcessMeasurements{}
	err = json.Unmarshal(resp, &metrics)

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if metrics.Measurements == nil {
		t.Errorf("there are no measurements")
	}

	if len(metrics.Measurements) == 0 {
		t.Errorf("got=%#v\nwant=%#v\n", 0, "len(metrics.Measurements) > 0")
	}
}

func databases(t *testing.T, cliPath, hostname, projectID string) {
	t.Helper()
	t.Run("databases list", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			metricsEntity,
			"databases",
			"list",
			hostname,
			"--projectId", projectID,
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		var databases mongodbatlas.ProcessDatabasesResponse

		if err := json.Unmarshal(resp, &databases); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		const defaultNDatabases = 2
		if databases.TotalCount != defaultNDatabases {
			t.Errorf("got=%#v\nwant=%#v\n", databases.TotalCount, defaultNDatabases)
		}
	})

	t.Run("databases describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			metricsEntity,
			"databases",
			"describe",
			hostname,
			"config",
			"--granularity=PT30M",
			"--period=P1DT12H",
			"--projectId", projectID,
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		var metrics mongodbatlas.ProcessDatabaseMeasurements
		err = json.Unmarshal(resp, &metrics)

		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if metrics.Measurements == nil {
			t.Errorf("there are no measurements")
		}

		if len(metrics.Measurements) == 0 {
			t.Errorf("got=%#v\nwant=%#v\n", 0, "len(metrics.Measurements) > 0")
		}
	})
}

func disks(t *testing.T, cliPath, hostname, projectID string) {
	t.Helper()
	t.Run("disks list", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			metricsEntity,
			"disks",
			"list",
			hostname,
			"--projectId", projectID,
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var disks mongodbatlas.ProcessDisksResponse
		if err := json.Unmarshal(resp, &disks); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if disks.TotalCount != 1 {
			t.Errorf("got=%#v\nwant=%#v\n", disks.TotalCount, 1)
		}
	})

	t.Run("disks describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			metricsEntity,
			"disks",
			"describe",
			hostname,
			"data",
			"--granularity=PT30M",
			"--period=P1DT12H",
			"--projectId", projectID,
			"-o=json")

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		var metrics mongodbatlas.ProcessDiskMeasurements
		err = json.Unmarshal(resp, &metrics)

		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if metrics.Measurements == nil {
			t.Errorf("there are no measurements")
		}

		if len(metrics.Measurements) == 0 {
			t.Errorf("got=%#v\nwant=%#v\n", 0, "len(metrics.Measurements) > 0")
		}
	})
}
