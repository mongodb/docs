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
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/mongodbatlas"
)

const (
	datadogEntity   = "DATADOG"
	flowdockEntity  = "FLOWDOCK"
	newRelicEntity  = "NEW_RELIC"
	opsGenieEntity  = "OPS_GENIE"
	pagerDutyEntity = "PAGER_DUTY"
	victorOpsEntity = "VICTOR_OPS"
	webhookEntity   = "WEBHOOK"
)

func TestIntegrations(t *testing.T) {
	g := newAtlasE2ETestGenerator(t)
	g.generateProject("integrations")

	n, err := e2e.RandInt(255)
	require.NoError(t, err)
	key := "51c0ef87e9951c3e147accf0e12" + n.String()

	cliPath, err := e2e.AtlasCLIBin()
	require.NoError(t, err)

	t.Run("Create DATADOG", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			datadogEntity,
			"--apiKey",
			key,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(datadogEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create FLOWDOCK", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			flowdockEntity,
			"--apiToken",
			key,
			"--flowName",
			"test",
			"--orgName",
			"testOrg",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(flowdockEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create NEW_RELIC", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			newRelicEntity,
			"--accountId",
			key,
			"--licenceKey",
			key,
			"--writeToken",
			key,
			"--readToken",
			key,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(newRelicEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create OPSGENIE", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			opsGenieEntity,
			"--apiKey",
			key,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(opsGenieEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create PAGER_DUTY", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			pagerDutyEntity,
			"--serviceKey",
			key,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(pagerDutyEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create VICTOR_OPS", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			victorOpsEntity,
			"--apiKey",
			key,
			"--routingKey",
			"test",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(victorOpsEntity, thirdPartyIntegrations))
		}
	})

	t.Run("Create WEBHOOK", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"create",
			webhookEntity,
			"--url",
			key,
			"--secret",
			key,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.True(integrationExists(webhookEntity, thirdPartyIntegrations))
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"ls",
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var thirdPartyIntegrations mongodbatlas.ThirdPartyIntegrations
		if err := json.Unmarshal(resp, &thirdPartyIntegrations); a.NoError(err) {
			a.NotEmpty(thirdPartyIntegrations.Results)
		}
	})

	t.Run("Describe", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"describe",
			datadogEntity,
			"--projectId",
			g.projectID,
			"-o=json")
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))
		var thirdPartyIntegration mongodbatlas.ThirdPartyIntegration
		if err := json.Unmarshal(resp, &thirdPartyIntegration); a.NoError(err) {
			a.Equal(datadogEntity, thirdPartyIntegration.Type)
		}
	})

	t.Run("Delete", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			integrationsEntity,
			"delete",
			datadogEntity,
			"--force",
			"--projectId",
			g.projectID)
		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		a := assert.New(t)
		a.NoError(err, string(resp))

		expected := fmt.Sprintf("Integration '%s' deleted\n", datadogEntity)
		a.Equal(expected, string(resp))
	})
}
