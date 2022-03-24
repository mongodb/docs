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
//go:build e2e || (atlas && clusters && file)

package atlas_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestClustersFile(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("clustersFile")

	cliPath, err := e2e.AtlasCLIBin()
	req := require.New(t)
	req.NoError(err)

	clusterFileName, err := RandClusterName()
	req.NoError(err)

	clusterFile := "create_cluster_test.json"
	if service := os.Getenv("MCLI_SERVICE"); service == config.CloudGovService {
		clusterFile = "create_cluster_gov_test.json"
	}

	t.Run("Create via file", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"create",
			clusterFileName,
			"--file", clusterFile,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var cluster mongodbatlas.AdvancedCluster
		err = json.Unmarshal(resp, &cluster)
		req.NoError(err)

		ensureCluster(t, &cluster, clusterFileName, e2eMDBVer, 30)
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"watch",
			"--projectId", g.projectID,
			clusterFileName,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		a := assert.New(t)
		a.Contains(string(resp), "Cluster available")
	})

	t.Run("Update via file", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"update",
			clusterFileName,
			"--file=update_cluster_test.json",
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var cluster mongodbatlas.AdvancedCluster
		err = json.Unmarshal(resp, &cluster)
		req.NoError(err)

		ensureCluster(t, &cluster, clusterFileName, e2eMDBVer, 40)
	})

	t.Run("Delete file creation", func(t *testing.T) {
		cmd := exec.Command(cliPath, clustersEntity, "delete", clusterFileName, "--projectId", g.projectID, "--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		expected := fmt.Sprintf("Cluster '%s' deleted\n", clusterFileName)
		a := assert.New(t)
		a.Equal(expected, string(resp))
	})

	t.Run("Watch deletion", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"watch",
			clusterFileName,
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		// this command will fail with 404 once the cluster is deleted
		// we just need to wait for this to close the project
		resp, _ := cmd.CombinedOutput()
		t.Log(string(resp))
	})
}
