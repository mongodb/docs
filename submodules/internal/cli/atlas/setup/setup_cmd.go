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

package setup

import (
	"context"
	"errors"
	"fmt"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/atlas/quickstart"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/auth"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/require"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/usage"
	"github.com/spf13/cobra"
)

const (
	withProfileMsg = `Run "atlas auth setup --profile <profile_name>" to create a new Atlas account on a new Atlas CLI profile.`
)

var errNeedsOrgAndProject = errors.New("please make sure to select or add an org and project to the profile: %s")

type Opts struct {
	cli.GlobalOpts
	cli.WatchOpts
	// quickstart
	quickstart quickstart.Flow
	// register
	register auth.RegisterFlow
	// login
	login auth.LoginFlow
	// control
	skipRegister bool
	skipLogin    bool
}

func (opts *Opts) Run(ctx context.Context) error {
	if !opts.skipRegister {
		_, _ = fmt.Fprintf(opts.OutWriter, `
This command will help you
1. Create and verify your MongoDB Atlas account in your browser.
2. Return to the terminal to create your first free MongoDB database in Atlas.
`)
		if err := opts.register.Run(ctx); err != nil {
			return err
		}
	} else if !opts.skipLogin {
		_, _ = fmt.Fprintf(opts.OutWriter, `What will happen next:
1. Login and verify your MongoDB Atlas account in your browser.
2. Return to the terminal to create your first free MongoDB database in Atlas.
`)

		if err := opts.login.Run(ctx); err != nil {
			return err
		}
	}

	if err := opts.quickstart.PreRun(ctx, opts.OutWriter); err != nil {
		return err
	}

	if config.ProjectID() == "" || config.OrgID() == "" {
		return fmt.Errorf(errNeedsOrgAndProject.Error(), config.Default().Name())
	}

	return opts.quickstart.Run()
}

func (opts *Opts) PreRun(ctx context.Context) error {
	opts.skipRegister = true
	opts.skipLogin = true

	status, _ := auth.GetStatus(ctx)
	switch status {
	case auth.LoggedInWithAPIKeys:
		msg := fmt.Sprintf(auth.AlreadyAuthenticatedMsg, config.PublicAPIKey())
		_, _ = fmt.Fprintf(opts.OutWriter, `
%s

%s
`, msg, withProfileMsg)
	case auth.LoggedInWithValidToken:
		account, _ := auth.AccountWithAccessToken()
		msg := fmt.Sprintf(auth.AlreadyAuthenticatedEmailMsg, account)
		_, _ = fmt.Fprintf(opts.OutWriter, `%s

%s
`, msg, withProfileMsg)
	case auth.LoggedInWithInvalidToken:
		opts.skipLogin = false
	case auth.NotLoggedIn:
		opts.skipRegister = false
	default:
	}

	return nil
}

// Builder
// atlas setup
//	[--clusterName clusterName]
//	[--provider provider]
//	[--region regionName]
//	[--username username]
//	[--password password]
//	[--skipMongosh skipMongosh]
func Builder() *cobra.Command {
	loginOpts := auth.NewLoginOpts()
	qsOpts := quickstart.NewQuickstartOpts(loginOpts)
	opts := &Opts{
		register:   auth.NewRegisterFlow(loginOpts),
		login:      auth.NewLoginFlow(loginOpts),
		quickstart: quickstart.NewQuickstartFlow(qsOpts),
	}

	cmd := &cobra.Command{
		Use:   "setup",
		Short: "Register, authenticate, create, and access an Atlas cluster.",
		Long:  "This command takes you through registration, login, default profile creation, creating your first free tier cluster and connecting to it using MongoDB Shell.",
		Example: `  Override default cluster settings like name, provider, or database username by using the command options
  $ atlas setup --clusterName Test --provider GCP --username dbuserTest`,
		Hidden: false,
		Args:   require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			// setup pre run
			if err := opts.PreRun(cmd.Context()); err != nil {
				return err
			}

			// registration pre run if applicable
			if !opts.skipRegister {
				if err := opts.register.PreRun(opts.OutWriter); err != nil {
					return err
				}
			}

			if !opts.skipLogin {
				loginOpts.OutWriter = opts.OutWriter
				if err := opts.login.PreRun(); err != nil {
					return err
				}
			}

			return opts.PreRunE(
				opts.InitOutput(opts.OutWriter, ""),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run(cmd.Context())
		},
	}

	// Register and login related
	cmd.Flags().BoolVar(&loginOpts.IsGov, "gov", false, "Register with Atlas for Government.")
	cmd.Flags().BoolVar(&loginOpts.NoBrowser, "noBrowser", false, "Don't try to open a browser session.")
	// Quickstart related
	cmd.Flags().StringVar(&qsOpts.ClusterName, flag.ClusterName, "", usage.ClusterName)
	cmd.Flags().StringVar(&qsOpts.Tier, flag.Tier, quickstart.DefaultAtlasTier, usage.Tier)
	cmd.Flags().StringVar(&qsOpts.Provider, flag.Provider, "", usage.Provider)
	cmd.Flags().StringVarP(&qsOpts.Region, flag.Region, flag.RegionShort, "", usage.Region)
	cmd.Flags().StringSliceVar(&qsOpts.IPAddresses, flag.AccessListIP, []string{}, usage.NetworkAccessListIPEntry)
	cmd.Flags().StringVar(&qsOpts.DBUsername, flag.Username, "", usage.DBUsername)
	cmd.Flags().StringVar(&qsOpts.DBUserPassword, flag.Password, "", usage.Password)
	cmd.Flags().BoolVar(&qsOpts.SkipSampleData, flag.SkipSampleData, false, usage.SkipSampleData)
	cmd.Flags().BoolVar(&qsOpts.SkipMongosh, flag.SkipMongosh, false, usage.SkipMongosh)
	cmd.Flags().BoolVar(&qsOpts.Confirm, flag.Force, false, usage.Force)
	cmd.Flags().BoolVar(&qsOpts.CurrentIP, flag.CurrentIP, false, usage.CurrentIPSimplified)

	cmd.Flags().StringVar(&qsOpts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	_ = cmd.Flags().MarkHidden(flag.ProjectID)

	return cmd
}
