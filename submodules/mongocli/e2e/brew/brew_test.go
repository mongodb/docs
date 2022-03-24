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
//go:build e2e || brew

package brew_test

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/mongodb/mongocli/e2e"
)

func TestConfig(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	tempDirEnv := fmt.Sprintf("XDG_CONFIG_HOME=%s", os.TempDir()) // make sure no mongocli.toml is detected

	t.Run("config ls", func(t *testing.T) {
		cmd := exec.Command(cliPath, "config", "ls")
		cmd.Env = append(os.Environ(), tempDirEnv)
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}
		got := strings.TrimSpace(string(resp))
		want := "PROFILE NAME"

		if got != want {
			t.Errorf("want '%s'; got '%s'\n", want, got)
		}
	})

	t.Run("iam projects ls", func(t *testing.T) {
		cmd := exec.Command(cliPath, "iam", "projects", "ls")
		cmd.Env = append(os.Environ(), tempDirEnv)
		resp, err := cmd.CombinedOutput()
		if err == nil {
			t.Fatalf("expected error, resp: %v", string(resp))
		}
		got := strings.TrimSpace(string(resp))
		want := "Error: missing credentials"

		if !strings.HasPrefix(got, want) {
			t.Errorf("want '%s'; got '%s'\n", want, got)
		}
	})
}
