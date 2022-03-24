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
//go:build e2e || (atlas && networking)

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
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func TestDataLakePrivateEndpointsAWS(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("dataLakePrivateEndpointsAWS")

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	n, err := e2e.RandInt(int64(8000))
	require.NoError(t, err)
	vpcID := fmt.Sprintf("vpce-0fcd9d80bbafe%d", 1000+n.Int64())

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			datalakeEntity,
			awsEntity,
			"create",
			"--privateEndpointId="+vpcID,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()

		a := assert.New(t)
		if resp, err := cmd.CombinedOutput(); a.NoError(err, string(resp)) {
			var r atlas.PrivateLinkEndpointDataLakeResponse
			if err = json.Unmarshal(resp, &r); a.NoError(err) {
				a.NotEmpty(r.Results)
				a.Equal(r.Results[0].EndpointID, vpcID)
			}
		}
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			datalakeEntity,
			awsEntity,
			"describe",
			vpcID,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)
		var r atlas.PrivateLinkEndpointDataLake
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.Equal(vpcID, r.EndpointID)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			datalakeEntity,
			awsEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var r atlas.PrivateLinkEndpointDataLakeResponse
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.NotEmpty(r)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			datalakeEntity,
			awsEntity,
			"delete",
			vpcID,
			"--projectId",
			g.projectID,
			"--force")
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		expected := fmt.Sprintf("Private endpoint '%s' deleted\n", vpcID)
		a.Equal(expected, string(resp))
	})
}
