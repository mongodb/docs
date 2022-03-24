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

var regionsAWS = []string{
	"us-east-1",
	"us-east-2",
	"us-west-1",
	"ca-central-1",
	"sa-east-1",
	"eu-west-1",
	"eu-central-1",
}

func TestPrivateEndpointsAWS(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("privateEndpointsAWS")

	n, err := e2e.RandInt(int64(len(regionsAWS)))
	require.NoError(t, err)

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	region := regionsAWS[n.Int64()]
	var id string

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"create",
			"--region="+region,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()

		a := assert.New(t)
		if resp, err := cmd.CombinedOutput(); a.NoError(err, string(resp)) {
			var r atlas.PrivateEndpointConnection
			if err = json.Unmarshal(resp, &r); a.NoError(err) {
				id = r.ID
			}
		}
	})
	require.NotEmpty(t, id)

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"describe",
			id,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)
		var r atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.Equal(id, r.ID)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var r []atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.NotEmpty(r)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"delete",
			id,
			"--projectId",
			g.projectID,
			"--force")
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		expected := fmt.Sprintf("Private endpoint '%s' deleted\n", id)
		a.Equal(expected, string(resp))
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			awsEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		// We expect a 404 error once the private endpoint has been completely deleted
		a.Error(err)
		a.Contains(string(resp), "404")
	})
}

var regionsAzure = []string{
	"US_EAST_2",
	"EUROPE_NORTH",
	"US_WEST_2",
	"ASIA_SOUTH_EAST",
}

func TestPrivateEndpointsAzure(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("privateEndpointsAzure")

	n, err := e2e.RandInt(int64(len(regionsAzure)))
	require.NoError(t, err)

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	region := regionsAzure[n.Int64()]
	var id string

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"create",
			"--region="+region,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()

		a := assert.New(t)
		if resp, err := cmd.CombinedOutput(); a.NoError(err, string(resp)) {
			var r atlas.PrivateEndpointConnection
			if err = json.Unmarshal(resp, &r); a.NoError(err) {
				id = r.ID
			}
		}
	})
	if id == "" {
		assert.FailNow(t, "Failed to create private endpoint")
	}

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		_, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err)
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"describe",
			id,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		var r atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.Equal(id, r.ID)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var r []atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.NotEmpty(r)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"delete",
			id,
			"--force",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		expected := fmt.Sprintf("Private endpoint '%s' deleted\n", id)
		a.Equal(expected, string(resp))
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			azureEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		// We expect a 404 error once the private endpoint has been completely deleted
		a.Error(err)
		a.Contains(string(resp), "404")
	})
}

var regionsGCP = []string{
	"CENTRAL_US",
	"US_EAST_4",
	"NORTH_AMERICA_NORTHEAST_1",
	"SOUTH_AMERICA_EAST_1",
	"WESTERN_US",
	"US_WEST_2",
	"AUSTRALIA_SOUTHEAST_2",
	"ASIA_SOUTHEAST_2",
	"WESTERN_EUROPE",
	"EUROPE_NORTH_1",
	"EUROPE_WEST_2",
	"EUROPE_CENTRAL_2",
}

func TestPrivateEndpointsGCP(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("privateEndpointsGPC")

	n, err := e2e.RandInt(int64(len(regionsGCP)))
	require.NoError(t, err)

	region := regionsGCP[n.Int64()]

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)
	var id string

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"create",
			"--region="+region,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()

		a := assert.New(t)
		if resp, err := cmd.CombinedOutput(); a.NoError(err, string(resp)) {
			var r atlas.PrivateEndpointConnection
			if err = json.Unmarshal(resp, &r); a.NoError(err) {
				id = r.ID
				a.NotEmpty(id)
			}
		}
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		_, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err)
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"describe",
			id,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		var r atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.Equal(id, r.ID)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var r []atlas.PrivateEndpointConnection
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.NotEmpty(r)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"delete",
			id,
			"--force",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		expected := fmt.Sprintf("Private endpoint '%s' deleted\n", id)
		a.Equal(expected, string(resp))
	})

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			gcpEntity,
			"watch",
			id,
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		// We expect a 404 error once the private endpoint has been completely deleted
		a.Error(err)
		a.Contains(string(resp), "404")
	})
}

func TestRegionalizedPrivateEndpointsSettings(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("regionalizedPrivateEndpointsSettings")

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	t.Run("Enable regionalized private endpoint setting", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			regionalModeEntity,
			"enable",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		a.Equal("Regionalized private endpoint setting enabled.\n", string(resp))
	})

	t.Run("Disable regionalized private endpoint setting", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			regionalModeEntity,
			"disable",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		a.Equal("Regionalized private endpoint setting disabled.\n", string(resp))
	})

	t.Run("Get regionalized private endpoint setting", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			privateEndpointsEntity,
			regionalModeEntity,
			"get",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))
		var r atlas.RegionalizedPrivateEndpointSetting
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.False(r.Enabled)
		}
	})
}
