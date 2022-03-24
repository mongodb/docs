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

package config

import (
	"context"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/prompt"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const atlas = "atlas"

type initOpts struct {
	cli.ConfigOpts
	gov bool
}

func (opts *initOpts) SetUpAccess() {
	opts.Service = config.CloudService
	if opts.gov {
		opts.Service = config.CloudGovService
	}

	opts.SetUpServiceAndKeys()
}

func (opts *initOpts) Run(ctx context.Context) error {
	fmt.Printf(`You are configuring a profile for %s.

All values are optional and you can use environment variables (MONGODB_ATLAS_*) instead.

Enter [?] on any option to get help.

`, atlas)

	q := prompt.AccessQuestions(false)
	if err := survey.Ask(q, opts); err != nil {
		return err
	}
	opts.SetUpAccess()

	if err := opts.InitStore(ctx); err != nil {
		return err
	}

	if config.IsAccessSet() {
		if err := opts.AskOrg(); err != nil {
			return err
		}
		if err := opts.AskProject(); err != nil {
			return err
		}
	} else {
		q := prompt.TenantQuestions()
		if err := survey.Ask(q, opts); err != nil {
			return err
		}
	}
	opts.SetUpProject()
	opts.SetUpOrg()

	if err := survey.Ask(opts.DefaultQuestions(), opts); err != nil {
		return err
	}
	opts.SetUpOutput()
	opts.SetUpMongoSHPath()

	if err := config.Save(); err != nil {
		return err
	}

	fmt.Printf("\nYour profile is now configured.\n")
	if config.Name() != config.DefaultProfile {
		fmt.Printf("To use this profile, you must set the flag [-%s %s] for every command.\n", flag.ProfileShort, config.Name())
	}
	fmt.Printf("You can use [%s config set] to change these settings at a later time.\n", atlas)
	return nil
}

func InitBuilder() *cobra.Command {
	opts := &initOpts{}
	cmd := &cobra.Command{
		Use:   "init",
		Short: "Configure a profile to store access settings for your MongoDB deployment.",
		Example: `
  To configure the tool to work with Atlas
  $ atlas config init

  To configure the tool to work with Atlas for Government
  $ atlas config init --gov
`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run(cmd.Context())
		},
		Args: require.NoArgs,
	}
	cmd.Flags().BoolVar(&opts.gov, flag.Gov, false, usage.Gov)

	return cmd
}
