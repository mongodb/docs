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
//go:build e2e || (atlas && ldap)

package atlas_test

import (
	"bytes"
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

const (
	pending          = "PENDING"
	ldapHostname     = "localhost"
	ldapPort         = "19657"
	ldapBindPassword = "admin"
)

func TestLDAPWithFlags(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("ldap")

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	var requestID string
	t.Run("Verify", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"verify",
			"--hostname",
			ldapHostname,
			"--port",
			ldapPort,
			"--bindUsername",
			"cn=admin,dc=example,dc=org",
			"--bindPassword",
			ldapBindPassword,
			"--projectId", g.projectID,
			"-o",
			"json")

		requestID = testLDAPVerifyCmd(t, cmd)
	})

	require.NotEmpty(t, requestID)

	t.Run("Watch", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"verify",
			"status",
			"watch",
			requestID,
			"--projectId", g.projectID,
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))
		assert.Contains(t, string(resp), "LDAP Configuration request completed.")
	})

	t.Run("Get Status", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"verify",
			"status",
			requestID,
			"--projectId", g.projectID,
			"-o",
			"json",
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))

		a := assert.New(t)
		var configuration mongodbatlas.LDAPConfiguration
		if err := json.Unmarshal(resp, &configuration); a.NoError(err) {
			a.Equal(requestID, configuration.RequestID)
		}
	})

	t.Run("Save", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"save",
			"--hostname",
			ldapHostname,
			"--port",
			ldapPort,
			"--bindUsername",
			"cn=admin,dc=example,dc=org",
			"--bindPassword",
			ldapBindPassword,
			"--mappingMatch",
			"(.+)@ENGINEERING.EXAMPLE.COM",
			"--mappingSubstitution",
			"cn={0},ou=engineering,dc=example,dc=com",
			"--projectId", g.projectID,
			"-o",
			"json",
		)

		testLDAPSaveCmd(t, cmd)
	})

	t.Run("Get", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"get",
			"--projectId", g.projectID,
			"-o",
			"json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))

		a := assert.New(t)
		var configuration mongodbatlas.LDAPConfiguration
		if err := json.Unmarshal(resp, &configuration); a.NoError(err) {
			a.Equal(ldapHostname, configuration.LDAP.Hostname)
			requestID = configuration.RequestID
		}
	})

	t.Run("Delete", func(t *testing.T) {
		testLDAPDelete(t, cliPath, g.projectID)
	})
}

func TestLDAPWithStdin(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("ldap")

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	var requestID string

	t.Run("Verify", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"verify",
			"--hostname",
			ldapHostname,
			"--port",
			ldapPort,
			"--bindUsername",
			"cn=admin,dc=example,dc=org",
			"--projectId", g.projectID,
			"-o",
			"json")

		passwordStdin := bytes.NewBuffer([]byte(ldapBindPassword))
		cmd.Stdin = passwordStdin

		requestID = testLDAPVerifyCmd(t, cmd)
	})

	require.NotEmpty(t, requestID)

	t.Run("Save", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			securityEntity,
			ldapEntity,
			"save",
			"--hostname",
			ldapHostname,
			"--port",
			ldapPort,
			"--bindUsername",
			"cn=admin,dc=example,dc=org",
			"--mappingMatch",
			"(.+)@ENGINEERING.EXAMPLE.COM",
			"--mappingSubstitution",
			"cn={0},ou=engineering,dc=example,dc=com",
			"--projectId", g.projectID,
			"-o",
			"json",
		)

		passwordStdin := bytes.NewBuffer([]byte(ldapBindPassword))
		cmd.Stdin = passwordStdin

		testLDAPSaveCmd(t, cmd)
	})

	t.Run("Delete", func(t *testing.T) {
		testLDAPDelete(t, cliPath, g.projectID)
	})
}

func testLDAPDelete(t *testing.T, cliPath, projectID string) {
	t.Helper()

	cmd := exec.Command(cliPath,
		securityEntity,
		ldapEntity,
		"delete",
		"--projectId", projectID,
		"--force")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))
	assert.Contains(t, string(resp), "LDAP configuration userToDNMapping deleted")
}

func testLDAPVerifyCmd(t *testing.T, cmd *exec.Cmd) string {
	t.Helper()

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	a := assert.New(t)
	var configuration mongodbatlas.LDAPConfiguration
	if err := json.Unmarshal(resp, &configuration); a.NoError(err) {
		a.Equal(pending, configuration.Status)
		return configuration.RequestID
	}

	return ""
}

func testLDAPSaveCmd(t *testing.T, cmd *exec.Cmd) {
	t.Helper()

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	a := assert.New(t)
	var configuration mongodbatlas.LDAPConfiguration
	if err := json.Unmarshal(resp, &configuration); a.NoError(err) {
		a.Equal(ldapHostname, configuration.LDAP.Hostname)
	}
}
