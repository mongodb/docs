// Copyright 2022 MongoDB Inc
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
//go:build e2e || (atlas && interactive)

package atlas_test

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"testing"

	"github.com/mongodb/mongodb-atlas-cli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
	exec "golang.org/x/sys/execabs"
)

func TestSetup(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("setup")

	cliPath, err := e2e.AtlasCLIBin()
	req := require.New(t)
	req.NoError(err)

	clusterName, err := RandClusterName()
	req.NoError(err)

	dbUserUsername, err := RandUsername()
	req.NoError(err)

	t.Run("Run", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			"setup",
			"--clusterName", clusterName,
			"--username", dbUserUsername,
			"--skipMongosh",
			"--skipSampleData",
			"--projectId", g.projectID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if !strings.Contains(string(resp), "Cluster created.") {
			fmt.Println("Cluster was not created see response:")
			fmt.Println(string(resp))
			assert.FailNow(t, "Failed to create M0 cluster.")
		}

		req.NoError(err, string(resp))
	})

	t.Run("WatchCluster", func(t *testing.T) {
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

	t.Run("DescribeDbUser", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"describe",
			dbUserUsername,
			"-o=json",
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))

		var user mongodbatlas.DatabaseUser
		require.NoError(t, json.Unmarshal(resp, &user), string(resp))
		if user.Username != dbUserUsername {
			t.Fatalf("expected username to match %v, got %v", dbUserUsername, user.Username)
		}
	})

	t.Run("DeleteCluster", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			clustersEntity,
			"delete",
			clusterName,
			"--force",
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err, string(resp))

		expected := fmt.Sprintf("Cluster '%s' deleted\n", clusterName)
		a := assert.New(t)
		a.Equal(expected, string(resp))
	})
}
