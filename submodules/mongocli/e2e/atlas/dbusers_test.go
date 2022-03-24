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
//go:build e2e || (atlas && generic)

package atlas_test

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"os"
	"os/exec"
	"testing"
	"time"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

const (
	roleReadWrite        = "readWrite"
	scopeClusterDataLake = "Cluster0,Cluster1:CLUSTER"
	clusterName0         = "Cluster0"
	clusterName1         = "Cluster1"
	clusterType          = "CLUSTER"
)

func TestDBUserWithFlags(t *testing.T) {
	username, err := generateUsername()
	require.NoError(t, err)

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	t.Run("Create", func(t *testing.T) {
		pwd, err := generateRandomBase64String(14)
		require.NoError(t, err)
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"create",
			"atlasAdmin",
			"--deleteAfter", time.Now().AddDate(0, 0, 1).Format(time.RFC3339),
			"--username", username,
			"--password", pwd,
			"--scope", scopeClusterDataLake,
			"-o=json",
		)

		testCreateUserCmd(t, cmd, username)
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"ls",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		require.NoError(t, err, string(resp))

		var users []mongodbatlas.DatabaseUser
		require.NoError(t, json.Unmarshal(resp, &users), string(resp))

		if len(users) == 0 {
			t.Fatalf("expected len(users) > 0, got 0")
		}
	})

	t.Run("Describe", func(t *testing.T) {
		testDescribeUser(t, cliPath, username)
	})

	t.Run("Update", func(t *testing.T) {
		pwd, err := generateRandomBase64String(14)
		require.NoError(t, err)
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"update",
			username,
			"--role",
			roleReadWrite,
			"--scope",
			clusterName0,
			"--password",
			pwd,
			"-o=json")

		testUpdateUserCmd(t, cmd, username)
	})

	t.Run("Delete", func(t *testing.T) {
		testDeleteUser(t, cliPath, dbusersEntity, username)
	})
}

func TestDBUsersWithStdin(t *testing.T) {
	username, err := generateUsername()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("Create", func(t *testing.T) {
		pwd, err := generateRandomBase64String(14)
		require.NoError(t, err)
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"create",
			"atlasAdmin",
			"--deleteAfter", time.Now().AddDate(0, 0, 1).Format(time.RFC3339),
			"--username", username,
			"--scope", scopeClusterDataLake,
			"-o=json",
		)
		passwordStdin := bytes.NewBuffer([]byte(pwd))
		cmd.Stdin = passwordStdin

		testCreateUserCmd(t, cmd, username)
	})

	t.Run("Describe", func(t *testing.T) {
		testDescribeUser(t, cliPath, username)
	})

	t.Run("Update", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			dbusersEntity,
			"update",
			username,
			"--role",
			roleReadWrite,
			"--scope",
			clusterName0,
			"-o=json")

		testUpdateUserCmd(t, cmd, username)
	})

	t.Run("Delete", func(t *testing.T) {
		testDeleteUser(t, cliPath, dbusersEntity, username)
	})
}

func generateUsername() (string, error) {
	n, err := e2e.RandInt(1000)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("user-%v", n), nil
}

func testCreateUserCmd(t *testing.T, cmd *exec.Cmd, username string) {
	t.Helper()

	cmd.Env = os.Environ()

	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	var user mongodbatlas.DatabaseUser
	require.NoError(t, json.Unmarshal(resp, &user), string(resp))

	a := assert.New(t)
	a.Equal(username, user.Username)
	if a.Len(user.Scopes, 2) {
		a.Equal(user.Scopes[0].Name, clusterName0)
		a.Equal(user.Scopes[0].Type, clusterType)
		a.Equal(user.Scopes[1].Name, clusterName1)
		a.Equal(user.Scopes[1].Type, clusterType)
	}
}

func testDescribeUser(t *testing.T, cliPath, username string) {
	t.Helper()

	cmd := exec.Command(cliPath,
		dbusersEntity,
		"describe",
		username,
		"-o=json")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	var user mongodbatlas.DatabaseUser
	require.NoError(t, json.Unmarshal(resp, &user), string(resp))
	if user.Username != username {
		t.Fatalf("expected username to match %v, got %v", username, user.Username)
	}
}

func testUpdateUserCmd(t *testing.T, cmd *exec.Cmd, username string) {
	t.Helper()

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	var user mongodbatlas.DatabaseUser
	require.NoError(t, json.Unmarshal(resp, &user), string(resp))

	a := assert.New(t)
	a.Equal(username, user.Username)
	if a.Len(user.Roles, 1) {
		a.Equal("admin", user.Roles[0].DatabaseName)
		a.Equal(roleReadWrite, user.Roles[0].RoleName)
	}

	a.Len(user.Scopes, 1)
	a.Equal(user.Scopes[0].Name, clusterName0)
	a.Equal(user.Scopes[0].Type, clusterType)
}

func testDeleteUser(t *testing.T, cliPath, dbusersEntity, username string) {
	t.Helper()

	cmd := exec.Command(cliPath,
		dbusersEntity,
		"delete",
		username,
		"--force",
		"--authDB",
		"admin")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	require.NoError(t, err, string(resp))

	expected := fmt.Sprintf("DB user '%s' deleted\n", username)
	assert.Equal(t, expected, string(resp))
}

const asciiMax = 127

// generateRandomASCIIString generate a random string of printable ASCII characters.
func generateRandomASCIIString(length int) (string, error) {
	result := ""
	for {
		if len(result) >= length {
			return result, nil
		}
		num, err := rand.Int(rand.Reader, big.NewInt(int64(asciiMax)))
		if err != nil {
			return "", err
		}
		n := num.Int64()
		// Make sure that the number/byte/letter is inside
		// the range of printable ASCII characters (excluding space and DEL)
		if n > 64 && n < asciiMax {
			result += string(rune(n))
		}
	}
}

// generateRandomBase64String generate a random ASCII string encoded using base64.
func generateRandomBase64String(length int) (string, error) {
	result, err := generateRandomASCIIString(length)
	return base64.StdEncoding.EncodeToString([]byte(result))[:length], err
}
