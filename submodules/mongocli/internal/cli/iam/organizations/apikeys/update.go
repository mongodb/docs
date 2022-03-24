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
package apikeys

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

type UpdateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	id    string
	desc  string
	roles []string
	store store.OrganizationAPIKeyUpdater
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) newAPIKeyInput() *atlas.APIKeyInput {
	return &atlas.APIKeyInput{
		Desc:  opts.desc,
		Roles: opts.roles,
	}
}

const updateTemplate = "API Key '{{.ID}}' successfully updated.\n"

func (opts *UpdateOpts) Run() error {
	r, err := opts.store.UpdateOrganizationAPIKey(opts.ConfigOrgID(), opts.id, opts.newAPIKeyInput())
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli iam organizations|orgs apiKey(s)|apikey(s) update <ID> [--role role][--desc description][--orgId orgId].
func UpdateBuilder() *cobra.Command {
	opts := new(UpdateOpts)
	cmd := &cobra.Command{
		Use:     "assign <ID>",
		Aliases: []string{"updates"},
		Args:    require.ExactArgs(1),
		Short:   "Update an Organization API Key.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), updateTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.id = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.APIKeyRoles)
	cmd.Flags().StringVar(&opts.desc, flag.Description, "", usage.APIKeyDescription)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
