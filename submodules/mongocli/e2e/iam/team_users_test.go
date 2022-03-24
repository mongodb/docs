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
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestTeamUsers(t *testing.T) {
	cliPath, err := e2e.Bin()
	require.NoError(t, err)

	n, err := e2e.RandInt(1000)
	require.NoError(t, err)

	teamName := fmt.Sprintf("teams%v", n)
	teamID, err := createTeam(teamName)
	require.NoError(t, err)
	defer func() {
		if e := deleteTeam(teamID); e != nil {
			t.Errorf("error deleting project: %v", e)
		}
	}()

	username, userID, err := OrgNUser(1)
	require.NoError(t, err)

	t.Run("Add", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			teamsEntity,
			usersEntity,
			"add",
			userID,
			"--teamId",
			teamID,
			"-o=json",
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var users []mongodbatlas.AtlasUser
		if err := json.Unmarshal(resp, &users); a.NoError(err) {
			found := false
			for _, user := range users {
				if user.Username == username {
					found = true
					break
				}
			}

			a.True(found)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			teamsEntity,
			usersEntity,
			"ls",
			"--teamId",
			teamID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)
		var teams []mongodbatlas.AtlasUser
		if err := json.Unmarshal(resp, &teams); a.NoError(err) {
			a.NotEmpty(teams)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			teamsEntity,
			usersEntity,
			"delete",
			userID,
			"--teamId",
			teamID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))

		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := fmt.Sprintf("User '%s' deleted from the team\n", userID)
			a.Equal(expected, string(resp))
		}
	})
}
