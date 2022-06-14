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
	"errors"
	"fmt"
	"io"
	"os"
	"runtime"
	"strings"
	"syscall"
	"time"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/alerts"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/accesslists"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/accesslogs"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/backup"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/cloudproviders"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/clusters"
	atlasConfig "github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/config"
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
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/setup"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/auth"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/events"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/figautocomplete"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/iam/organizations"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/iam/projects"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/iam/teams"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/iam/users"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/performanceadvisor"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/homebrew"
	"github.com/mongodb/mongodb-atlas-cli/internal/latestrelease"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/sighandle"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/mongodb/mongodb-atlas-cli/internal/terminal"
	"github.com/mongodb/mongodb-atlas-cli/internal/usage"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
)

const atlas = "atlas"

type Notifier struct {
	currentVersion string
	finder         latestrelease.VersionFinder
	filesystem     afero.Fs
	writer         io.Writer
}

func handleSignal() {
	sighandle.Notify(func(sig os.Signal) {
		telemetry.FinishTrackingCommand(telemetry.TrackOptions{
			Err:    errors.New(sig.String()),
			Signal: sig.String(),
		})
		os.Exit(1)
	}, os.Interrupt, syscall.SIGTERM)
}

func initProfile(profile string) {
	if profile != "" {
		config.SetName(profile)
	} else if profile = config.GetString(flag.Profile); profile != "" {
		config.SetName(profile)
	} else if availableProfiles := config.List(); len(availableProfiles) == 1 {
		config.SetName(availableProfiles[0])
	}
}

// Builder conditionally adds children commands as needed.
func Builder() *cobra.Command {
	var profile string
	var debugLevel bool

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
			log.SetOutput(cmd.ErrOrStderr())
			if debugLevel {
				log.SetLevel(log.DebugLevel)
			}

			telemetry.StartTrackingCommand(cmd, args)

			handleSignal()

			initProfile(profile)

			if shouldSetService(cmd) {
				config.SetService(config.CloudService)
			}

			if shouldCheckCredentials(cmd) {
				err := cli.RefreshToken(cmd.Context())
				if err != nil {
					return err
				}
				return validate.Credentials()
			}

			return nil
		},
		PersistentPostRun: func(cmd *cobra.Command, args []string) {
			// we don't run the release alert feature on the completion command
			if strings.HasPrefix(cmd.CommandPath(), fmt.Sprintf("%s %s", atlas, "completion")) {
				return
			}

			w := cmd.ErrOrStderr()
			fs := afero.NewOsFs()
			f, _ := latestrelease.NewVersionFinder(fs, version.NewReleaseVersionDescriber())

			notifier := &Notifier{
				currentVersion: latestrelease.VersionFromTag(version.Version, config.ToolName),
				finder:         f,
				filesystem:     fs,
				writer:         w,
			}

			if check, isHb := notifier.shouldCheck(); check {
				_ = notifier.notifyIfApplicable(isHb)
			}
			telemetry.FinishTrackingCommand(telemetry.TrackOptions{})
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
	registerCmd := auth.RegisterBuilder()
	registerCmd.Hidden = true

	rootCmd.AddCommand(
		atlasConfig.Builder(),
		auth.Builder(),
		quickstart.Builder(),
		setup.Builder(),
		projects.Builder(),
		organizations.AtlasCLIBuilder(),
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
		registerCmd,
		figautocomplete.Builder(),
	)

	rootCmd.PersistentFlags().StringVarP(&profile, flag.Profile, flag.ProfileShort, "", usage.Profile)
	rootCmd.PersistentFlags().BoolVarP(&debugLevel, flag.Debug, flag.DebugShort, false, usage.Debug)
	_ = rootCmd.PersistentFlags().MarkHidden(flag.Debug)

	return rootCmd
}

const verTemplate = `%s version: %s
git version: %s
Go version: %s
   os: %s
   arch: %s
   compiler: %s
`

func shouldSetService(cmd *cobra.Command) bool {
	if config.Service() != "" {
		return false
	}

	if strings.HasPrefix(cmd.CommandPath(), fmt.Sprintf("%s %s", atlas, "config")) { // user wants to set credentials
		return false
	}

	if strings.HasPrefix(cmd.CommandPath(), fmt.Sprintf("%s %s", atlas, "completion")) {
		return false
	}

	return true
}

func shouldCheckCredentials(cmd *cobra.Command) bool {
	searchByName := []string{
		"__complete",
		"help",
		figautocomplete.CmdUse,
	}
	for _, n := range searchByName {
		if cmd.Name() == n {
			return false
		}
	}
	searchByPath := []string{
		fmt.Sprintf("%s %s", atlas, "completion"), // completion commands do not require credentials
		fmt.Sprintf("%s %s", atlas, "config"),     // user wants to set credentials
		fmt.Sprintf("%s %s", atlas, "auth"),       // user wants to set credentials
		fmt.Sprintf("%s %s", atlas, "login"),      // user wants to set credentials
		fmt.Sprintf("%s %s", atlas, "setup"),      // user wants to set credentials
		fmt.Sprintf("%s %s", atlas, "register"),   // user wants to set credentials
		fmt.Sprintf("%s %s", atlas, "quickstart"), // command supports login
	}
	for _, p := range searchByPath {
		if strings.HasPrefix(cmd.CommandPath(), p) {
			return false
		}
	}
	return true
}

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

func (n *Notifier) shouldCheck() (shouldCheck, isHb bool) {
	shouldCheck = !config.SkipUpdateCheck() && terminal.IsTerminal(n.writer)
	isHb = false

	if !shouldCheck {
		return shouldCheck, isHb
	}

	c, _ := homebrew.NewChecker(n.filesystem)
	isHb = c.IsHomebrew()

	return shouldCheck, isHb
}

func (n *Notifier) notifyIfApplicable(isHb bool) error {
	release, err := n.finder.Find()
	if err != nil || release == nil {
		return err
	}

	// homebrew is an external dependency we give them 24h to have the cli available there
	if isHb && !isAtLeast24HoursPast(release.PublishedAt) {
		return nil
	}

	var upgradeInstructions string
	if isHb {
		upgradeInstructions = fmt.Sprintf(`To upgrade, run "brew update && brew upgrade %s".`, homebrew.FormulaName(config.ToolName))
	} else {
		upgradeInstructions = "To upgrade, see: https://dochub.mongodb.org/core/install-atlas-cli."
	}

	newVersionTemplate := `
A new version of %s is available '%s'!
%s

To disable this alert, run "%s config set skip_update_check true".
`
	_, err = fmt.Fprintf(n.writer, newVersionTemplate, config.ToolName, release.Version, upgradeInstructions, config.BinName())
	return err
}

func isAtLeast24HoursPast(t time.Time) bool {
	return !t.IsZero() && time.Since(t) >= time.Hour*24
}
