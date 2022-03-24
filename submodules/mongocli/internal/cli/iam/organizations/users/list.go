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

const listTemplate = `ID	FIRST NAME	LAST NAME	USERNAME{{range .Results}}
{{.ID}}	{{.FirstName}}	{{.LastName}}	{{.Username}}{{end}}
`

type ListOpts struct {
	cli.GlobalOpts
	cli.ListOpts
	cli.OutputOpts
	store store.UserLister
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ListOpts) Run() error {
	listOptions := opts.NewListOptions()
	r, err := opts.store.OrganizationUsers(opts.ConfigOrgID(), listOptions)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli iam organizations(s) users list --orgId orgId.
func ListBuilder() *cobra.Command {
	opts := new(ListOpts)

	cmd := &cobra.Command{
		Use:     "list",
		Aliases: []string{"ls"},
		Short:   "List users in a organization.",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.InitOutput(cmd.OutOrStdout(), listTemplate),
				opts.initStore(cmd.Context()),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)

	return cmd
}
