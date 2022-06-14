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

package opsmanager

import (
	"log"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli/alerts"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/events"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/admin"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/agents"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/automation"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/backup"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/clusters"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/dbusers"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/diagnosearchive"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/featurepolicies"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/livemigrations"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/logs"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/maintenance"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/metrics"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/monitoring"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/owner"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/processes"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/security"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/servers"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/serverusage"
	softwarecompotents "github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/softwarecomponents"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager/versionmanifest"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/performanceadvisor"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
	"github.com/spf13/cobra"
)

func Builder() *cobra.Command {
	const use = "ops-manager"
	cmd := &cobra.Command{
		Use:     use,
		Aliases: []string{"om"},
		Short:   "MongoDB Ops Manager operations.",
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			log.SetOutput(cmd.ErrOrStderr())

			config.SetService(config.OpsManagerService)
			// do not validate to create an owner
			if cmd.CommandPath() != "mongocli ops-manager owner create" {
				return validate.Credentials()
			}
			return nil
		},
		Annotations: map[string]string{
			"toc": "true",
		},
	}

	cmd.AddCommand(
		clusters.Builder(),
		alerts.Builder(),
		backup.Builder(),
		servers.Builder(),
		automation.Builder(),
		security.Builder(),
		dbusers.Builder(),
		owner.Builder(),
		events.Builder(),
		monitoring.Builder(),
		processes.Builder(),
		metrics.Builder(),
		logs.Builder(),
		agents.Builder(),
		diagnosearchive.Builder(),
		maintenance.Builder(),
		performanceadvisor.Builder(),
		versionmanifest.Builder(),
		admin.Builder(),
		softwarecompotents.Builder(),
		featurepolicies.Builder(),
		serverusage.Builder(),
		livemigrations.Builder())
	return cmd
}
