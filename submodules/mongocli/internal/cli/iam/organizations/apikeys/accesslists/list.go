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

package accesslists

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

const listTemplate = `IP ADDRESS	CIDR BLOCK	CREATED AT{{range .Results}}
{{.IPAddress}}	{{.CidrBlock}}	{{.Created}}{{end}}
`

type ListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	id    string
	store store.OrganizationAPIKeyAccessListWhitelistLister
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ListOpts) Run() error {
	useAccessList, err := shouldUseAccessList(opts.store)
	if err != nil {
		return err
	}

	var result *atlas.AccessListAPIKeys

	if useAccessList {
		result, err = opts.store.OrganizationAPIKeyAccessLists(opts.ConfigOrgID(), opts.id, opts.NewListOptions())
		if err != nil {
			return err
		}
		return opts.Print(result)
	}

	r, e := opts.store.OrganizationAPIKeyWhitelists(opts.ConfigOrgID(), opts.id, opts.NewListOptions())
	if e != nil {
		return e
	}
	result = fromWhitelistAPIKeysToAccessListAPIKeys(r)
	return opts.Print(result)
}

// mongocli iam organizations|orgs apiKey(s)|apikey(s) accessList list|ls <apiKeyID> [--orgId orgId].
func ListBuilder() *cobra.Command {
	opts := new(ListOpts)
	cmd := &cobra.Command{
		Use:     "list <apiKeyID>",
		Aliases: []string{"ls"},
		Args:    require.ExactArgs(1),
		Short:   "List IP access list entries for your API Key.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), listTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.id = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
