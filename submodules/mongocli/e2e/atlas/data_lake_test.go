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
//go:build e2e || (atlas && datalake)

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

func TestDataLakes(t *testing.T) {
	cliPath, err := e2e.AtlasCLIBin()
	r := require.New(t)
	r.NoError(err)

	n, err := e2e.RandInt(1000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	dataLakeName := fmt.Sprintf("e2e-data-lake-%v", n)
	testBucket := os.Getenv("E2E_TEST_BUCKET")
	r.NotEmpty(testBucket)
	roleID := os.Getenv("E2E_CLOUD_ROLE_ID")
	r.NotEmpty(roleID)

	t.Run("Create", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			datalakeEntity,
			"create",
			dataLakeName,
			"--role",
			roleID,
			"--testBucket",
			testBucket,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		r.NoError(err, string(resp))

		a := assert.New(t)
		var dataLake atlas.DataLake
		if err = json.Unmarshal(resp, &dataLake); a.NoError(err) {
			a.Equal(dataLakeName, dataLake.Name)
		}
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			datalakeEntity,
			"describe",
			dataLakeName,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		r.NoError(err, string(resp))

		a := assert.New(t)
		var dataLake atlas.DataLake
		if err = json.Unmarshal(resp, &dataLake); a.NoError(err) {
			a.Equal(dataLakeName, dataLake.Name)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			datalakeEntity,
			"ls",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		r.NoError(err, string(resp))

		var r []atlas.DataLake
		a := assert.New(t)
		if err = json.Unmarshal(resp, &r); a.NoError(err) {
			a.NotEmpty(r)
		}
	})

	t.Run("Update", func(t *testing.T) {
		const updateRegion = "VIRGINIA_USA"
		cmd := exec.Command(cliPath,
			datalakeEntity,
			"update",
			dataLakeName,
			"--region",
			updateRegion,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		r.NoError(err, string(resp))

		var dataLake atlas.DataLake
		a := assert.New(t)
		if err = json.Unmarshal(resp, &dataLake); a.NoError(err) {
			a.Equal(updateRegion, dataLake.DataProcessRegion.Region)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			datalakeEntity,
			"delete",
			dataLakeName,
			"--force")
		cmd.Env = os.Environ()

		resp, err := cmd.CombinedOutput()
		r.NoError(err, string(resp))

		expected := fmt.Sprintf("Data Lake '%s' deleted\n", dataLakeName)
		assert.Equal(t, expected, string(resp))
	})
}
