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
//go:build e2e || iam

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

func TestProjectAPIKeys(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var ID string

	// This test must run first to grab the ID of the project to later describe
	t.Run("Create", func(t *testing.T) {
		const desc = "e2e-test"
		cmd := exec.Command(cliPath, iamEntity,
			projectsEntity,
			apiKeysEntity,
			"create",
			"--desc",
			desc,
			"--role=GROUP_READ_ONLY",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			var key mongodbatlas.APIKey
			if err := json.Unmarshal(resp, &key); err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			a.Equal(desc, key.Desc)
			ID = key.ID
		}
	})

	if ID == "" {
		assert.FailNow(t, "Failed to create API key")
	}

	defer func() {
		if e := deleteOrgAPIKey(ID); e != nil {
			t.Errorf("error deleting test apikey: %v", e)
		}
	}()

	t.Run("Assign", func(t *testing.T) {
		cmd := exec.Command(cliPath, iamEntity,
			projectsEntity,
			apiKeysEntity,
			"assign",
			ID,
			"--role=GROUP_DATA_ACCESS_READ_ONLY",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		assert.NoError(t, err, string(resp))
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			apiKeysEntity,
			"ls",
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		var keys []mongodbatlas.APIKey
		if err := json.Unmarshal(resp, &keys); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		assert.NotEmpty(t, keys)
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			iamEntity,
			projectsEntity,
			apiKeysEntity,
			"rm",
			ID,
			"--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		if a.NoError(err, string(resp)) {
			expected := fmt.Sprintf("API Key '%s' deleted\n", ID)
			a.Equal(expected, string(resp))
		}
	})
}
