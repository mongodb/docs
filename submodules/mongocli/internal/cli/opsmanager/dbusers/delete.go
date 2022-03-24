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

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/atmcfg"
)

type DeleteOpts struct {
	cli.GlobalOpts
	*cli.DeleteOpts
	authDB string
	store  store.AutomationPatcher
}

func (opts *DeleteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DeleteOpts) Run() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())

	if err != nil {
		return err
	}

	if err := atmcfg.RemoveUser(current, opts.Entry, opts.authDB); err != nil {
		return err
	}

	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

// mongocli atlas dbuser(s) delete <username> [--projectId projectId] [--force].
func DeleteBuilder() *cobra.Command {
	opts := &DeleteOpts{
		DeleteOpts: cli.NewDeleteOpts("DB user '%s' deleted\n", "DB user not deleted"),
	}
	cmd := &cobra.Command{
		Use:     "delete <username>",
		Aliases: []string{"rm"},
		Short:   "Delete a database user for your project.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context())); err != nil {
				return err
			}
			opts.Entry = args[0]
			return opts.Prompt()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.authDB, flag.AuthDB, convert.AdminDB, usage.AuthDB)
	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
