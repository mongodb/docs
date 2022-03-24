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
//go:build e2e || config

package config_test

import (
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
)

const completionEntity = "completion"

func TestAutocomplete(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	options := []string{"zsh", "bash", "fish", "powershell"}
	for _, option := range options {
		t.Run(option, func(t *testing.T) {
			cmd := exec.Command(cliPath, completionEntity, option)
			cmd.Env = os.Environ()
			if resp, err := cmd.CombinedOutput(); err != nil {
				t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
			}
		})
	}
}
