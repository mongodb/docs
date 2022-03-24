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
//go:build e2e || (atlas && onlinearchive)

package atlas_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestOnlineArchives(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("onlineArchives")

	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var archiveID string
	t.Run("Create", func(t *testing.T) {
		archiveID = createOnlineArchive(t, cliPath, g.projectID, g.clusterName)
	})

	if archiveID == "" {
		t.Fatal("Failed to create archive")
	}

	t.Run("Describe", func(t *testing.T) {
		describeOnlineArchive(t, cliPath, g.projectID, g.clusterName, archiveID)
	})

	t.Run("List", func(t *testing.T) {
		listOnlineArchives(t, cliPath, g.projectID, g.clusterName)
	})

	t.Run("Pause", func(t *testing.T) {
		pauseOnlineArchive(t, cliPath, g.projectID, g.clusterName, archiveID)
	})

	t.Run("Start", func(t *testing.T) {
		startOnlineArchive(t, cliPath, g.projectID, g.clusterName, archiveID)
	})

	t.Run("Update", func(t *testing.T) {
		updateOnlineArchive(t, cliPath, g.projectID, g.clusterName, archiveID)
	})

	t.Run("Delete", func(t *testing.T) {
		deleteOnlineArchive(t, cliPath, g.projectID, g.clusterName, archiveID)
	})
}

func deleteOnlineArchive(t *testing.T, cliPath, projectID, clusterName, archiveID string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"rm",
		archiveID,
		"--clusterName", clusterName,
		"--projectId", projectID,
		"--force")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}
	expected := fmt.Sprintf("Archive '%s' deleted\n", archiveID)
	assert.Equal(t, string(resp), expected)
}

func startOnlineArchive(t *testing.T, cliPath, projectID, clusterName, archiveID string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"start",
		archiveID,
		"--clusterName", clusterName,
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	// online archive never reaches goal state as the db and collection must exists
	const expectedError = "ONLINE_ARCHIVE_CANNOT_MODIFY_FIELD"
	if err != nil && !strings.Contains(string(resp), expectedError) {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}
}

func pauseOnlineArchive(t *testing.T, cliPath, projectID, clusterName, archiveID string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"pause",
		archiveID,
		"--clusterName", clusterName,
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	// online archive never reaches goal state as the db and collection must exists
	const expectedError = "ONLINE_ARCHIVE_MUST_BE_ACTIVE_TO_PAUSE"
	if err != nil && !strings.Contains(string(resp), expectedError) {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}
}

func updateOnlineArchive(t *testing.T, cliPath, projectID, clusterName, archiveID string) {
	t.Helper()
	const expireAfterDays = float64(4)
	expireAfterDaysStr := fmt.Sprintf("%.0f", expireAfterDays)
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"update",
		archiveID,
		"--clusterName", clusterName,
		"--projectId", projectID,
		"--archiveAfter", expireAfterDaysStr,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}
	var archive mongodbatlas.OnlineArchive
	if err = json.Unmarshal(resp, &archive); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	assert.Equal(t, expireAfterDays, *archive.Criteria.ExpireAfterDays)
}

func describeOnlineArchive(t *testing.T, cliPath, projectID, clusterName, archiveID string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"describe",
		archiveID,
		"--clusterName", clusterName,
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}

	var archive mongodbatlas.OnlineArchive
	if err = json.Unmarshal(resp, &archive); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	assert.Equal(t, archiveID, archive.ID)
}

func listOnlineArchives(t *testing.T, cliPath, projectID, clusterName string) {
	t.Helper()
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"list",
		"--clusterName", clusterName,
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}
	var archives *mongodbatlas.OnlineArchives
	if err = json.Unmarshal(resp, &archives); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	assert.NotEmpty(t, archives)
}

func createOnlineArchive(t *testing.T, cliPath, projectID, clusterName string) string {
	t.Helper()
	const dbName = "test"
	cmd := exec.Command(cliPath,
		clustersEntity,
		onlineArchiveEntity,
		"create",
		"--clusterName", clusterName,
		"--db", dbName,
		"--collection=test",
		"--dateField=test",
		"--archiveAfter=3",
		"--partition=test",
		"--projectId", projectID,
		"-o=json")

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
	}

	var archive mongodbatlas.OnlineArchive
	if err = json.Unmarshal(resp, &archive); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	assert.Equal(t, dbName, archive.DBName)
	return archive.ID
}
