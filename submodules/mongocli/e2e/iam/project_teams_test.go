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
//go:build e2e || (iam && !om44 && !om50)

package iam_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestProjectTeams(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	n, err := e2e.RandInt(1000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	projectName := fmt.Sprintf("e2e-proj-%v", n)
	projectID, err := createProject(projectName)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	teamName := fmt.Sprintf("e2e-teams-%v", n)
	teamID, err := createTeam(teamName)

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	defer func() {
		if e := deleteProject(projectID); e != nil {
			t.Errorf("error deleting project: %v", e)
		}
		if e := deleteTeam(teamID); e != nil {
			t.Errorf("error deleting team: %v", e)
		}
	}()

	t.Run("Add", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			teamsEntity,
			"add",
			teamID,
			"--role",
			"GROUP_READ_ONLY",
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))

		var teams mongodbatlas.TeamsAssigned
		if err := json.Unmarshal(resp, &teams); a.NoError(err) {
			found := false
			for _, team := range teams.Results {
				if team.TeamID == teamID {
					found = true
					break
				}
			}
			a.True(found)
		}
	})

	t.Run("Update", func(t *testing.T) {
		roleName1 := "GROUP_READ_ONLY"
		roleName2 := "GROUP_DATA_ACCESS_READ_ONLY"
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			teamsEntity,
			"update",
			teamID,
			"--role",
			roleName1,
			"--role",
			roleName2,
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))

		var roles []mongodbatlas.TeamRoles
		if err = json.Unmarshal(resp, &roles); a.NoError(err) {
			a.Len(roles, 1)

			role := roles[0]
			a.Equal(teamID, role.TeamID)
			a.Len(role.RoleNames, 2)
			a.ElementsMatch([]string{roleName1, roleName2}, role.RoleNames)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			teamsEntity,
			"ls",
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		a.NoError(err, string(resp))

		var teams mongodbatlas.TeamsAssigned
		if err = json.Unmarshal(resp, &teams); a.NoError(err) {
			a.NotEmpty(teams.Results)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			teamsEntity,
			"delete",
			teamID,
			"--force",
			"--projectId",
			projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := fmt.Sprintf("Team '%s' deleted\n", teamID)
			a.Equal(expected, string(resp))
		}
	})
}
