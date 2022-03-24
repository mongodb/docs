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

package dbusers

import (
	"context"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/atmcfg"
	"go.mongodb.org/ops-manager/opsmngr"
)

const scramSHA1 = "SCRAM-SHA-1"

type CreateOpts struct {
	cli.GlobalOpts
	cli.InputOpts
	username   string
	password   string
	authDB     string
	roles      []string
	mechanisms []string
	store      store.AutomationPatcher
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) Run() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())

	if err != nil {
		return err
	}

	dbuser := opts.newDBUser()
	if err := atmcfg.ConfigureScramCredentials(dbuser, opts.password); err != nil {
		return err
	}

	atmcfg.AddUser(current, dbuser)

	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

func (opts *CreateOpts) newDBUser() *opsmngr.MongoDBUser {
	return &opsmngr.MongoDBUser{
		Database:                   opts.authDB,
		Username:                   opts.username,
		Roles:                      convert.BuildOMRoles(opts.roles),
		AuthenticationRestrictions: []opsmngr.AuthenticationRestriction{},
		Mechanisms:                 &opts.mechanisms,
	}
}

func (opts *CreateOpts) Prompt() error {
	if opts.password != "" {
		return nil
	}

	if !opts.IsTerminalInput() {
		_, err := fmt.Fscanln(opts.InReader, &opts.password)
		return err
	}

	surveyPrompt := &survey.Password{
		Message: "Password:",
	}
	return survey.AskOne(surveyPrompt, &opts.password)
}

// mongocli atlas dbuser(s) create --username username --password password --role roleName@dbName [--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a database user for your project.",
		Example: `
  Create a user with readWriteAnyDatabase and clusterMonitor access
  $ mongocli om dbuser create --username <username>  --role readWriteAnyDatabase,clusterMonitor --mechanisms SCRAM-SHA-256 --projectId <projectId>`,
		Args: require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.InitInput(cmd.InOrStdin()),
				opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.Prompt(); err != nil {
				return err
			}
			return opts.Run()
		},
	}

	cmd.Flags().StringVarP(&opts.username, flag.Username, flag.UsernameShort, "", usage.DBUsername)
	cmd.Flags().StringVarP(&opts.password, flag.Password, flag.PasswordShort, "", usage.Password)
	cmd.Flags().StringVar(&opts.authDB, flag.AuthDB, convert.AdminDB, usage.AuthDB)
	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.Roles)
	cmd.Flags().StringSliceVar(&opts.mechanisms, flag.Mechanisms, []string{scramSHA1}, usage.Mechanisms)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	_ = cmd.MarkFlagRequired(flag.Username)

	return cmd
}
