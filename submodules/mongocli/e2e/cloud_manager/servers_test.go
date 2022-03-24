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
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestServers(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			serversEntity,
			"list",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}

		var servers *opsmngr.Agents
		if err := json.Unmarshal(resp, &servers); err != nil {
			t.Fatalf("unexpected error: %v\n", err)
		}
		if servers.TotalCount == 0 {
			t.Errorf("expected at least one server, got=%d\n", servers.TotalCount)
		}
	})
}
