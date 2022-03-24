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

package invitations

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const createTemplate = "User '{{.Username}}' invited.\n"

type InviteOpts struct {
	cli.OutputOpts
	cli.GlobalOpts
	username string
	roles    []string
	teamIds  []string
	store    store.ProjectInviter
}

func (opts *InviteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *InviteOpts) Run() error {
	r, err := opts.store.InviteUserToProject(opts.ConfigProjectID(), opts.newInvitation())

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *InviteOpts) newInvitation() *atlas.Invitation {
	return &atlas.Invitation{
		Username: opts.username,
		Roles:    opts.roles,
		TeamIDs:  opts.teamIds,
	}
}

// mongocli iam project(s) invitation(s) invite|create <email> --role role [--teamId teamId] [--orgId orgId].
func InviteBuilder() *cobra.Command {
	opts := new(InviteOpts)
	opts.Template = createTemplate
	cmd := &cobra.Command{
		Use:     "invite <email>",
		Short:   "Invites one user to the project that you specify.",
		Aliases: []string{"create"},
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":      "email",
			"emailDesc": "Email of the user being invited to the project.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.username = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.OrgRole)
	cmd.Flags().StringSliceVar(&opts.teamIds, flag.TeamID, []string{}, usage.TeamID)
	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Role)

	return cmd
}
