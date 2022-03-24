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

//go:build e2e || (remote && replica && (cloudmanager || om44 || om50))

package cloud_manager_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/ops-manager/opsmngr"
)

const (
	apiKeys = "apiKeys"
)

func TestAgentAPIKeys(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			agentsEntity,
			apiKeys,
			"list",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		a := assert.New(t)

		if a.NoError(err, string(resp)) {
			var keys []*opsmngr.AgentAPIKey
			err := json.Unmarshal(resp, &keys)
			a.NoError(err)
			a.NotEmpty(keys)
		}
	})
}
