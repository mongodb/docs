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
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/mongodb/mongocli/internal/convert"
)

func TestDeployReplicaSet(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	const testFile = "om-new-cluster.json"

	n, err := e2e.RandInt(1000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	clusterName := fmt.Sprintf("e2e-cluster-%v", n)

	hostname, err := automationServerHostname(cliPath)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if err := generateRSConfig(testFile, hostname, clusterName, testedMDBVersion, testedMDBFCV); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("Apply", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"apply",
			"-f",
			testFile,
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"ls",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
		var clusters []*convert.ClusterConfig
		if err := json.Unmarshal(resp, &clusters); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if len(clusters) == 0 {
			t.Errorf("expected len(clusters) > 0, got 0\n")
		}
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"describe",
			clusterName,
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
		var cluster convert.ClusterConfig
		if err := json.Unmarshal(resp, &cluster); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if cluster.Name != clusterName {
			t.Errorf("expected %s, got %s\n", clusterName, cluster.Name)
		}
	})

	t.Run("Reclaim free space", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"reclaimFreeSpace",
			clusterName,
			"--force",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("Restart", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"restart",
			clusterName,
			"--force",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("Shutdown", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"shutdown",
			clusterName,
			"--force",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("Unmanage", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"unmanage",
			clusterName,
			"--force",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("Stop Monitoring", func(t *testing.T) {
		hostIDs, err := hostIDs(cliPath)
		if err != nil {
			t.Fatalf("unexpected error: %v\n", err)
		}
		for _, h := range hostIDs {
			cmd := exec.Command(cliPath,
				entity,
				monitoringEntity,
				"rm",
				h,
				"--force",
			)

			cmd.Env = os.Environ()
			resp, err := cmd.CombinedOutput()

			if err != nil {
				t.Errorf("unexpected error: %v, resp: %v\n", err, string(resp))
			}
		}
	})
}

func TestDeployAndDeleteReplicaSet(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	const testFile = "om-new-cluster.json"

	n, err := e2e.RandInt(1000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	clusterName := fmt.Sprintf("e2e-cluster-%v", n)

	hostname, err := automationServerHostname(cliPath)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if err := generateRSConfig(testFile, hostname, clusterName, testedMDBVersion, testedMDBFCV); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("Apply", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"apply",
			"-f",
			testFile,
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})

	t.Run("Watch", watchAutomation(cliPath))

	t.Run("Delete Cluster", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			clustersEntity,
			"delete",
			clusterName,
			"--force",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	})
}
