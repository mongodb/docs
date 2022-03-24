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
//go:build e2e || (generic && (om44 || om50))

package ops_manager_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestVersionManifest(t *testing.T) {
	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	cmd := exec.Command(cliPath,
		"om",
		"versionManifest",
		"update",
		os.Getenv("OM_VERSION"),
		"-o=json",
	)

	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()

	if err != nil {
		t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
	}

	var versionManifest *opsmngr.VersionManifest
	if err := json.Unmarshal(resp, &versionManifest); err != nil {
		t.Fatalf("unexpected error: %v\n", err)
	}
	if len(versionManifest.Versions) == 0 {
		t.Errorf("expected at least one version, got=0\n")
	}
}
