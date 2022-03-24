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
//go:build e2e || (atlas && generic)

package atlas_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"
	"time"

	"github.com/mongodb/mongocli/e2e"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestEvents(t *testing.T) {
	cliPath, err := e2e.AtlasCLIBin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	t.Run("List Project Events", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			eventsEntity,
			projectEntity,
			"list",
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var events mongodbatlas.EventResponse
		if err := json.Unmarshal(resp, &events); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if len(events.Results) == 0 {
			t.Errorf("got=%#v\nwant>0\n", len(events.Results))
		}
	})

	t.Run("List Organization Events", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			eventsEntity,
			orgEntity,
			"list",
			"--minDate="+time.Now().Add(-time.Hour*time.Duration(24)).Format("2006-01-02"),
			"-o=json",
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var events mongodbatlas.EventResponse
		if err := json.Unmarshal(resp, &events); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if len(events.Results) == 0 {
			t.Errorf("got=%#v\nwant>0\n", len(events.Results))
		}
	})
}
