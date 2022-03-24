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

package users

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const addTemplate = "User(s) added to the team.\n"

type AddOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store  store.TeamAdder
	teamID string
	users  []string
}

func (opts *AddOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *AddOpts) Run() error {
	r, err := opts.store.AddUsersToTeam(opts.ConfigOrgID(), opts.teamID, opts.users)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli iam team(s) user(s) add <userId> [userId]... --teamId teamId --orgId orgId.
func AddBuilder() *cobra.Command {
	opts := &AddOpts{}
	cmd := &cobra.Command{
		Use:   "add <userId> [userId]...",
		Args:  require.MinimumNObjectIDArgs(1),
		Short: "Add a user to a team.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.users = args
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), addTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.teamID, flag.TeamID, "", usage.TeamID)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.TeamID)

	return cmd
}
