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
//go:build e2e || (iam && !om44)

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

const (
	roleName1 = "GROUP_READ_ONLY"
	roleName2 = "GROUP_DATA_ACCESS_READ_ONLY"
)

func TestProjectInvitations(t *testing.T) {
	cliPath, err := e2e.Bin()
	require.NoError(t, err)

	var invitationID string

	n, err := e2e.RandInt(1000)
	require.NoError(t, err)

	projectName := fmt.Sprintf("e2e-proj-%v", n)
	projectID, err := createProject(projectName)
	require.NoError(t, err)

	emailProject := fmt.Sprintf("test-%v@mongodb.com", n)

	defer func() {
		if e := deleteProject(projectID); e != nil {
			t.Errorf("error deleting project: %v", e)
		}
	}()

	t.Run("Invite", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"invite",
			emailProject,
			"--role",
			"GROUP_READ_ONLY",
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var invitation mongodbatlas.Invitation
		if err := json.Unmarshal(resp, &invitation); a.NoError(err) {
			a.Equal(emailProject, invitation.Username)
			require.NotEmpty(t, invitation.ID)
		}
		invitationID = invitation.ID
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"ls",
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var invitations []mongodbatlas.Invitation
		if err = json.Unmarshal(resp, &invitations); a.NoError(err) {
			a.NotEmpty(invitations)
		}
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"get",
			invitationID,
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var invitation mongodbatlas.Invitation
		if err = json.Unmarshal(resp, &invitation); a.NoError(err) {
			a.Equal(invitationID, invitation.ID)
		}
	})

	t.Run("Update by email", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"update",
			"--email",
			emailProject,
			"--role",
			roleName1,
			"--role",
			roleName2,
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var invitation mongodbatlas.Invitation
		if err = json.Unmarshal(resp, &invitation); a.NoError(err) {
			a.Equal(emailProject, invitation.Username)
			a.ElementsMatch([]string{roleName1, roleName2}, invitation.Roles)
		}
	})

	t.Run("Update by ID", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"update",
			invitationID,
			"--role",
			roleName1,
			"--role",
			roleName2,
			"--projectId",
			projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		a := assert.New(t)

		var invitation mongodbatlas.Invitation
		if err = json.Unmarshal(resp, &invitation); a.NoError(err) {
			a.Equal(emailProject, invitation.Username)
			a.ElementsMatch([]string{roleName1, roleName2}, invitation.Roles)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			invitationsEntity,
			"delete",
			invitationID,
			"--force",
			"--projectId",
			projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := fmt.Sprintf("Invitation '%s' deleted\n", invitationID)
			a.Equal(expected, string(resp))
		}
	})
}
