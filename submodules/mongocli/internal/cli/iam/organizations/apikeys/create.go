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

const createTemplate = `API Key '{{.ID}}' created.
Public API Key {{.PublicKey}}
Private API Key {{.PrivateKey}}
`

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	desc  string
	roles []string
	store store.OrganizationAPIKeyCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) newAPIKeyInput() *atlas.APIKeyInput {
	return &atlas.APIKeyInput{
		Desc:  opts.desc,
		Roles: opts.roles,
	}
}

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateOrganizationAPIKey(opts.ConfigOrgID(), opts.newAPIKeyInput())

	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli iam organizations|orgs apiKey(s)|apikeys create [--role role][--desc description][--orgId orgId].
func CreateBuilder() *cobra.Command {
	opts := new(CreateOpts)
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create an Organization API Key.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.APIKeyRoles)
	cmd.Flags().StringVar(&opts.desc, flag.Description, "", usage.APIKeyDescription)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Description)
	_ = cmd.MarkFlagRequired(flag.Role)

	return cmd
}
