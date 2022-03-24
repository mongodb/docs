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
//go:build e2e || config

package config_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/mongodb/mongocli/e2e"
)

const (
	configEntity    = "config"
	existingProfile = "e2e"
)

func TestConfig(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath, configEntity, "ls")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		if !strings.Contains(string(resp), existingProfile) {
			t.Errorf("expected '%s; to contain '%s'\n", string(resp), existingProfile)
		}
	})
	t.Run("Describe", func(t *testing.T) {
		// This depends on a ORG_ID ENV
		cmd := exec.Command(
			cliPath,
			configEntity,
			"describe",
			"e2e",
			"-o=json",
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		var config map[string]interface{}
		if err := json.Unmarshal(resp, &config); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if _, ok := config["org_id"]; !ok {
			t.Errorf("expected %v, to have key %s\n", config, "org_id")
		}
		if _, ok := config["service"]; !ok {
			t.Errorf("expected %v, to have key %s\n", config, "service")
		}
	})
	t.Run("Rename", func(t *testing.T) {
		cmd := exec.Command(
			cliPath,
			configEntity,
			"rename",
			"e2e",
			"renamed",
		)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		const expected = "The profile e2e was renamed to renamed.\n"
		if string(resp) != expected {
			t.Errorf("expected %s, got %s\n", expected, string(resp))
		}
	})
	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath, configEntity, "delete", "renamed", "--force")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		const expected = "Profile 'renamed' deleted\n"
		if string(resp) != expected {
			t.Errorf("expected %s, got %s\n", expected, string(resp))
		}
	})
}
