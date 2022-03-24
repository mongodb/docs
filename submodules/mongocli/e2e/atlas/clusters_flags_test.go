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
//go:build e2e || (atlas && clusters && flags)

package atlas_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestClustersFlags(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("clustersFlags")

	cliPath, err := e2e.AtlasCLIBin()
	req := require.New(t)
	req.NoError(err)

	clusterName, err := RandClusterName()
	req.NoError(err)

	region, err := g.newAvailableRegion(tierM30, e2eClusterProvider)
	req.NoError(err)

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"create",
			clusterName,
			"--region", region,
			"--members=3",
			"--tier", tierM30,
			"--provider", e2eClusterProvider,
			"--mdbVersion", e2eMDBVer,
			"--diskSizeGB", diskSizeGB30,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var cluster *mongodbatlas.AdvancedCluster
		err = json.Unmarshal(resp, &cluster)
		req.NoError(err)

		ensureCluster(t, cluster, clusterName, e2eMDBVer, 30)
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"watch",
			clusterName,
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		a := assert.New(t)
		a.Contains(string(resp), "Cluster available")
	})

	t.Run("Load Sample Data", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"loadSampleData",
			clusterName,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var job *mongodbatlas.SampleDatasetJob
		err = json.Unmarshal(resp, &job)
		req.NoError(err)

		a := assert.New(t)
		a.Equal(clusterName, job.ClusterName)
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"ls",
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var clusters mongodbatlas.AdvancedClustersResponse
		err = json.Unmarshal(resp, &clusters)
		req.NoError(err)

		a := assert.New(t)
		a.NotEmpty(clusters.Results)
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"describe",
			clusterName,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var cluster mongodbatlas.AdvancedCluster
		err = json.Unmarshal(resp, &cluster)
		req.NoError(err)

		a := assert.New(t)
		a.Equal(clusterName, cluster.Name)
	})

	t.Run("Describe Connection String", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"cs",
			"describe",
			clusterName,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var connectionString mongodbatlas.ConnectionStrings
		err = json.Unmarshal(resp, &connectionString)
		req.NoError(err)

		a := assert.New(t)
		a.NotEmpty(connectionString.Standard)
		a.NotEmpty(connectionString.StandardSrv)
	})

	t.Run("Create Rolling Index", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"indexes",
			"create",
			"--clusterName", clusterName,
			"--db=tes",
			"--collection=tes",
			"--key=name:1",
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))
	})

	t.Run("Update", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"update",
			clusterName,
			"--diskSizeGB", diskSizeGB40,
			"--mdbVersion=5.0",
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		var cluster mongodbatlas.AdvancedCluster
		err = json.Unmarshal(resp, &cluster)
		req.NoError(err)

		ensureCluster(t, &cluster, clusterName, "5.0", 40)
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath, clustersEntity, "delete", clusterName, "--projectId", g.projectID, "--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		expected := fmt.Sprintf("Cluster '%s' deleted\n", clusterName)
		a := assert.New(t)
		a.Equal(expected, string(resp))
	})

	t.Run("Watch deletion", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"watch",
			clusterName,
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		// this command will fail with 404 once the cluster is deleted
		// we just need to wait for this to close the project
		resp, _ := cmd.CombinedOutput()
		t.Log(string(resp))
	})
}
