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
//go:build e2e || (atlas && logs)

package atlas_test

import (
	"encoding/json"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestAccessLogs(t *testing.T) {
	req := require.New(t)

	g := newAtlasE2ETestGenerator(t)
	g.generateProjectAndCluster("accessLogs")

	h, err := g.getHostname()
	req.NoError(err)

	cliPath, err := e2e.AtlasCLIBin()
	req.NoError(err)

	t.Run("List by clusterName", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessLogsEntity,
			"ls",
			"--clusterName", g.clusterName,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)
		var entries *mongodbatlas.AccessLogSettings
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)
	})

	t.Run("List by hostname", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			accessLogsEntity,
			"ls",
			"--hostname", h,
			"--projectId", g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()
		req.NoError(err)
		var entries *mongodbatlas.AccessLogSettings
		err = json.Unmarshal(resp, &entries)
		req.NoError(err)
	})
}
