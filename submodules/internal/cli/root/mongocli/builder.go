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

package mongocli

import (
	"fmt"
	"io"
	"runtime"
	"strings"
	"time"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/auth"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/cloudmanager"
	cliconfig "github.com/mongodb/mongodb-atlas-cli/internal/cli/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/iam"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/opsmanager"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/homebrew"
	"github.com/mongodb/mongodb-atlas-cli/internal/latestrelease"
	"github.com/mongodb/mongodb-atlas-cli/internal/search"
	"github.com/mongodb/mongodb-atlas-cli/internal/terminal"
	"github.com/mongodb/mongodb-atlas-cli/internal/usage"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
)

type Notifier struct {
	currentVersion string
	finder         latestrelease.VersionFinder
	filesystem     afero.Fs
	writer         io.Writer
}

// Builder conditionally adds children commands as needed.
// This is important in particular for Atlas as it dynamically sets flags for cluster creation and
// this can be slow to timeout on environments with limited internet access (Ops Manager).
func Builder(profile *string, argsWithoutProg []string) *cobra.Command {
	rootCmd := &cobra.Command{
		Version: version.Version,
		Use:     config.ToolName,
		Short:   "CLI tool to manage your MongoDB Cloud",
		Long:    fmt.Sprintf("Use %s command help for information on a specific command", config.ToolName),
		Example: `
  Display the help menu for the config command
  $ mongocli config --help`,
		SilenceUsage: true,
		Annotations: map[string]string{
			"toc": "true",
		},
		PersistentPostRun: func(cmd *cobra.Command, args []string) {
			// we don't run the release alert feature on the completion command
			if strings.HasPrefix(cmd.CommandPath(), "mongocli completion") {
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
		},
	}
	rootCmd.SetVersionTemplate(formattedVersion())
	hasArgs := len(argsWithoutProg) != 0

	if hasArgs && (argsWithoutProg[0] == "--version" || argsWithoutProg[0] == "-v") {
		return rootCmd
	}
	rootCmd.AddCommand(cliconfig.Builder())

	shouldIncludeAtlas := []string{
		atlas.Use,
		"help",
		"--help",
		"-h",
		"completion",
		"__complete",
	}
	if !hasArgs || search.StringInSlice(shouldIncludeAtlas, argsWithoutProg[0]) {
		rootCmd.AddCommand(atlas.Builder())
	}
	// hidden shortcuts
	loginCmd := auth.LoginBuilder()
	loginCmd.Hidden = true
	logoutCmd := auth.LogoutBuilder()
	logoutCmd.Hidden = true
	whoCmd := auth.WhoAmIBuilder()
	whoCmd.Hidden = true

	rootCmd.AddCommand(
		cloudmanager.Builder(),
		opsmanager.Builder(),
		iam.Builder(),
		auth.Builder(),
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
		upgradeInstructions = "To upgrade, see: https://dochub.mongodb.org/core/install-mongocli."
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
