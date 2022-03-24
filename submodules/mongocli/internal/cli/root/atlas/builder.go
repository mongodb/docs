// Copyright 2022 MongoDB Inc
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
	"context"
	"fmt"
	"runtime"
	"strings"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/alerts"
	"github.com/mongodb/mongocli/internal/cli/atlas/accesslists"
	"github.com/mongodb/mongocli/internal/cli/atlas/accesslogs"
	"github.com/mongodb/mongocli/internal/cli/atlas/backup"
	"github.com/mongodb/mongocli/internal/cli/atlas/cloudproviders"
	"github.com/mongodb/mongocli/internal/cli/atlas/clusters"
	atlasConfig "github.com/mongodb/mongocli/internal/cli/atlas/config"
	"github.com/mongodb/mongocli/internal/cli/atlas/customdbroles"
	"github.com/mongodb/mongocli/internal/cli/atlas/customdns"
	"github.com/mongodb/mongocli/internal/cli/atlas/datalake"
	"github.com/mongodb/mongocli/internal/cli/atlas/dbusers"
	"github.com/mongodb/mongocli/internal/cli/atlas/integrations"
	"github.com/mongodb/mongocli/internal/cli/atlas/livemigrations"
	"github.com/mongodb/mongocli/internal/cli/atlas/logs"
	"github.com/mongodb/mongocli/internal/cli/atlas/maintenance"
	"github.com/mongodb/mongocli/internal/cli/atlas/metrics"
	"github.com/mongodb/mongocli/internal/cli/atlas/networking"
	"github.com/mongodb/mongocli/internal/cli/atlas/privateendpoints"
	"github.com/mongodb/mongocli/internal/cli/atlas/processes"
	"github.com/mongodb/mongocli/internal/cli/atlas/quickstart"
	"github.com/mongodb/mongocli/internal/cli/atlas/security"
	"github.com/mongodb/mongocli/internal/cli/atlas/serverless"
	"github.com/mongodb/mongocli/internal/cli/auth"
	"github.com/mongodb/mongocli/internal/cli/events"
	"github.com/mongodb/mongocli/internal/cli/iam/globalaccesslists"
	"github.com/mongodb/mongocli/internal/cli/iam/globalapikeys"
	"github.com/mongodb/mongocli/internal/cli/iam/organizations"
	"github.com/mongodb/mongocli/internal/cli/iam/projects"
	"github.com/mongodb/mongocli/internal/cli/iam/teams"
	"github.com/mongodb/mongocli/internal/cli/iam/users"
	"github.com/mongodb/mongocli/internal/cli/performanceadvisor"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/latestrelease"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/mongodb/mongocli/internal/version"
	"github.com/spf13/cobra"
)

const atlas = "atlas"

type BuilderOpts struct {
	store latestrelease.Printer
}

// Builder conditionally adds children commands as needed.
func Builder(profile *string) *cobra.Command {
	rootCmd := &cobra.Command{
		Version: version.Version,
		Use:     atlas,
		Aliases: []string{config.ToolName},
		Short:   "CLI tool to manage MongoDB Atlas",
		Long:    fmt.Sprintf("Use %s command help for information on a specific command", atlas),
		Example: `
  Display the help menu for the config command
  $ atlas config --help`,
		SilenceUsage: true,
		Annotations: map[string]string{
			"toc": "true",
		},
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			if config.Service() == "" {
				config.SetService(config.CloudService)
			}

			if cmd.Name() == "quickstart" { // quickstart has its own check
				return nil
			}

			if strings.HasPrefix(cmd.CommandPath(), fmt.Sprintf("%s %s", atlas, "config")) { // user wants to set credentials
				return nil
			}

			if strings.HasPrefix(cmd.CommandPath(), fmt.Sprintf("%s %s", atlas, "auth")) { // user wants to set credentials
				return nil
			}

			return validate.Credentials()
		},
		PersistentPostRun: func(cmd *cobra.Command, args []string) {
			w := cmd.ErrOrStderr()

			if !config.SkipUpdateCheck() && cli.IsTerminal(w) {
				opts := &BuilderOpts{
					store: latestrelease.NewPrinter(context.Background()),
				}

				_ = opts.store.PrintNewVersionAvailable(w, version.Version, config.ToolName, config.BinName())
			}
		},
	}
	rootCmd.SetVersionTemplate(formattedVersion())

	// hidden shortcuts
	loginCmd := auth.LoginBuilder()
	loginCmd.Hidden = true
	logoutCmd := auth.LogoutBuilder()
	logoutCmd.Hidden = true
	whoCmd := auth.WhoAmIBuilder()
	whoCmd.Hidden = true

	rootCmd.AddCommand(
		atlasConfig.Builder(),
		auth.Builder(),
		quickstart.Builder(),
		projects.Builder(),
		organizations.Builder(),
		globalapikeys.Builder(),
		globalaccesslists.Builder(),
		users.Builder(),
		teams.Builder(),
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
		logs.Builder(),
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
		loginCmd,
		logoutCmd,
		whoCmd,
	)

	rootCmd.PersistentFlags().StringVarP(profile, flag.Profile, flag.ProfileShort, "", usage.Profile)

	return rootCmd
}

const verTemplate = `%s version: %s
git version: %s
Go version: %s
   os: %s
   arch: %s
   compiler: %s
`

func formattedVersion() string {
	return fmt.Sprintf(verTemplate,
		config.ToolName,
		version.Version,
		version.GitCommit,
		runtime.Version(),
		runtime.GOOS,
		runtime.GOARCH,
		runtime.Compiler)
}
