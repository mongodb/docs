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

package atlas

import (
	"fmt"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/alerts"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/accesslists"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/accesslogs"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/backup"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/cloudproviders"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/clusters"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/customdbroles"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/customdns"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/datalake"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/dbusers"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/integrations"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/livemigrations"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/logs"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/maintenance"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/metrics"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/networking"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/privateendpoints"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/processes"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/quickstart"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/security"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/serverless"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/events"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/performanceadvisor"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
	"github.com/spf13/cobra"
)

const (
	Use = "atlas"
)

func Builder() *cobra.Command {
	opts := &cli.RefresherOpts{}
	cmd := &cobra.Command{
		Use:   Use,
		Short: "MongoDB Atlas operations.",
		Long:  deprecatedMessage,
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			log.SetOutput(cmd.ErrOrStderr())

			_, _ = log.Warning(deprecatedMessage)
			if err := opts.InitFlow(); err != nil {
				return err
			}
			if err := opts.RefreshAccessToken(cmd.Context()); err != nil {
				return err
			}
			if config.Service() == "" {
				config.SetService(config.CloudService)
			}
			return validate.Credentials()
		},
		Annotations: map[string]string{
			"toc": "true",
		},
	}
	cmd.AddCommand(
		quickstart.Builder(),
		clusters.Builder(),
		dbusers.Builder(),
		customdbroles.Builder(),
		accesslists.Builder(),
		datalake.Builder(),
		alerts.Builder(),
		backup.Builder(),
		events.Builder(),
		metrics.Builder(),
		performanceadvisor.Builder(),
		logs.MongoCLIBuilder(),
		processes.Builder(),
		privateendpoints.Builder(),
		networking.Builder(),
		security.Builder(),
		integrations.Builder(),
		maintenance.Builder(),
		customdns.Builder(),
		cloudproviders.Builder(),
		serverless.Builder(),
		livemigrations.Builder(),
		accesslogs.Builder(),
	)

	updateHelpString(cmd, deprecatedMessage)
	return cmd
}

// updateHelpString updates the help template to include the deprecated message.
func updateHelpString(cmd *cobra.Command, deprecatedMessage string) {
	for _, c := range cmd.Commands() {
		c.SetHelpTemplate(fmt.Sprintf("%s \n%s", deprecatedMessage, c.HelpTemplate()))
	}
}
