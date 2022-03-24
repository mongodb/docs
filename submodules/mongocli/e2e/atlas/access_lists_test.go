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
//go:build e2e || (atlas && generic)

package atlas_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"testing"
	"time"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestAccessList(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("accessList")

	n, err := e2e.RandInt(255)
	a := assert.New(t)
	req := require.New(t)
	req.NoError(err)

	entry := fmt.Sprintf("192.168.0.%d", n)
	currentIPEntry := ""

	cliPath, err := e2e.AtlasCLIBin()
	req.NoError(err)

	t.Run("Create Forever", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"create",
			entry,
			"--comment=test",
			"--projectId",
			g.projectID,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		var entries *mongodbatlas.ProjectIPAccessLists
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)

		found := false
		for i := range entries.Results {
			if entries.Results[i].IPAddress == entry {
				found = true
				break
			}
		}

		a.True(found)
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)
		var entries *mongodbatlas.ProjectIPAccessLists
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"describe",
			entry,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)
		var entry *mongodbatlas.ProjectIPAccessList
		err = json.Unmarshal(resp, &entry)
		req.NoError(err)
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"delete",
			entry,
			"--projectId",
			g.projectID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		expected := fmt.Sprintf("Project access list entry '%s' deleted\n", entry)
		a.Equal(expected, string(resp))
	})

	t.Run("Create Delete After", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"create",
			entry,
			"--deleteAfter="+time.Now().Add(time.Minute*time.Duration(5)).Format(time.RFC3339),
			"--comment=test",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		var entries *mongodbatlas.ProjectIPAccessLists
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)

		found := false
		for i := range entries.Results {
			if entries.Results[i].IPAddress == entry {
				found = true
				break
			}
		}
		a.True(found)
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"delete",
			entry,
			"--projectId",
			g.projectID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		expected := fmt.Sprintf("Project access list entry '%s' deleted\n", entry)
		a.Equal(expected, string(resp))
	})

	t.Run("Create with CurrentIp", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"create",
			"--currentIp",
			"--comment=test",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		var entries *mongodbatlas.ProjectIPAccessLists
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)

		a.NotEmpty(entries.Results)
		a.Len(entries.Results, 1)

		currentIPEntry = entries.Results[0].IPAddress
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessListEntity,
			"delete",
			currentIPEntry,
			"--projectId",
			g.projectID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)

		expected := fmt.Sprintf("Project access list entry '%s' deleted\n", currentIPEntry)
		a.Equal(expected, string(resp))
	})
}
